import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { create } from "zustand";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { API_ROUTES, BASE_API_URL } from "@/configurations/api.config";
import PermissionService from "@/services/Permission.service";
import { UserOutType } from "@/types/user.type";
import { PermissionOutType } from "@/types/permission.type";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const TOKEN_EXPIRY_KEY = "token_expiry";

export interface AuthenticationState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  currentUser: UserOutType | null;
  loadingUser: boolean;
  userError: string | null;

  permissions: PermissionOutType[];
  loadingPermissions: boolean;
  permissionError: string | null;

  init: () => Promise<void>;
  setTokens: (access: string, refresh: string, expiresIn?: number) => void;
  clearTokens: () => void;
  fetchCurrentUser: () => Promise<UserOutType | null>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<boolean>;

  fetchPermissions: (userId: number) => Promise<void>;
  hasPermission: (permCode: string) => boolean;
  hasAllPermissions: (permCodes: string[]) => boolean;
}

export const useAuthenticationStore = create<AuthenticationState>(
  (set, get) => ({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    currentUser: null,
    loadingUser: false,
    userError: null,

    permissions: [],
    loadingPermissions: false,
    permissionError: null,

    init: async () => {
      const access = getCookie(ACCESS_TOKEN_KEY) as string | undefined;
      const refresh = getCookie(REFRESH_TOKEN_KEY) as string | undefined;

      if (access) {
        set({
          accessToken: access,
          refreshToken: refresh || null,
          isAuthenticated: true,
        });
        await get().fetchCurrentUser();
      } else {
        set({ accessToken: null, refreshToken: null, isAuthenticated: false });
      }
    },

    setTokens: (access, refresh, expiresIn = 3600) => {
      const cookieOptions = {
        maxAge: expiresIn,
        path: "/",
        secure: false,
        sameSite: "strict" as const,
      };
      setCookie(ACCESS_TOKEN_KEY, access, cookieOptions);
      setCookie(REFRESH_TOKEN_KEY, refresh, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60,
      });

      const expiry = new Date(Date.now() + expiresIn * 1000).toISOString();
      setCookie(TOKEN_EXPIRY_KEY, expiry, cookieOptions);

      set({
        accessToken: access,
        refreshToken: refresh,
        isAuthenticated: true,
      });
    },

    clearTokens: () => {
      deleteCookie(ACCESS_TOKEN_KEY, { path: "/" });
      deleteCookie(REFRESH_TOKEN_KEY, { path: "/" });
      deleteCookie(TOKEN_EXPIRY_KEY, { path: "/" });
      set({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        currentUser: null,
        permissions: [],
      });
    },

    fetchCurrentUser: async () => {
      const token =
        get().accessToken || (getCookie(ACCESS_TOKEN_KEY) as string);
      if (!token) return null;

      set({ loadingUser: true, userError: null });
      try {
        const response = await axiosClient.get<UserOutType>(
          API_ROUTES.authentication.me(),
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const user = response.data;
        set({ currentUser: user, isAuthenticated: true, loadingUser: false });

        if (user.id) {
          await get().fetchPermissions(user.id);
        }

        return user;
      } catch {
        set({
          userError: "Erro ao carregar usuário",
          isAuthenticated: false,
          currentUser: null,
          accessToken: null,
          refreshToken: null,
        });
        set({ loadingUser: false });
        deleteCookie(ACCESS_TOKEN_KEY, { path: "/" });
        deleteCookie(REFRESH_TOKEN_KEY, { path: "/" });
        deleteCookie(TOKEN_EXPIRY_KEY, { path: "/" });
        return null;
      }
    },

    logout: async () => {
      get().clearTokens();
      if (typeof window !== "undefined") {
        if (!window.location.pathname.startsWith("/login")) {
          window.location.replace("/login");
        }
      }
    },

    refreshTokens: async () => {
      const refresh =
        get().refreshToken || (getCookie(REFRESH_TOKEN_KEY) as string);

      if (!refresh) {
        await get().logout();
        return false;
      }

      try {
        const response = await axios.post<{
          access_token: string;
          refresh_token: string;
          expires_in: number;
        }>(
          API_ROUTES.authentication.refreshToken(),
          { refresh_token: refresh },
          {
            baseURL: BASE_API_URL,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        const { access_token, refresh_token, expires_in } = response.data;
        get().setTokens(access_token, refresh_token, expires_in);

        await get().fetchCurrentUser();

        return true;
      } catch {
        await get().logout();
        return false;
      }
    },

    fetchPermissions: async (userId: number) => {
      set({ loadingPermissions: true, permissionError: null });
      try {
        const response = await PermissionService.readAllBy({ userID: userId });
        const permissions = response.data;
        set({ permissions, loadingPermissions: false });
      } catch (err) {
        set({
          permissionError: "Erro ao buscar permissões",
          loadingPermissions: false,
        });
        throw err;
      }
    },

    hasPermission: (permissionCode: string) =>
      get().permissions.some(
        (permission) => permission.code === permissionCode,
      ),

    hasAllPermissions: (permissionCodes: string[]) =>
      permissionCodes.every((permissionCode) =>
        get().permissions.some(
          (permission) => permission.code === permissionCode,
        ),
      ),
  }),
);
