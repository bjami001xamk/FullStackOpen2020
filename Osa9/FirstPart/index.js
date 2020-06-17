"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = __importDefault(require("./bmiCalculator"));
var exerciseCalculator_1 = __importDefault(require("./exerciseCalculator"));
var app = express_1["default"]();
app.use(express_1["default"].json());
app.get('/ping', function (_req, res) {
    res.send('pong');
});
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.get('/bmi', function (req, res) {
    if (!req.query.height || !req.query.weight) {
        res.status(404).send({ error: 'parameters missing' }).end();
    }
    var result = bmiCalculator_1["default"](Number(req.query.height), Number(req.query.weight));
    if (result === "malformatted parameters") {
        res.status(404).send({ error: result }).end();
    }
    res.send({
        weight: Number(req.query.height),
        height: Number(req.query.weight),
        bmi: result
    });
});
app.post('/exercises', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var incomingObject = req.body;
    /*if(!incomingObject.target || !incomingObject.daily_exercises) {
        res.status(404).send({error: "parameters missing"}).end();
    }*/
    var targetHours = incomingObject.target;
    var hoursArray = incomingObject.daily_exercises;
    var combinedNumbers = __spreadArrays([targetHours], hoursArray);
    res.send(exerciseCalculator_1["default"](combinedNumbers));
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
