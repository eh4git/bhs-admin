import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # Products
  type Product {
    _id: ID
    name: String
    description: Int
    image: String
    price: Float
    quantity: Int
    category: ID
  }

  input ProductInput {
    name: String
    description: Int
    image: String
    price: Float
    quantity: Int
    category: ID
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    #Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
  }
`;

module.exports = typeDefs;
