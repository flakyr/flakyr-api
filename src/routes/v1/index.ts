import { Router } from 'express';

import tests from './tests';
import projects from './projects';

const router = Router();

router.use('/tests', tests);
router.use('/projects', projects);

export default router;
