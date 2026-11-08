import express from "express";
import { ZodError } from "zod";

export const sendError = (
    res: express.Response,
    error: unknown,
    message: string
) => {
    const status = error instanceof ZodError ? 400 : 500;
    return res
        .status(status)
        .json({
            success: false,
            message: message,
            error: error instanceof Error ? 
                error.message : "Unknown Error!"
        });
};


