import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}

export function handleError(
	err: CustomError | Error,
	_: Request,
	res: Response,
	__: NextFunction
) {
	if (err instanceof CustomError) {
		return res
			.status((err as CustomError).statusCode)
			.json({ message: err.message });
	}
	res.status(500).json({ message: err.message });
}
