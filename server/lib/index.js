"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arena_1 = require("@colyseus/arena");
const arena_config_1 = __importDefault(require("./arena.config"));
(0, arena_1.listen)(arena_config_1.default);
