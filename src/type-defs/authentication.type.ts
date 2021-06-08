import { GraphQLObjectType, GraphQLString } from "graphql";
import UserType from "./user.type";

export const AuthenticationType = new GraphQLObjectType({
	name: "Authentication",
	fields: () => ({
		user: { type: UserType },
		token: { type: GraphQLString },
	}),
});

export default AuthenticationType;
