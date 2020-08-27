import app from 'app';

import { port } from 'config';

app.listen(port, () => {
    console.info(`server running on port : ${port}`);
});
