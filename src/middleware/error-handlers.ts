import express, { NextFunction } from "express";


export const notFoundErrorHandler = (req:express.Request, res:express.Response, next:NextFunction) => {
    const error = new Error(`${req.method} ${req.originalUrl} not found`) as Error2;
    error['status'] = 404;
    next(error);
}

export const globalErrorHandler = (error:Error2, req:express.Request, res:express.Response, next:NextFunction) => {
    console.log(error.message);
    res.status(error['status'] || 500);
    res.json({ error: error.message });
}



interface Error2 extends Error {

    status?: number;

}