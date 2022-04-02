import express, { Request, Response } from "express";
import { MySQLDb } from "../../db/db";

type statusbike = {
    statusbikeID: string, 
    statuslock: string,
    longitude: number,
    latitude: number
}

export const history = (req: Request<{}, {}, statusbike>, res: Response) => {
    //TODO
    const mysql = MySQLDb.getInstance();
    const db = mysql.db;


};