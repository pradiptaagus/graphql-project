import {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import PaginationType from "../../type-defs/pagination.type";
import {UserType} from "../../type-defs/user.type";
import UserService from "./user.service";
import validator from "validator"

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
		name: {type: GraphQLString}
	},
	resolve: async (_: any, { name }: any) => {		
		try {
			if (validator.isEmpty(name)) {
				throw new Error("The name field must not be empty.")
			}

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
		name: { type: GraphQLString! },
	},
	resolve: async (_: any, { id, name }: any) => {
		try {
			if (validator.isEmpty(id)) {
				throw new Error("The id field must not be empty.");
			}

			const isExist = await new UserService().findOne(id);
			if (!isExist) {
				throw new Error("The user with specified ID is doesn't exist.");
			}

			if (validator.isEmpty(name)) {
				throw new Error("The name field must not be empty.");
			}

			await new UserService().update({ name }, id);

			const user = await new UserService().findOne(id);
			
			return user;
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
			if (validator.isEmpty(id)) {
				throw new Error("The user with specified ID is doesn't exist.");
			}

			const result = await new UserService().delete(id);
			
			if (!result.affected) {
				throw new Error("The user with specified ID is doesn't exist.");
			}

			return true;
		} catch (error) {
			throw new Error(error);
		}
	},
};
