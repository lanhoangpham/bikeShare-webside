import express, { Request, Response } from "express";
import { MySQLDb } from "../../db/db";
import { hashPassword } from "../../libs/hash";

type users = {
    username: string, 
    password: string
}

export const register = (req: Request<{},{}, users>, res: Response) => {
    //TODO
    const mysql = MySQLDb.getInstance();
    const db = mysql.db;

    let username = req.body.username;
    let password = req.body.password;
    let input = {username, password} 

    db.query(`SELECT username FROM users WHERE username = "${username}"`,function(err, results) {
        if (err) throw err;
        
        if (username === results) {
            res.render("register", {result: "Tài khoản đã được sử dụng!"})
            return;
        }
    });

    db.query('INSERT INTO users SET ?', input ,function(err, results) {
        if (err) throw err;
        res.render("login", {validate: "Đăng kí thành công!"})
    });
};