import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${req.method}] - ${req.originalUrl} - Request recived`);
    res.on("finish", () => {
        console.log(`Status code : ${res.statusCode}`);
    });

    next();
}

export default logger;