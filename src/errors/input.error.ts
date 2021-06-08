export default class InputError extends Error {
	public errors: object;
	public errorCode: number;

	constructor(errors: object, ...params: any) {
		super(...params);
		this.name = "InputError";
		this.message = this.message || JSON.stringify(errors);
		this.errors = errors;
		this.errorCode = 400;
	}
}
