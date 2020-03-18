import { AuthenticationError } from "apollo-server";
import authenticate from "./authenticate";
const context = async ({ req }) => {
  try {
    const user = await authenticate({ req });
    console.log({
      userfromcontext: user
    });
    if (!user) {
      throw new AuthenticationError("AuthenticationError");
    }
    console.log({ user });
    return { req, user };
  } catch (error) {
    console.log({ error });
    return { req };
  }
};

export default context;
