export default class InternalServerError extends Error {
	public errorCode: number;

	constructor(...params: any) {
		super(...params);

		this.name = "InternalServerError.";
		this.message = "Internal server error";
		this.errorCode = 500;
	}
}
