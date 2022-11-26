import { createUser, findUser, validatePassword } from "../lib/user";
import { setLoginSession, getLoginSession } from "../lib/auth";
import { removeTokenCookie } from "../lib/auth-cookies";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    async viewer(_root, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req);

        if (session) {
          return findUser({ email: session.email });
        }
      } catch (error) {
        throw new GraphQLError(
          "Authentication token is invalid, please log in",
          {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          }
        );
      }
    },
    products: async (
      _,
      {},
      {
        context: {
          models: { Product },
        },
      }
    ) => {
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        console.log("Product Error", err);
      }
    },
    product: async (
      _,
      { id },
      {
        context: {
          models: { Product },
        },
      }
    ) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input);
      return { user };
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email });

      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          email: user.email,
        };

        await setLoginSession(context.res, session);

        return { user };
      }

      throw new GraphQLError("Invalid email and password combination");
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res);
      return true;
    },
    newProduct: async (
      _,
      { input },
      {
        context: {
          models: { Product },
        },
      }
    ) => {
      try {
        const product = new Product(input);

        const result = await product.save();

        return result;
      } catch (err) {
        console.log("NewProduct Error", err);
      }
    },
    updateProduct: async (
      _,
      { id, input },
      {
        context: {
          models: { Product },
        },
      }
    ) => {
      // let product = await Product.findById(id);

      // if (!product) {
      //   throw new Error("Product not found");
      // }

      let product = await Product.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return product;
    },
    deleteProduct: async (
      _,
      { id },
      {
        context: {
          models: { Product },
        },
      }
    ) => {
      // const product = await Product.findById(id);

      // if (!product) {
      //   throw new Error("Producto no encontrado");
      // }

      await Product.findByIdAndDelete(id);

      return "Producto eliminado";
    },
  },
};
