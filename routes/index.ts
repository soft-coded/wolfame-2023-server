import { Router } from "express";

import eventRouter from "./events";

const router = Router();

router.get("/", (_, res) => {
	res.send("Server running");
});

router.use("/event", eventRouter);

export default router;
