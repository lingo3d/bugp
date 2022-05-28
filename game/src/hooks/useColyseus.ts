import { Client } from "colyseus.js"
import { types } from "lingo3d-vue"
import { onMounted, reactive } from "vue"

type Player = {
    sessionId: string
    dummy: types.Dummy | undefined
}

export default () => {
    const client = new Client("ws://localhost:2567")
    const players = reactive<Record<string, Player>>({})
    
    onMounted(async () => {
        const room = await client.joinOrCreate<any>("MyRoom")

        room.state.players.onAdd = (_: any, sessionId: string) => {
            console.log("player joined", sessionId)
            
            const isMe = room.sessionId === sessionId
            if (isMe) {
                console.log("I am", sessionId)
                return
            }
            else players[sessionId] = { sessionId, dummy: undefined }
        }

        room.state.players.onRemove = (_: any, sessionId: string) => {
            console.log("player left", sessionId)

            delete players[sessionId]
        }
    })

    return players
}