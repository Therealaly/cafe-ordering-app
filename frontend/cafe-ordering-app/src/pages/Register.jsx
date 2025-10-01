import { useRegisterForm } from "../hooks/useRegisterForm";
import FormInput from "../components/common/FormInput";
import FormCheckbox from "../components/common/FormCheckbox";
import AlertMessage from "../components/common/AlertMessage";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleRegister,
    navigateToLogin
  } = useRegisterForm();

  // Add state for password visibility
  const [showPasswordA, setShowPasswordA] = useState(false);
  const [showPasswordB, setShowPasswordB] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibilityA = () => {
    setShowPasswordA(!showPasswordA);
  };

  const togglePasswordVisibilityB = () => {
    setShowPasswordB(!showPasswordB);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
        style={{
          height: "35vh",
          backgroundImage:
            'url("https://ik.imagekit.io/k9csxbksz/Reservasi%20wk.jpg?updatedAt=1748360416867")'
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
          Create Your Account
        </h1>
        {error && <AlertMessage message={error} type="error" />}
        <form onSubmit={handleRegister}>
          <FormInput
            placeholder="Name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
          />
          <FormInput
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
          />
          <div className="relative">
            <FormInput
               type={showPasswordA ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibilityA}
              className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPasswordA ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <FormInput
              type={showPasswordB ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
            /> 
            <button
              type="button"
              onClick={togglePasswordVisibilityB}
              className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPasswordB ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <FormCheckbox
            checked={formData.agree}
            onChange={(checked) => handleInputChange('agree', checked)}
          >
            I agree to the <span className="underline cursor-pointer">Privacy Notice</span>
          </FormCheckbox>
          <div className="flex px-4 py-3">
            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors"
            >
              <span className="truncate">
                {loading ? "Creating Account..." : "Sign Up"}
              </span>
            </button>
          </div>
        </form>
        
        <p className="text-[#648770] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Already have an account? 
          <button 
            type="button"
            onClick={navigateToLogin}
            className="text-green-700 underline ml-1 hover:text-green-800"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;