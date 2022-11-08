import mongoose from "mongoose";

const { Schema } = mongoose;
// if (!mongoose.models.Order) {
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
// console.log(mongoose);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
// }

module.exports = Order;
n;
