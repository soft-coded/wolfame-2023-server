import { Request, Response } from "express";

import spreadsheetHandler from "../utils/spreadsheet-handler";

export async function getEventList(req: Request, res: Response) {
	const getList = (await spreadsheetHandler).getSortedList;

	res
		.status(200)
		.json({ list: await getList(req.query["event-name"] as string) });
}
