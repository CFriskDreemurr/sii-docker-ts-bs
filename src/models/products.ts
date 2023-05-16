import { ObjectId } from "mongodb";
export default interface Product {
    name: string;  price: number;  id?: ObjectId; 
}