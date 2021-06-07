import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
	getUsers,
	getUser,
	storeUser,
	updateUser,
	deleteUser,
} from "../controllers/user/user.controller";

const rootQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		getUsers,
		getUser,
	},
});

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		storeUser,
		updateUser,
		deleteUser,
	},
});

const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: mutation,
});

export default schema;
