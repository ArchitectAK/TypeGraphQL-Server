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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("./redis");
const Register_1 = require("./resolvers/user/Register");
const Login_1 = require("./resolvers/user/Login");
const Me_1 = require("./resolvers/user/Me");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [Me_1.MeResolver, Register_1.RegisterResolver, Login_1.LoginResolver]
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema, context: ({ req }) => ({ req })
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    app.use(cors_1.default({
        credentials: true,
        origin: "http://localhost:3000"
    }));
    app.use(express_session_1.default({
        store: new RedisStore({
            client: redis_1.redis
        }),
        name: "cookie",
        secret: "aslkdfjoiq12312",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365
        }
    }));
    apolloServer.applyMiddleware({ app });
    app.listen(4001, () => {
        console.log("server started on http://localhost:4001/graphql");
    });
});
main();
//# sourceMappingURL=index.js.map