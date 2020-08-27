import express, { Response, Request } from 'express';

import TestService from 'services/test';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const createdTest = await TestService.createTest(data);

        res.status(201).json(createdTest);
    } catch (e) {
        res.status(400).send('Error');
        console.error(e);
    }
});

export default router;
