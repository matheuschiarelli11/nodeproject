import { Router } from "express";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import authMiddleware from "../middlewares/auth";

const routes = new Router();

routes.get("/user", UserController.show);
routes.post("/user", UserController.index);
routes.put("/user/:id", authMiddleware, UserController.update);
routes.delete("/user/:id", UserController.delete);

routes.post("/session", SessionController.store);

export default routes;
