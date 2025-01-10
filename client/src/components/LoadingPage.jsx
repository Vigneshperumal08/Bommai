import React from "react";
import logo from "../assets/logo.png";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#5c8eeb] px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Logo or brand icon */}
        <div className="mb-4">
          <img
            src={logo} // Imported logo file
            alt="Brand Logo"
            className="w-28 sm:w-28 md:w-28" // Adjust the size of the logo on different screen sizes
          />
        </div>
        {/* Loading spinner */}
        <div className="loader mb-2"></div>
        {/* Loading text */}
        <p className="text-[#fff] text-sm sm:text-base md:text-lg">
          Welcome to Bommaikaran...
        </p>
      </div>

      {/* Inner CSS for the loader animation */}
      <style jsx>{`
        .loader {
          border-top-color: transparent;
          border-width: 4px;
          border-style: solid;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
