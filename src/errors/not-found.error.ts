export class NotFoundError extends Error {
	public errorCode: number;

	constructor(...params: any) {
		super(...params);

		this.name = "NotFoundError";
		this.message = this.message || "Not found.";
		this.errorCode = 404;
	}
}
