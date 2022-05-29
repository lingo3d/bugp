import { Room, Client } from "colyseus"
import { MyRoomState, Player } from "./schema/MyRoomState"

export class MyRoom extends Room<MyRoomState> {
  public onCreate(options: any) {
    this.setState(new MyRoomState())

    this.onMessage("updatePlayer", (client, data) => {
      const player = this.state.players.get(client.sessionId)
      if (!player) return
      
      Object.assign(player, data)
    })
  }

  public onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!")

    const player = new Player()
    this.state.players.set(client.sessionId, player)
  }

  public onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!")

    this.state.players.delete(client.sessionId)
  }

  public onDispose() {
    console.log("room", this.roomId, "disposing...")
  }
}
