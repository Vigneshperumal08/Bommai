import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./ShoppingFooter"; // Importing the ShoppingFooter component

function ShoppingLayout() {
  return (
    <div className="flex flex-col  min-h-screen overflow-hidden">
      {/* Common header */}
      <ShoppingHeader />
      
      {/* Main content */}
      <main className="flex flex-col w-full flex-grow">
        <Outlet />
      </main>
      
      {/* Common footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
