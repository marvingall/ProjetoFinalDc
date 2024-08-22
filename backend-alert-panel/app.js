import express from 'express';
import logMiddleware from './middlewares/logMiddleware.js';
import rateLimitMiddleware from './middlewares/rateLimitMiddleware.js';

const app = express();

const PORT = 3001;

app.use(express.json());

app.use(logMiddleware);
app.use(rateLimitMiddleware)

app.use('/', (req, res) => {
    res.send('Hello, world!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;