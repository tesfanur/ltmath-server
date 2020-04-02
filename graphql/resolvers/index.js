import { questionResolvers } from "./question";
import { userResolvers } from "./user";

const resolvers = {
  Mutation: {
    ...userResolvers.Mutation,
    ...questionResolvers.Mutation
  },
  Query: {
    ...userResolvers.Query,
    ...questionResolvers.Query
  }
};
export default resolvers;
