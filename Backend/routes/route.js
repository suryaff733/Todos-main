import { Router } from "express";
import {loginUser,signupUser} from "../controller/userController.js"
import { createTodo, deletTods, getTodos, updateTodos } from "../controller/Todo.js";
import auth from "../middleWare/auth.js";

const router = Router();

router.post("/login",loginUser);
router.post("/signup",signupUser);
router.use(auth)

router.post('/',createTodo)
router.get('/',getTodos)
router.put('/:id',updateTodos)
router.delete('/:id',deletTods)
export default router;