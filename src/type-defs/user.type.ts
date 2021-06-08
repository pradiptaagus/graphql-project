import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType: GraphQLObjectType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID! },
		name: { type: GraphQLString! },
		username: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	}),
});

export default UserType;
