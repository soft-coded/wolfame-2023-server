import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { CustomError } from "../utils/error-handler";

export function valRes(req: Request, _: Response, next: NextFunction) {
	const valRes = validationResult(req);
	if (!valRes.isEmpty()) {
		throw new CustomError(400, valRes.array({ onlyFirstError: true })[0].msg);
	}

	next();
}
