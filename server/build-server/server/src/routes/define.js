"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dictionary_1 = __importDefault(require("../services/dictionary"));
const defineRouter = express_1.default.Router();
defineRouter.get("/:word", async (request, response) => {
    const result = await dictionary_1.default.define(request.params.word);
    if (result.error) {
        response.status(404).json({ error: result.error });
    }
    response.json(result);
});
exports.default = defineRouter;
