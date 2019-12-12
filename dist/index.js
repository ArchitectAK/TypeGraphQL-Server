"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const Express = require("express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Register_1 = require("./resolvers/Register");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [Register_1.RegisterResolver]
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
    const app = Express();
    apolloServer.applyMiddleware({ app });
    app.listen(4001, () => {
        console.log("server started on http://localhost:4001/graphql");
    });
});
main();
//# sourceMappingURL=index.js.map