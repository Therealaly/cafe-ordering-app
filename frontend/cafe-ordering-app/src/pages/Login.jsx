import { useLoginForm } from "../hooks/useLoginForm";
import FormInput from "../components/common/FormInput";
import AlertMessage from "../components/common/AlertMessage";

const Login = () => {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleLogin,
    navigateToForgotPassword,
    navigateToRegister
  } = useLoginForm();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
        style={{
          height: "40vh",
          backgroundImage:
            'url("https://ik.imagekit.io/k9csxbksz/Warna%20kopi%20bldg2.png?updatedAt=1748360380862")'
        }}
      ></div>
      
      <div className="flex flex-col bg-gray-50 overflow-x-hidden w-full max-w-md mx-auto flex-1">
        <div className="flex justify-center pt-4 pb-2">
          <img
            src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
            alt="Warna Kopi Logo"
            className="h-16"
          />
        </div>
        
        <h1 className="px-4 text-lg font-semibold text-gray-800 mt-2">
          Login to Your Account
        </h1>
        
        {error && <AlertMessage message={error} type="error" />}
        
        <form onSubmit={handleLogin}>
          <FormInput
            placeholder="Email or username"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
          />
          
          <FormInput
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
          />
          
          <div>
            <button
              type="button"
              className="flex items-center justify-end px-4 py-2 text-sm text-gray-600 hover:text-green-700"
              onClick={navigateToForgotPassword}
            >
              <span>Forgot Password?</span>
            </button>
          </div>
          
          <div className="flex px-4 py-3">
            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors"
            >
              <span className="truncate">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>
          </div>
        </form>
        
        <p className="text-[#648770] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
          Don't have an account? 
          <button 
            type="button"
            onClick={navigateToRegister}
            className="text-green-700 underline ml-1 hover:text-green-800"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;