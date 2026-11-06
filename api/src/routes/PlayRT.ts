import express from "express";
import { PLAYER } from "../controllers/PlayCTR.js";

export const playRT: express.Router = express.Router();
    playRT.post("/", PLAYER.Create);
    playRT.get("/", PLAYER.FetchAll);
    playRT.get("/:id", PLAYER.GetOne);
    playRT.put("/:id", PLAYER.Update);
    playRT.delete("/:id", PLAYER.Delete);


