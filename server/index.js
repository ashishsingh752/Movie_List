import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from './routes/user.route.js'

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("hello form express"));
app.use('/', userRoutes)
app.all('*', (req, res)=>res.send('route does not exist'))

app.listen(port, () => console.log(" server is running"));
