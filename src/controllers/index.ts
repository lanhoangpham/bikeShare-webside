import { json } from "body-parser";
import express, { Request, Response } from "express";
import { MySQLDb } from "../db/db";

export const controller = express.Router();

controller.get("/", (req: Request, res: Response) => {
    if (req.cookies.username !== "admin") {
        res.redirect("/login");
        return;
    }
    res.render("index");
})

controller.get("/login", (req: Request, res: Response) => {
    if (req.cookies.username === "admin") {
        res.redirect("/");
        return;
    }
      res.render("login", {validate: ""})
})

controller.get("/register", (req: Request, res: Response) => {
    res.render("register", {result: ""});
})

controller.get("/homepage", (req: Request, res: Response) => {
    res.render("homepage");
})

controller.get("/info", (req: Request, res: Response) => {
    const mysql = MySQLDb.getInstance();
    const db = mysql.db;

    db.query(`SELECT * FROM users`, function(err, results) {
        if (err) throw err;
        const user = results;
        res.render("info", { user })
    })
})

controller.get("/wallet", (req: Request, res: Response) => {
    res.render("wallet");
})

controller.get("/ticket", (req: Request, res: Response) => {
    res.render("ticket");
})

controller.get("/history", (req: Request, res: Response) => {
    const mysql = MySQLDb.getInstance();
    const db = mysql.db;

    db.query(`SELECT * FROM statusbike`, function(err, results) {
        if (err) throw err;
        const history = results;
        res.render("history", { history })
    })
})

controller.get("/instruction", (req: Request, res: Response) => {
    res.render("instruction");
})











// function formatData(data: any[]) {
//     const formattedData = data.map((i: any) => {
//         const birth = new Date(i.NgaySinh);
//         const NgayLapHD = new Date(i.NgayLapHD);
//         const date = new Date(i.NgayNop);
//         const NgayBD = new Date(i.NgayBD);
//         const NgayLP = new Date(i.NgayLP);

//         return {
//             ...i,
//             NgaySinh: birth.getFullYear()+'-' + (birth.getMonth()+1) + '-'+birth.getDate(),
//             NgayLapHD: NgayLapHD.getFullYear()+'-' + (NgayLapHD.getMonth()+1) + '-'+NgayLapHD.getDate(),
//             NgayNop: date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate(),
//             NgayBD: NgayBD.getFullYear()+'-' + (NgayBD.getMonth()+1) + '-'+NgayBD.getDate(),
//             NgayLP: NgayLP.getFullYear()+'-' + (NgayLP.getMonth()+1) + '-'+NgayLP.getDate(),
//         }
//     })
//     return formattedData
// }