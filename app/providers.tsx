"use client";

import { ReactNode, useEffect } from "react";
import { Toast } from "@heroui/react";
import { useAuthenticationStore } from "@/stores/authentication.store";
import useTokenRefresh from "@/hooks/useTokenRefresh.hook";

export interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const init = useAuthenticationStore((state) => state.init);
  const accessToken = useAuthenticationStore((state) => state.accessToken);

  useEffect(() => {
    init();
  }, [init, accessToken]);

  useTokenRefresh({ checkInterval: 30000, thresholdSeconds: 60 });

  return (
    <>
      <Toast.Provider />
      {children}
    </>
  );
}
