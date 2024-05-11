"use client";

import useGoogleLogin from "@/src/auth/hooks/use-google-login";
import { useEffect, useRef } from "react";

export default function GoogleLoginButton() {
  const { isLoaded, renderGoogleLoginButton } = useGoogleLogin();
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      renderGoogleLoginButton(reference);
    }
  }, [isLoaded, renderGoogleLoginButton]);

  return (
    <div
      ref={reference}
      id="google-login-button"
      className="flex items-center justify-center m-4"
    ></div>
  );
}
