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

    db.query(`SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`,function(err, results) {
        if (err) throw err;

        if (results.length === 0) {
            res.render("login",{validate: "Tài khoản không tồn tại hoặc bạn nhập sai mật khẩu, tài khoản"});
            return;
        }


        res.cookie('username', 'admin', { expires: new Date(Date.now() + 9000000000) });
        res.redirect("/");
    });
};