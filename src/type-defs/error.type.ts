import { GraphQLObjectType, GraphQLString } from "graphql";

export const ErrorType = new GraphQLObjectType({
    name: "Error",
    fields: () => ({
        message: {type: GraphQLString},
        field: {type: GraphQLString}
    })
});