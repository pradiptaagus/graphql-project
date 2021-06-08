import express from "express";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
import schema from "./schema";
import "reflect-metadata";
import cors from "cors";
import * as bodyParser from "body-parser-graphql";

const app = express();

createConnection()
	.then(() => {
		app.use(bodyParser.graphql());
		app.use(cors());

		app.use(
			"/graphql",
			graphqlHTTP({
				schema,
				graphiql: true,
			})
		);

		app.listen(4000, async () => {
			console.log(
				`Running a GraphQL API server at http://localhost:4000`
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});
