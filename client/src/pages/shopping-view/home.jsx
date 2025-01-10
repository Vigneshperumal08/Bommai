import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { motion } from "framer-motion"; // Import Framer Motion
import Slider from "react-slick"; // Import Slider for the carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fadeIn = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const scaleUp = {
  initial: { scale: 0.95 },
  animate: { scale: 1, transition: { duration: 0.3 } },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const brandsWithImages = [
  { id: "21", label: "Vinayagar", image: "https://m.media-amazon.com/images/I/91jIN2NIQ-L.jpg" },
  { id: "22", label: "Murugar", image: "https://m.media-amazon.com/images/I/61RCFV1PzaL._AC_UF894,1000_QL80_.jpg" },
  { id: "23", label: "Amman", image: "https://m.media-amazon.com/images/I/61TYxwXdPlL.jpg" },
  { id: "24", label: "Krushnar", image: "https://i.etsystatic.com/19168989/r/il/b47dc5/5681449398/il_570xN.5681449398_fn9x.jpg" },
  { id: "25", label: "Saraswathi", image: "https://artehouse.in/cdn/shop/files/SARASWATHI-STATUE-IN-POLYMARBLE-INDOOR.jpg?v=1706536466" },
  { id: "26", label: "Lakshmi", image: "https://m.media-amazon.com/images/I/61hw1ZD3tiL.jpg" },
  { id: "27", label: "Shivan", image: "https://www.lladro.com/media/catalog/product/cache/c663c9190a9709136d2f86eddaea803b/f/2/f2bd728e126372e3e4e34fa13683c5fb48deb11ae992e7b48c2fc6009f32164ec3ffa20b617010064f18964da84873fff327f92b32d59fc41d9b8d8618f4ab5c.jpg" },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Slider settings for product sections
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen p-3 gap-2   bg-[#3c1586d0]">
     <div className="relative w-full border aspect-[16/9] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[2/1] overflow-hidden rounded-xl shadow-lg">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <motion.img
              src={slide?.image}
              key={index}
              className={`absolute top-0  w-full h-full  rounded-md transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              initial={{ opacity: 0, x: 50 }}
              animate={index === currentSlide ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
              alt={`Slide ${index + 1}`}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No images available
          </div>
        )}

      </div>
        {/* New Arrivals Section */}
        <section className="py-12 p-1 border bg-[#82b2f1] rounded-lg shadow-lg">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-serif text-center mb-8">New Arrivals</h2>
          <Slider {...sliderSettings}>
            {productList?.map((productItem) => (
              <motion.div
                key={productItem.id}
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              </motion.div>
            ))}
          </Slider>
        </div>
      </section>
      {/* Shop by Name Section */}
      <section className="py-12 p-1 border bg-[#82b2f1] rounded-xl shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-8">Shop by Name</h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {brandsWithImages.map((brandItem) => (
              <motion.div key={brandItem.id} variants={fadeIn} whileHover={{ scale: 1.15 }}>
                <Card
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                  className="cursor-pointer hover:shadow-lg text-black bg-[#c1a1fd] transition-shadow rounded-lg"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                    <img
                      src={brandItem.image}
                      alt={brandItem.label}
                      className="w-32 h-32 mb-2 object-cover rounded-lg"
                    />
                    <span className="text-base font-serif  text-center">{brandItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    
      {/* BestSeller Section with Slider */}
      <section className="py-12 border bg-[#82b2f1] rounded-lg shadow-lg">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-serif text-center mb-8">BestSeller</h2>
          <Slider {...sliderSettings}>
            {productList?.map((productItem) => (
              <motion.div key={productItem.id} variants={scaleUp} whileHover={{ scale: 1.05 }} className="cursor-pointer">
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              </motion.div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Offer Section with Slider */}
      <section className="py-12 border bg-[#82b2f1] rounded-lg shadow-lg">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-serif text-center mb-8">Offer</h2>
          <Slider {...sliderSettings}>
            {productList?.map((productItem) => (
              <motion.div key={productItem.id} variants={scaleUp} whileHover={{ scale: 1.10 }} className="cursor-pointer">
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              </motion.div>
            ))}
          </Slider>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
