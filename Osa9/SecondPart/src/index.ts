import express from 'express';
const app = express();
import cors  from 'cors';
import diaryRouter from './routes/diaries';

app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('somoene pinged here');
    res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});