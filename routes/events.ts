import { Router } from "express";

const router = Router();

router.route(":eventName").get();
