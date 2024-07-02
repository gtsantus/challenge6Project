import Config from "./config/Config.js";
import Database from "./database/Database.js";
import Server from "./server/Server.js";
import UserController from "./controllers/User.controller.js";
import UserRoutes from "./routes/Users.routes.js";
import CardController from "./controllers/Card.controller.js";
import CardRoutes from "./routes/Cards.routes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const userController = new UserController();
const userRoutes = new UserRoutes(userController);

const cardController = new CardController();
const cardRoutes = new CardRoutes(cardController);

const server = new Server(PORT, HOST, [userRoutes, cardRoutes]);
const database = new Database(DB_URI);

server.start();
database.connect();