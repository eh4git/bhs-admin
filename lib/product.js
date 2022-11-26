const dbConnect = require("../db/connection");
// const { Product } = require("../db/models");

export async function findProducts() {
  try {
    await dbConnect();
    // const products = await Product.find({});
    // console.log(products);
    return products;
  } catch (err) {
    console.log("Product Error", err);
  }
}
