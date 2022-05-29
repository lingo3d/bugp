import Arena from "@colyseus/arena"
import { monitor } from "@colyseus/monitor"
import { MyRoom } from "./rooms/MyRoom"

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: gameServer => {
        gameServer.define('my_room', MyRoom)
    },

    initializeExpress: app => {
        app.use("/colyseus", monitor())
    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
})