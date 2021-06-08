import {
	GraphQLID,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID! },
		name: { type: GraphQLString! },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString }
	}),
});