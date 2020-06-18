import express from 'express';
import { DiagnoseType } from '../types';
import diagnoseJson from '../../data/diagnoses';
const router = express.Router();

const diagnoseData: DiagnoseType[] = diagnoseJson;

router.get('/', (_req, res) => {
    res.send(diagnoseData);
});

export default router;