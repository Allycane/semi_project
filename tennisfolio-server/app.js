import express from "express";
import cors from "cors";
import cartRouter from "./routes/carts.js";
import loginRouter from "./routes/login.js";
import signupRouter from "./routes/signup.js";
import styleRouter from "./routes/style.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/carts", cartRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use('/style', styleRouter);

app.listen(4000, () => {
	console.log(`Server is running on port 4000`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });