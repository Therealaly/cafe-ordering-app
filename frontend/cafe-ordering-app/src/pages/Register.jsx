import { useRegisterForm } from "../hooks/useRegisterForm";
import FormInput from "../components/common/FormInput";
import FormCheckbox from "../components/common/FormCheckbox";
import AlertMessage from "../components/common/AlertMessage";

const Register = () => {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleRegister,
    navigateToLogin
  } = useRegisterForm();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
        style={{
          height: "40vh",
          backgroundImage:
            'url("https://ik.imagekit.io/k9csxbksz/Reservasi%20wk.jpg?updatedAt=1748360416867")'
        }}
      ></div>
      <div className="flex flex-col bg-gray-50 overflow-x-hidden w-full max-w-xs mx-auto flex-1">
        <div className="flex justify-center pt-4 pb-2">
          <img
            src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
            alt="Warna Kopi Logo"
            className="h-16"
          />
        </div>
        <div className="flex max-w-xs flex-wrap items-end gap-2 px-2 py-2">
          <label className="flex flex-col min-w-0 flex-1">
            <input
              name="name"
              placeholder="Name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-10 placeholder:text-[#648770] p-3 text-sm font-normal leading-normal"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-xs flex-wrap items-end gap-2 px-2 py-2">
          <label className="flex flex-col min-w-0 flex-1">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-10 placeholder:text-[#648770] p-3 text-sm font-normal leading-normal"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-xs flex-wrap items-end gap-2 px-2 py-2">
          <label className="flex flex-col min-w-0 flex-1">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-10 placeholder:text-[#648770] p-3 text-sm font-normal leading-normal"
              value={form.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-xs flex-wrap items-end gap-2 px-2 py-2">
          <label className="flex flex-col min-w-0 flex-1">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-10 placeholder:text-[#648770] p-3 text-sm font-normal leading-normal"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex items-center px-2 py-1">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mr-2"
            id="agree"
          />
          <label htmlFor="agree" className="text-[#648770] text-xs">
            I agree to the <span className="underline cursor-pointer">Privacy Notice</span>
          </label>
        </div>
        <div className="flex px-2 py-2">
          <button
            className="flex min-w-[72px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-green-700 text-white text-sm font-semibold"
            disabled={!form.name || !form.email || !form.password || !form.confirmPassword || !form.agree}
            onClick={handleRegister}
          >
            <span className="truncate">Sign Up</span>
          </button>
        </div>
        <p className="text-[#648770] text-xs font-normal leading-normal pb-2 pt-1 px-2 text-center underline">
          Already have an account? <a href="/login" className="text-green-700 underline">Login</a>
        </p>
        <div className="h-4 bg-white"></div>
      </div>
    </div>
  );
};

export default Register;