import { Room, Client } from "colyseus"
import { RoomSchema } from "./schema/RoomSchema.js"
import { PlayerSchema } from "./schema/PlayerSchema.js"

export class MyRoom extends Room<RoomSchema> {
  public onCreate(options: any) {
    this.setState(new RoomSchema())
  }

  public onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!")

    const player = new PlayerSchema()
    this.state.players.set(client.sessionId, player)
    this.broadcast("join", client.sessionId)
  }

  public onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!")

    this.state.players.delete(client.sessionId)
  }

  public onDispose() {
    console.log("room", this.roomId, "disposing...")
  }
}
