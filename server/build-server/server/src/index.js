"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./utils/config"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
require("ts-node/register"); // ??????? <=== app suddenly needs this line to function dispite changing nothing
const server = http_1.default.createServer(app_1.default);
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server running on port ${config_1.default.PORT}`);
});
