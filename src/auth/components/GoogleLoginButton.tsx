"use client";

import useGoogleLogin from "@/src/auth/hooks/useGoogleLogin";
import { useEffect, useRef } from "react";

export default function GoogleLoginButton() {
  const { isLoaded, renderGoogleLoginButton } = useGoogleLogin();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      renderGoogleLoginButton(ref);
    }
  }, [isLoaded, renderGoogleLoginButton]);

  return (
    <div
      ref={ref}
      id="google-login-button"
      className="flex items-center justify-center m-4"
    ></div>
  );
}
