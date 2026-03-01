import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, default: null },
        variant: { type: String, default: null },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    paidAt: Date,
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    cancelledAt: Date,
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
