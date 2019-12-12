import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from "./resolvers/Register";

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [RegisterResolver]
    });

    const apolloServer = new ApolloServer({ schema });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4001, () => {
        console.log("server started on http://localhost:4001/graphql");
    });
};

main();
