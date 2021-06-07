import {
	GraphQLID,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";

const UserType: GraphQLObjectType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	}),
});

export default UserType;
