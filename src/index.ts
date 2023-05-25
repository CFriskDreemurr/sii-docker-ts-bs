import express, { NextFunction } from "express";
import { connectToDatabase } from "./services/database.service"
import { productsRouter } from "./routes/products.router";


export const app = express();
const port = process.env.PORT || "4000"
connectToDatabase()
    .then(() => {
        app.use("/products", productsRouter);
        app.use((req, res, next) => {
            const error = new Error(`${req.method} ${req.originalUrl} not found`) as Error2;
            error['status'] = 404;
            next(error);
        });
        app.use((error:Error2, req:Request, res:Response, next:NextFunction) => {
                console.log(error.message);
                res.status(error['status'] || 500);
                res.json({ error: error.message });
        });

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

interface Error2 extends Error {

    status?: number;

}