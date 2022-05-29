"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
const MyRoom_1 = require("./rooms/MyRoom");
exports.default = (0, arena_1.default)({
    getId: () => "Your Colyseus App",
    initializeGameServer: gameServer => {
        gameServer.define('my_room', MyRoom_1.MyRoom);
    },
    initializeExpress: app => {
        app.use("/colyseus", (0, monitor_1.monitor)());
    },
    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
