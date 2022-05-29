import { Client } from "colyseus.js"
import { types, createProxy, loop } from "lingo3d-vue"
import { reactive, Ref, watchEffect } from "vue"

export default (dummyRef: Ref<types.Dummy | undefined>) => {
    const client = new Client("ws://localhost:2567")
    const dummyProxies = reactive<Record<string, types.Dummy>>({})
    
    watchEffect(async cleanup => {
        const dummy = dummyRef.value
        if (!dummy) return

        const room = await client.joinOrCreate<any>("my_room")

        room.state.players.onAdd = (player: any, sessionId: string) => {
            console.log("player joined", sessionId)
            
            const isMe = room.sessionId === sessionId
            if (isMe) {
                console.log("I am", sessionId)
                return
            }

            const dummyProxy = dummyProxies[sessionId] = createProxy<types.Dummy>()

            player.onChange = () => {
                Object.assign(dummyProxy, player)
            }
        }

        room.state.players.onRemove = (_: any, sessionId: string) => {
            console.log("player left", sessionId)

            delete dummyProxies[sessionId]
        }

        const handle = loop(() => {
            const { x, y, z, rotationX, rotationY, rotationZ, animation } = dummy
            room.send("updatePlayer", { x, y, z, rotationX, rotationY, rotationZ, animation })
        })

        cleanup(() => {
            handle.cancel()
            room.leave()
        })
    })

    return dummyProxies
}