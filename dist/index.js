"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3333;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    courses: [
        { id: 1, title: "front" },
        { id: 2, title: "back" },
        { id: 3, title: "fullstack" },
        { id: 4, title: "devops" },
    ],
};
app.get("/courses", (req, res) => {
    let foundedCourses = db.courses;
    if (req.query.title) {
        foundedCourses = foundedCourses.filter((course) => course.title.indexOf(req.query.title) > -1);
    }
    res.json(foundedCourses);
});
app.get("/courses/:id", (req, res) => {
    const foundedCourse = db.courses.find((course) => course.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundedCourse);
});
app.post("/courses", (req, res) => {
    if (!req.body.title.trim())
        return res.sendStatus(400);
    const createdCourse = { id: +new Date(), title: req.body.title };
    db.courses.push(createdCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
});
app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((course) => course.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.put("/courses/:id", (req, res) => {
    if (!req.body.title.trim())
        return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    const foundedCourse = db.courses.find((course) => course.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundedCourse.title = req.body.title;
    res.json(foundedCourse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
const sendE = () => {
    fetch("http://localhost:3333/courses/1", {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
    fetch("http://localhost:3333/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "vue_develop" }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
};
