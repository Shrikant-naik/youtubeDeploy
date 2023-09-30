import express from "express"
import { createUser, google, login } from "../Controllers/Auths.js";

const router = express.Router()

router.post("/createUser", createUser)
router.post("/login", login)
router.post("/google", google)

export default router;