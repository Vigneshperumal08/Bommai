import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { motion } from "framer-motion";

function ShoppingAccount() {
  return (
    <div className="flex flex-col bg-[#270d57d8] rounded-md ">

      {/* Content Section */}
      <motion.div
        className="container mx-auto grid grid-cols-1 gap-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col rounded-lg border bg-[#91acf7] p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Tabs defaultValue="orders">
            {/* Tabs Header */}
            <TabsList className="flex justify-center mb-10">
              <TabsTrigger
                value="orders"
                className="px-6 py-2 text-sm font-medium text-primary hover:bg-muted focus:outline-none focus:ring focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-6 py-2 text-sm font-medium text-primary hover:bg-muted focus:outline-none focus:ring focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <TabsContent value="orders">
                <ShoppingOrders />
              </TabsContent>
            </motion.div>

            <motion.div
              key="address"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <TabsContent value="address">
                <Address />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

export default ShoppingAccount;
