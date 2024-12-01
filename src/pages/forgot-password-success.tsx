import { AuthLayoutTitle } from "@/components/auth-layout";

export function ForgotPasswordSuccess() {
  return (
    <>
      <AuthLayoutTitle className="py-4">
        <p className="text-5xl text-center py-5">🚀</p>
        <h2 className="mb-8 text-2xl text-cyan-900 font-bold text-center">
          Password reset successfully!
        </h2>
      </AuthLayoutTitle>
      <div className="my-4 text-center text-primary hover:text-emerald-500">
        <a href="/">Go back to Home</a>
      </div>
    </>
  );
}
