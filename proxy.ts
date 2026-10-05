import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { API_ROUTES } from "@/configurations/api.config";

const publicRoutes = ["/login"];

const routePermissions: Record<string, string> = {
  "/": "toolbox:ferramentas:ver",
  "/categorias": "toolbox:categorias:ver",
  "/permissoes": "toolbox:permissoes:ver",
  "/perfis": "toolbox:perfis:ver",
  "/usuarios": "toolbox:usuarios:ver",
};

export default async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  if (
    url.searchParams.has("_rsc") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const hasToken = !!accessToken;

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  if (!hasToken && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasToken && isPublicRoute) {
    if (
      pathname === "/login" &&
      url.searchParams.get("error") === "unauthorized"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (hasToken && !isPublicRoute) {
    try {
      const authHeader = { Authorization: `Bearer ${accessToken}` };
      const userRes = await fetch(API_ROUTES.authentication.me(), {
        headers: authHeader,
      });
      if (!userRes.ok) throw new Error("Error while fetching user");
      const currentUser = await userRes.json();

      const permissionResponse = await fetch(
        API_ROUTES.permissions.readAllBy({ userID: currentUser.id }),
        {
          headers: authHeader,
        },
      );
      if (!permissionResponse.ok)
        throw new Error("Error while fetching user permissions");
      const permissionData = await permissionResponse.json();
      const permissions = permissionData.data || [];

      const requiredPermission = routePermissions[pathname];

      if (requiredPermission) {
        const hasPermission = permissions.some(
          (permission: { code: string }) =>
            permission.code === requiredPermission,
        );

        if (!hasPermission) {
          const deniedUrl = new URL("/login", request.url);
          deniedUrl.searchParams.set("error", "unauthorized");
          return NextResponse.redirect(deniedUrl);
        }
      }
    } catch (error: unknown) {
      console.error(`Middleware error: ${error}`);
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
