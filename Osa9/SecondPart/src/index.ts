import express from 'express';
const app = express();
import cors  from 'cors';
import diaryRouter from './routes/diaries';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('somoene pinged here');
    res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});