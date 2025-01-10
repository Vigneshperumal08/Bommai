import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-r from-blue-100 to-indigo-400">
      {/* Left Side (For larger screens) */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative rounded-lg">
        <div className="absolute inset-0 bg-blue-600 opacity-20 rounded-lg shadow-xl"></div>
        <div className="z-10 max-w-md space-y-6 text-center text-[#300f6e]">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="text-indigo-700">Bommaikaran</span>
          </h1>
          <button
            onClick={handleGoHome}
            className="w-full py-4 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Go Home without login view products
          </button>
        </div>
        
      </div>
      

      {/* Right Side (Content Area) */}
      <div className="flex flex-1 items-center justify-center bg-[#97c0db] px-6 py-12 sm:px-8 lg:px-10 shadow-lg rounded-lg">
        <div className="max-w-md w-full space-y-4">
          <Outlet />
          
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
