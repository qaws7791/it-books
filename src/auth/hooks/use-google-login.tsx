"use client";
import { googleLogin } from "@/src/auth/api";
import { useUserProfile } from "@/src/user/queries";
import { useQueryClient } from "@tanstack/react-query";
import { CredentialResponse } from "google-one-tap";
import Script from "next/script";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface googleLoginContext {
  renderGoogleLoginButton: (reference: React.RefObject<HTMLDivElement>) => void;
  isLoaded: boolean;
}

export const googleLoginContext = createContext<googleLoginContext | undefined>(
  undefined,
);

export const GoogleLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const [isLoaded, setIsLoaded] = useState(false);
  const { data } = useUserProfile();
  const renderGoogleLoginButton = (
    reference: React.RefObject<HTMLDivElement>,
  ) => {
    if (!isLoaded || !reference.current) return;
    window.google.accounts.id.renderButton(reference.current, {
      theme: "outline",
      shape: "circle",
      size: "large",
      text: "signin_with",
      locale: "ko",
    });
  };

  const handleCredentialResponse = async (response: CredentialResponse) => {
    const { credential, select_by } = response;
    try {
      await googleLogin({ credential, select_by });
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    } catch {
      toast.error("로그인에 실패했습니다.");
    }
  };

  const onLoadScript = () => {
    setIsLoaded(true);

    window.google.accounts.id.initialize({
      ux_mode: "redirect",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      login_uri: "http://localhost:4000/api/auth/google",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.prompt();
  };

  useEffect(() => {
    if (data && isLoaded) {
      window.google.accounts.id.cancel();
    }
  }, [data, isLoaded]);

  return (
    <googleLoginContext.Provider value={{ isLoaded, renderGoogleLoginButton }}>
      {children}
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={onLoadScript}
      />
    </googleLoginContext.Provider>
  );
};

const useGoogleLogin = () => {
  const context = useContext(googleLoginContext);
  if (!context) {
    throw new Error("useGoogleLogin must be used within a GoogleLoginProvider");
  }
  return context;
};

export default useGoogleLogin;
