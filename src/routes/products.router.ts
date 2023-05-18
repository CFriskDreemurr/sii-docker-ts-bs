import express, { Request, Response } from "express";
export const productsRouter = express.Router();

const ProductController = require("..\controllers\products.contoller.ts");

productsRouter.use(express.json());

const request = require('supertest');

productsRouter.get("/", ProductController.getAll);


productsRouter.get("/:id", ProductController.getOne);

productsRouter.post("/", ProductController.post);

productsRouter.put("/:id", ProductController.put);

productsRouter.delete("/:id", ProductController.delete);