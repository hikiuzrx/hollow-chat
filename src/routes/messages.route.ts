import express,{Router} from "express"
import { getRooms, getChatHistory } from "../controllers/messages.controller"
import isAuthenticated from "../middlewares/isAuthenticated"
const messagesRouter:Router = express.Router()
messagesRouter.get("/users",isAuthenticated,getRooms)
messagesRouter.get("/:id",isAuthenticated,getChatHistory)