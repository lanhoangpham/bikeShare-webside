import mysql from "mysql";
import { IConfigDb } from "./config";


export class MySQLDb {

    private static instance: MySQLDb;
    public db: mysql.Connection;
    private constructor() {
        this.db = this.connectDb();
    }

    private connectDb = () => {
        const config: IConfigDb = {
            host: "localhost",
            user: "root",
            password: "",
            database: "web"
        }

        const connect = mysql.createConnection(config);
        console.info("connected db successfully!!");
        return connect;

    }

    public static getInstance = () => {
        if (MySQLDb.instance === undefined) {
            MySQLDb.instance = new MySQLDb();
        }

        return MySQLDb.instance;
    }
}