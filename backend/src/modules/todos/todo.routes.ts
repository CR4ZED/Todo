import { Router } from "express";
import { validate } from "../../middleware/validate";
import * as controller from "./todo.controller";
import { createTodoBody, idParams, listTodosQuery, updateTodoBody } from "./todo.schema";

const router = Router();
router.post("/", validate({ body: createTodoBody }), controller.create);
router.get("/", validate({ query: listTodosQuery }), controller.list);
router.get("/:id", validate({ params: idParams }), controller.get);
router.patch("/:id", validate({ params: idParams, body: updateTodoBody }), controller.update);
router.delete("/:id", validate({ params: idParams }), controller.remove);

export default router;
