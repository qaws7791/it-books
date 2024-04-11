import Script from "next/script";

export default function GoogleLoginScript() {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async></Script>
      <div
        id="g_id_onload"
        data-client_id="292665397064-n5p5176tflg5cqg5sodu60tsenog7pa2.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="redirect"
        data-login_uri="http://localhost:4000/api/auth/google/callback"
        data-itp_support="true"
      ></div>
    </>
  );
}
