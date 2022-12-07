import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    password: String
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    password: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: ID
  }

  input ProductInput {
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: ID
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    product(id: ID!): Product!
    products: [Product]!
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    updateUser(id: ID!, input: UpdateUserInput!): User
    newProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): String
  }
`;
