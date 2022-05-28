//@ts-ignore
import { Schema, MapSchema, type } from "@colyseus/schema"
import { PlayerSchema } from "./PlayerSchema.js"

export class RoomSchema extends Schema {
  @type({ map: PlayerSchema })
  public players = new MapSchema<PlayerSchema>()
}