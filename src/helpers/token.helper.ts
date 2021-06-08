import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class Token {
	generateToken(data: object) {
		return jwt.sign(data, `${process.env.TOKEN_SECRET}`, {
			algorithm: "HS256",
			expiresIn: "24h",
		});
	}

	verify(token: string) {
		try {
			const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`, {
				algorithms: ["HS256"],
			});
			return decoded;
		} catch (error) {
			throw error;
		}
	}
}
