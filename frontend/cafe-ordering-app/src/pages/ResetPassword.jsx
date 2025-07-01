import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import FormInput from "../components/common/FormInput";
import AlertMessage from "../components/common/AlertMessage";

const ResetPassword = () => {
  const {
    formData,
    loading,
    error,
    success,
    handleInputChange,
    handleSubmit,
    navigateToLogin,
    isValidToken
  } = useResetPasswordForm();

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
      
      <div className="flex flex-col bg-gray-50 overflow-x-hidden w-full max-w-md mx-auto flex-1 p-6">
        <div className="flex justify-center pt-4 pb-2">
          <img
            src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
            alt="Warna Kopi Logo"
            className="h-16"
          />
        </div>
        
        <h1 className="px-4 text-xl font-semibold text-gray-800 mt-2 mb-4 text-center">
          Reset Password
        </h1>

        {success && <AlertMessage message={success} type="success" />}
        {error && <AlertMessage message={error} type="error" />}

        {!success && isValidToken && ( // Hide form after success and only show if token is valid
          <form onSubmit={handleSubmit}>
            <FormInput
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(value) => handleInputChange('newPassword', value)}
              disabled={loading}
            />
            
            <FormInput
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              disabled={loading}
            />
            
            <div className="flex px-4 py-3 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors"
              >
                <span className="truncate">
                  {loading ? "Resetting..." : "Reset Password"}
                </span>
              </button>
            </div>
          </form>
        )}
        
        <div className="text-center mt-4">
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

export default ResetPassword;