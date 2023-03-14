import { Router } from "express";
import { query } from "express-validator";
import asyncHandler from "express-async-handler";

import { getEventList } from "../controllers/events";
import { valRes } from "../controllers/validation";
import { sheetTitleToId } from "../utils/spreadsheet-handler";

const router = Router();

// full path: /event/get-list?event-name=tug-of-war
router.route("/get-list").get(
	query("event-name")
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage("Event name is required")
		.bail()
		.custom((eventName) => eventName in sheetTitleToId)
		.withMessage("Event does not exist"),
	valRes,
	asyncHandler(getEventList)
);

export default router;
