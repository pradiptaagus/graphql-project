import {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import PaginationType from "../../type-defs/pagination.type";
import UserType from "../../type-defs/user.type";
import UserService from "./user.service";

export const userPagination = {
	type: PaginationType,
	args: {
		filter: { type: GraphQLString },
	},
	resolve: async (_: any, { filter }: any) => {
		try {
			const total = await new UserService().count({ filter });
			return total;
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const getUsers = {
	type: PaginationType(UserType),
	args: {
		filter: { type: GraphQLString },
		page: { type: GraphQLInt },
		size: { type: GraphQLInt },
	},
	resolve: async (_: any, { filter, page = 1, size = 10 }: any) => {
		try {
			const users = await new UserService().findAll({
				filter,
				page,
				size,
			});
			const count = await new UserService().count({ filter });
			return {
				pagination: {
					total: count,
					size,
					page,
				},
				data: users,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const getUser = {
	type: UserType,
	args: {
		id: { type: GraphQLID },
	},
	resolve: async (_: any, { id }: any) => {
		const user = await new UserService().findOne(id);
	},
};

export const storeUser = {
	type: UserType,
	args: {
		name: { type: GraphQLString },
	},
	resolve: async (_: any, { name }: any) => {
		try {
			const result = await new UserService().store({ name });
			return result;
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const updateUser = {
	type: UserType,
	args: {
		id: { type: GraphQLID! },
		name: { type: GraphQLNonNull(GraphQLString)! },
	},
	resolve: async (_: any, { id, name }: any) => {
		try {
			const result = await new UserService().update({ name }, id);
			return await new UserService().findOne(id);
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const deleteUser = {
	type: GraphQLBoolean,
	args: {
		id: { type: GraphQLID },
	},
	resolve: async (_: any, { id }: any) => {
		try {
			const result = await new UserService().delete(id);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	},
};
