import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import UserType from "../../type-defs/user.type";
import UserService from "./user.service";
import validator from "validator";
import InputError from "../../errors/input.error";
import Bcrypt from "../../helpers/bcrypt.helper";
import Authorization from "../../helpers/authorization.helper";
import Token from "../../helpers/token.helper";
import { NotFoundError } from "../../errors/not-found.error";
import UsersType from "../../type-defs/users.type";

export const getUsers = {
	type: UsersType,
	args: {
		filter: { type: GraphQLString },
		page: { type: GraphQLInt },
		size: { type: GraphQLInt },
	},
	resolve: async (
		_: any,
		{ filter, page = 1, size = 10 }: any,
		context: any
	) => {
		try {
			const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

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
	resolve: async (_: any, { id }: any, context: any) => {
		try {
			const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);
			const user = await new UserService().findOne(id);
			return user;
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const storeUser = {
	type: UserType,
	args: {
		name: { type: GraphQLString },
		username: { type: GraphQLString },
		password: { type: GraphQLString },
		passwordConfirmation: { type: GraphQLString },
	},
	resolve: async (
		_: any,
		{ name, username, password, passwordConfirmation }: any,
		context: any
	) => {
		try {
			const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

			if (validator.isEmpty(name)) {
				throw new InputError({
					name: "The name field must not be empty.",
				});
			}

			if (validator.isEmpty(username)) {
				throw new InputError({
					username: "The username field must not be empty.",
				});
			}

			const user = await new UserService().findByUsername(username);
			if (user) {
				throw new InputError({
					username: "The username is already been taken.",
				});
			}

			if (validator.isEmpty(password)) {
				throw new InputError({
					password: "The password field must not be empty.",
				});
			}

			if (validator.isEmpty(passwordConfirmation)) {
				throw new InputError({
					passwordConfirmation:
						"The password field must not be empty.",
				});
			}

			if (
				!validator.matches(
					passwordConfirmation,
					new RegExp(password, "g")
				)
			) {
				throw new InputError({
					passwordConfirmation:
						"The password confirmation is not match with password.",
				});
			}

			const hashedPassword = new Bcrypt().encrypt(password);
			const result = await new UserService().store({
				name,
				username,
				password: hashedPassword,
			});

			return result;
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const updateUser = {
	type: UserType,
	args: {
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		username: { type: GraphQLString },
	},
	resolve: async (_: any, { id, name, username }: any, context: any) => {
		try {
			const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

			if (validator.isEmpty(id)) {
				throw new InputError({ id: "The id field must not be empty." });
			}

			if (validator.isEmpty(name)) {
				throw new InputError({
					name: "The name field must not be empty.",
				});
			}

			if (validator.isEmpty(username)) {
				throw new InputError({
					username: " The username field must not be empty.",
				});
			}

			const isExist = await new UserService().findUserAlreadyExist(
				id,
				username
			);
			if (isExist) {
				throw new InputError({
					username: "The username is already been taken.",
				});
			}

			await new UserService().update({ name, username }, id);

			const user = await new UserService().findOne(id);

			return user;
		} catch (error) {
			throw new Error(error);
		}
	},
};

export const updatePassword = {
	type: GraphQLBoolean,
	args: {
		oldPassword: { type: GraphQLString },
		newPassword: { type: GraphQLString },
		newPasswordConfirmation: { type: GraphQLString },
	},
	resolve: async (
		_: any,
		{ oldPassword, newPassword, newPasswordConfirmation }: any,
		context: any
	) => {
		try {
			const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

			if (validator.isEmpty(oldPassword)) {
				throw new InputError({
					oldPassword: "The oldPassword field must not be empty.",
				});
			}

			if (validator.isEmpty(newPassword)) {
				throw new InputError({
					newPassword: "The newPassword field must not be empty.",
				});
			}

			if (validator.isEmpty(newPasswordConfirmation)) {
				throw new InputError({
					newPasswordConfirmation:
						"The newPasswordConfirmation field must not be empty",
				});
			}

			if (newPassword !== newPasswordConfirmation) {
				throw new InputError({
					newPasswordConfirmation:
						"The newPasswordConfirmation is does not match to the newPassword",
				});
			}

			const token = context.headers.authorization.split(" ")[1];
			const decodedToken: any = new Token().verify(token);
			const userId = decodedToken.id;
			const username = decodedToken.username;

			const user = await new UserService().findByUsername(username);
			if (!user) {
				throw new NotFoundError("User not found");
			}

			const match = new Bcrypt().check(oldPassword, user.password);
			if (!match) {
				throw new InputError({
					oldPassword:
						"The oldPassword is did not match to the user password.",
				});
			}

			const hasedPassword = new Bcrypt().encrypt(newPassword);
			await new UserService().updatePassword(
				{ password: hasedPassword },
				userId
			);

			return true;
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
	resolve: async (_: any, { id }: any, context: any) => {
		try {
			const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

			if (validator.isEmpty(id)) {
				throw new InputError({
					id: "The id is required.",
				});
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
