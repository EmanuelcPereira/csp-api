import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

import '../typeorm';

const app = express();
const port = 3333;

app.use(express.json());

app.use(cors());

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    nextFunction: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => {
  console.log('******************************');
  console.log(`server running on port ${port}`);
  console.log('******************************');
});
