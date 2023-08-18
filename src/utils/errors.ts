import { ErrorStatus } from '../types';

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, name: string, statusCode: number) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class ParsingError extends CustomError {
    constructor(message: string, errorStatus: ErrorStatus) {
        super(message, "ParsingError", errorStatus);
    }
}