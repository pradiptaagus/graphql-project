export default class UnathorizedError extends Error {
	public errorCode: number;

	constructor(...params: any) {
		super(...params);

		this.name = "UnathorizedError";
		this.message = this.message || "Unathorized.";
		this.errorCode = 400;
	}
}
