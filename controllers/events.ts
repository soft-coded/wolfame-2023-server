import { Request, Response } from "express";

import spreadsheetHandler from "../utils/spreadsheet-handler";

export async function getEventList(req: Request, res: Response) {
	const getList = (await spreadsheetHandler).getSortedList;
	const list = await getList(req.query["event-name"] as string);

	res.status(200).json({ list });
}

export async function getEventMatches(req: Request, res: Response) {
	const getMatches = (await spreadsheetHandler).getRecentMatches;

	let limit = 5;
	if (req.query.limit != null) limit = +req.query.limit;

	const matches = await getMatches(req.query["event-name"] as string, limit);

	res.status(200).json({ matches });
}
