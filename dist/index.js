"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
var api = (0, express_1.default)();
api.listen(process.env.PORT || 3000, function () { return console.log("hello it's working on this port = " + process.env.PORT); });
api.use(express_1.default.json());
api.use((0, cookie_parser_1.default)());
