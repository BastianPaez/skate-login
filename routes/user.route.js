import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyTokenJWT } from "../middlewares/jwt.middleware.js";

const router = Router();

router.get('/list',  UserController.listUsers)
router.post('/info', verifyTokenJWT, UserController.infoUser)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.put('/update', verifyTokenJWT, UserController.updateUser)
router.put('/check', UserController.checkChanged)
router.delete('/delete', verifyTokenJWT, UserController.removeUser)
export default router