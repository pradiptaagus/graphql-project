import validator from "validator";
import Bcrypt from "../../helpers/bcrypt.helper";
import UserService from "../user/user.service";
import Token from "../../helpers/token.helper";
import InputError from "../../errors/input.error";
import { NotFoundError } from "../../errors/not-found.error";
import AuthenticationType from "../../type-defs/authentication.type";
import { GraphQLString } from "graphql";

export const login = {
	type: AuthenticationType,
	args: {
		username: { type: GraphQLString },
		password: { type: GraphQLString },
	},
	resolve: async (_: any, { username, password }: any) => {
		try {
			if (validator.isEmpty(username)) {
				throw new InputError(
					{
						username: "The username field must not be empty.",
					},
					"Invalid input."
				);
			}

			if (validator.isEmpty(password)) {
				throw new InputError(
					{
						password: "The password field must not be empty.",
					},
					"Invalid input."
				);
			}

			let user = await new UserService().findByUsername(username);
			if (!user) {
				throw new NotFoundError("Account not found.");
			}

			const checkPassword = new Bcrypt().check(password, user.password);
			if (!checkPassword) {
				throw new InputError({
					password: "Wrong password.",
				});
			}

			const token = new Token().generateToken({
				id: user.id,
				username: user.username,
			});

			user = await new UserService().findOne(user.id);

			return { user, token };
		} catch (error) {
			throw new Error(error);
		}
	},
};
