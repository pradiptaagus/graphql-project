import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
	getUsers,
	getUser,
	storeUser,
	updateUser,
	updatePassword,
	deleteUser,
} from "../controllers/user/user.controller";
import { login } from "../controllers/auth/auth.controller";

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
		login,
		storeUser,
		updateUser,
		updatePassword,
		deleteUser,
	},
});

const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: mutation,
});

export default schema;
