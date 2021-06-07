import express from "express";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
import schema from "./schema";
import "reflect-metadata";

const app = express();

createConnection({
	name: "default",
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "",
	database: "graphql_project",
	entities: [__dirname + "/models/*.ts"],
	synchronize: true,
	logging: true,
})
	.then(() => {
		app.use(
			"/graphql",
			graphqlHTTP({
				schema,
				graphiql: true,
			})
		);

		app.listen(4000, async () => {
			console.log(
				`Running a GraphQL API server at http://localhost:4000/graphql`
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});
