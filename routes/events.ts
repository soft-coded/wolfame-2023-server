import { Router } from "express";
import { query } from "express-validator";
import asyncHandler from "express-async-handler";

import { getEventList, getEventMatches } from "../controllers/events";
import { valRes } from "../controllers/validation";
import { sheetTitleToId } from "../utils/spreadsheet-handler";

const router = Router();

// full path: /event/get-leaders?event-name=tug-of-war
router.route("/get-leaders").get(
	query("event-name")
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage("Event name is required")
		.bail()
		.custom((eventName) => eventName in sheetTitleToId)
		.withMessage("Event does not exist"),
	valRes,
	asyncHandler(getEventList)
);

// full path: /event/get-matches?event-name=tug-of-war&limit=5
router.route("/get-matches").get(
	query("event-name")
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage("Event name is required")
		.bail()
		.custom((eventName) => eventName in sheetTitleToId)
		.withMessage("Event does not exist"),
	query("limit")
		.optional()
		.isInt({ min: 1, max: 10 })
		.withMessage("Invalid limit, must be between 1 and 10"),
	valRes,
	asyncHandler(getEventMatches)
);

export default router;
