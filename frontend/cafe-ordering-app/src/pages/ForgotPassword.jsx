import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import FormInput from "../components/common/FormInput";
import AlertMessage from "../components/common/AlertMessage";

const ForgotPassword = () => {
  const {
    email,
    loading,
    error,
    success,
    handleEmailChange,
    handleSubmit,
    navigateToLogin
  } = useForgotPasswordForm();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
        style={{
          height: "30vh",
          backgroundImage:
            'url("https://ik.imagekit.io/k9csxbksz/Warna%20kopi%20bldg2.png?updatedAt=1748360380862")',
        }}
      ></div>
      <div className="flex flex-col bg-gray-50 max-w-md mx-auto p-6 rounded-2xl h-min shadow-sm mt-15 border-gray-200">
        <div className="flex justify-center pt-4 pb-2">
          <img
            src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
            alt="Warna Kopi Logo"
            className="h-16"
          />
        </div>
        <h1 className="px-4 text-xl font-semibold text-gray-800 mt-2 mb-2 text-center">
          Forgot Your Password?
        </h1>
        <p className="px-4 text-sm text-gray-600 mb-4 text-center">
          Don't worry! Enter your email below and we'll send you a link to reset your password.
        </p>
        
        {success && <AlertMessage message={success} type="success" />}
        {error && <AlertMessage message={error} type="error" />}

        {!success && ( // Hide form if success message is shown
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
            />
            
            <div className="flex px-4 py-3 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors"
              >
                <span className="truncate">
                  {loading ? "Sending..." : "Send Reset Link"}
                </span>
              </button>
            </div>
          </form>
        )}
        
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={navigateToLogin}
            className="text-sm text-green-700 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;