import { userResolvers } from "./user";
import { questionResolvers } from "./question";
import { subjectResolvers } from "./subject";
import { topicResolvers } from "./topic";

const resolvers = {
  Mutation: {
    ...userResolvers.Mutation,
    ...questionResolvers.Mutation,
    ...subjectResolvers.Mutation,
    ...topicResolvers.Mutation,
  },
  Query: {
    ...userResolvers.Query,
    ...questionResolvers.Query,
    ...subjectResolvers.Query,
    ...topicResolvers.Query,
  },
};
export default resolvers;
