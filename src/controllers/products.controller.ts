import express, { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Product from "../models/products";

exports.getAll = async (_req: Request, res: Response, next:NextFunction) => {
    try {
       const products = (await collections.products?.find({}).toArray()) as unknown as Product[];
  
        res.status(200).send(products);
    } catch (error:any) {
        res.status(500).send(error.message);
        next(error)
    }
}

exports.getOne = async (req: Request, res: Response, next:NextFunction) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const product = (await collections.products?.findOne(query)) as unknown as Product;

        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send(`Unable to find product with id: ${req.params.id}`);
        next(error)
    }
    
}

exports.post = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const newProduct = req.body as Product;
        const result = await collections.products?.insertOne(newProduct);

        result
            ? res.status(201).send(`Successfully created a new product with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new product.");
    } catch (error:any) {
        res.status(400).send(error.message);
        next(error);
    }
}

exports.put = async (req: Request, res: Response, next:NextFunction) => {
    const id = req?.params?.id;

    try {
        const updatedProduct: Product = req.body as Product;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.products?.updateOne(query, { $set: updatedProduct });

        result
            ? res.status(200).send(`Successfully updated product with id ${id}`)
            : res.status(304).send(`Product with id: ${id} not updated`);
    } catch (error:any) {
        res.status(400).send(error.message);
        next(error);
    }
}

exports.delete = async (req: Request, res: Response, next:NextFunction) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.products?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed product with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove product with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Product with id ${id} does not exist`);
        }
    } catch (error:any) {
        res.status(400).send(error.message);
        next(error);
    }
}