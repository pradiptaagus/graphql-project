import Token from "./token.helper";
import UnathorizedError from "../errors/unathorized.error";

export default class Authorization {
	check(authorizationHeader: string) {
		if (!authorizationHeader) {
			throw new UnathorizedError("Token not found.");
		} else if (!(authorizationHeader.split(" ")[0] === "Bearer")) {
			throw new UnathorizedError("Invalid token.");
		} else {
			const token = authorizationHeader.split(" ")[1];
			const result = new Token().verify(token);
			if (!result) {
				throw new UnathorizedError("Invalid token.");
			}
			return true;
		}
	}
}
