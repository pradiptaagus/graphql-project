import bcrypt from "bcrypt";

export default class Bcrypt {
	private saltRounds: number = 10;

	encrypt(password: string) {
		return bcrypt.hashSync(password, this.saltRounds);
	}

	check(password: string, hashedPassword: string) {
		return bcrypt.compareSync(password, hashedPassword);
	}
}
