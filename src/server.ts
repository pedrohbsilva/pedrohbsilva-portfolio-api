import express from 'express';
import 'reflect-metadata';
import BodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  return response.status(200).json({ message: 'teste' });
});

app.listen({ port: process.env.PORT || 3333 }, () =>
  console.log(`🚀 Server ready on port: ${process.env.PORT || 3333}!`),
);
