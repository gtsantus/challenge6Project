import Config from "./config/Config.js";
import Database from "./database/Database.js";
import Server from "./server/Server.js";
import UserController from "./controllers/User.Controller.js";
import UserRoutes from "./routes/Users.Routes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const userController = new UserController();
const userRoutes = new UserRoutes(userController);

const server = new Server(PORT, HOST, userRoutes);
const database = new Database(DB_URI);

server.start();
database.connect();