import express, { NextFunction } from "express";

interface Error2 extends Error {

    status?: number;

}


export const notFoundErrorHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const error = new Error(`${req.method} ${req.originalUrl} not found`) as Error2;
    error['status'] = 404;
    next(error);
}

export const globalErrorHandler = (error:Error2, req:express.Request, res:express.Response, next:express.NextFunction) => {
    console.log(error.message);
    res.status(error['status'] || 500);
    res.json({ error: error.message });
}



