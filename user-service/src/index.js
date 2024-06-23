import Config from "./config/Config.js";
import Database from "./database/Database.js";
import Server from "./server/Server.js";
import UserController from "./controller/UserController.js";
import UserRoutes from "./routes/UserRoutes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const userController = new UserController();
const userRoutes = new UserRoutes(userController);

const server = new Server(HOST, PORT, userRoutes);
const database = new Database(DB_URI);

server.start();
database.connect();