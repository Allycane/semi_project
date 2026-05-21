import express from "express";
import controller from "../controller/carts.js";

const router = express();



router.post("/add", controller.addToCart);

export default router;