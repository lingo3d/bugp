import arena from "@colyseus/arena"
import { monitor } from "@colyseus/monitor"
import { MyRoom } from "./rooms/MyRoom.js"

export default arena.default({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        gameServer.define("MyRoom", MyRoom)
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req: any, res: any) => {
            res.send("It's time to kick ass and chew bubblegum!")
        })

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor())
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
})