import express, { Request, Response } from "express";
import { MySQLDb } from "../../db/db";

export const login = (req: Request<{}, {}, { username: string, password: string }>, res: Response) => {
    //TODO
    const mysql = MySQLDb.getInstance();
    const db = mysql.db;

    let username = req.body.username;
    let password = req.body.password;
    
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