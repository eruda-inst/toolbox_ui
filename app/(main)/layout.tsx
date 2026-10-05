import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox · Ferramentas",
};

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}

export default MainLayout;
