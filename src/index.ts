import 'express-async-errors';

import express from 'express';

import errorHandler from './middlewares/errorHandler';
import movieRouter from './routes/movies';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/health", (_req, res) => {
    res.send("ok");
});

app.use("/api/movies", movieRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});