import { Router, Request, Response } from 'express';

import TestService from 'services/test';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await TestService.getProjects();

        res.status(200).json(projects);
    } catch (e) {
        res.status(400).send('Error');
        console.error(e);
    }
});

export default router;
