import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="max-w-full p-6 sm:max-w-[600px] sm:p-8">
      <div className="grid gap-6">
        {/* Order Information */}
        <div className="grid gap-2">
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-medium text-base sm:text-lg">Order ID</p>
            <Label className="text-sm sm:text-base">{orderDetails?._id}</Label>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-medium text-base sm:text-lg">Order Date</p>
            <Label className="text-sm sm:text-base">
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-medium text-base sm:text-lg">Order Price</p>
            <Label className="text-sm sm:text-base">₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-medium text-base sm:text-lg">Payment Method</p>
            <Label className="text-sm sm:text-base">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-medium text-base sm:text-lg">Payment Status</p>
            <Label className="text-sm sm:text-base">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-medium text-base sm:text-lg">Order Status</p>
            <Badge
              className={`py-1 px-3 text-sm sm:text-base ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500 text-white"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <div className="font-medium text-lg sm:text-xl">Order Details</div>
          <ul className="grid gap-3 text-sm sm:text-base">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails.cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-wrap items-center justify-between border-b pb-2"
                >
                  <span className="w-full sm:w-auto">Title: {item.title}</span>
                  <span className="w-full sm:w-auto">Quantity: {item.quantity}</span>
                  <span className="w-full sm:w-auto">Price: ₹{item.price}</span>
                </li>
              ))
            ) : (
              <p>No items found in the order.</p>
            )}
          </ul>
        </div>

        {/* Shipping Information */}
        <div className="grid gap-4">
          <div className="font-medium text-lg sm:text-xl">Shipping Info</div>
          <div className="grid gap-1 text-sm sm:text-base text-muted-foreground">
            <span className="font-semibold">{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
