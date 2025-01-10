import { motion } from "framer-motion";
import { LogOut, Menu, Search, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Input } from "../ui/input"; // Added Input
import logo from "../../assets/logo.png";

const fadeInVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(menuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? {
            category: [menuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${menuItem.id}`));
    } else {
      navigate(menuItem.path);
    }
  }

  return (
    <motion.nav
      className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          key={menuItem.id}
          className="cursor-pointer"
        >
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-lg font-serif"
          >
            {menuItem.label}
          </Label>
        </motion.div>
      ))}
    </motion.nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Added search state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/shop/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  }

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id)); // Only fetch cart items if user is logged in
    }
  }, [dispatch, user]);

  return (
    <motion.div
      className="flex lg:items-center lg:flex-row flex-col gap-5"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      
      <div className="hidden xl:block text-[#ff3030]">
        <MenuItems />
      </div>
      <div className="flex items-center gap-3">
                <Button      
          onClick={() => navigate("/shop/search")}
         className="bg-[#49147a] hover:bg-black"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Cart Button */}
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative w-16 bg-[#49147a] hover:bg-black"
        >
          <ShoppingCart className="w-6 h-6 text-[#ffffff]" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm text-[#ffffff]">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {/* User Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-white">
            <AvatarFallback className="bg-[#49147a] text-white font-extrabold cursor-pointer">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-[#b1cce7] text-black">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          {!user && (
            <DropdownMenuItem onClick={() => navigate("/auth/register")}>
              <UserCog className="mr-2 h-4 w-4" />
              Login
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

function ShoppingHeader() {
  return (
    <motion.header
      className="top-0 z-40 w-full rounded-lg border bg-[#b1cce7]"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div className="flex h-24  items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-4">
          <motion.img
            src={logo}
            alt="Bommaikaran Logo"
            className="h-16 w-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.5 } }}
          />
          <motion.span className="font-serif text-[#ff5e36] text-3xl">
            Bommaikaran
          </motion.span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden text-white   bg-[#49147a]">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-transparent   text-[#ff5e36] max-w-xs">
          <HeaderRightContent />
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </motion.header>
  );
}

export default ShoppingHeader;
