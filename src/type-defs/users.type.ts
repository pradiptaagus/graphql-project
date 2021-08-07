import { GraphQLList, GraphQLObjectType } from "graphql";
import PaginationType from "./pagination.type";
import UserType from "./user.type";

const UsersType: GraphQLObjectType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        pagination: {type: PaginationType},
        data: {type: GraphQLList(UserType)}
    })
});

export default UsersType;