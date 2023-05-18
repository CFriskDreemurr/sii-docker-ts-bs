import express from "express";
import { connectToDatabase } from "./services/database.service"
import { productsRouter } from "./routes/products.router";


export const app = express();
const port = process.env.PORT || "4000"
connectToDatabase()
    .then(() => {
        app.use("/products", productsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });