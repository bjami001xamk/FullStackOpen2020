import express from 'express';
import  calculateBmi  from './bmiCalculator';
import parseArguments from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if(!req.query.height || !req.query.weight) {
        res.status(404).send({ error: 'parameters missing'}).end();
    }

    const result: string = calculateBmi(Number(req.query.height), Number(req.query.weight));
    
    if(result === "malformatted parameters"){
        res.status(404).send({ error: result}).end();
    }

    res.send({
        weight: Number(req.query.height),
        height: Number(req.query.weight),
        bmi: result
    });
});

interface incomingObject {
    daily_exercises: number[],
    target: number,
}

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const incomingObject : incomingObject = req.body;
    
    /*if(!incomingObject.target || !incomingObject.daily_exercises) {
        res.status(404).send({error: "parameters missing"}).end();
    }*/

    const targetHours : number = incomingObject.target;
    const hoursArray : number[] = incomingObject.daily_exercises;
    const combinedNumbers = [ targetHours, ...hoursArray];
    res.send(parseArguments(combinedNumbers));
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});