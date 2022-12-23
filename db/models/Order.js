const mongoose = require("mongoose");
const { Schema } = mongoose;

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
// console.log("MONGOOSE MODELS-", mongoose.models?.Order);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
