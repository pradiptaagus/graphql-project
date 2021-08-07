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
import { getUnits, getUnit, storeUnit, updateUnit, deleteUnit } from "../controllers/unit/unit.controller";
import { getProducts } from "../controllers/product/product.controller";

const rootQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		getUsers,
		getUser,
		getUnits,
		getUnit,
		getProducts
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
		storeUnit,
		updateUnit,
		deleteUnit
	},
});

const schema = new GraphQLSchema({
	query: rootQuery,
	mutation: mutation,
});

export default schema;
