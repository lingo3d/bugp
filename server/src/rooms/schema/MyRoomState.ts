import { Schema, type, MapSchema } from "@colyseus/schema"

export class Player extends Schema {
  @type("number")
  public x = 0
  
  @type("number")
  public y = 9999

  @type("number")
  public z = 0

  @type("number")
  public rotationX = 0

  @type("number")
  public rotationY = 0

  @type("number")
  public rotationZ = 0

  @type("string")
  public animation = "idle"
}

export class MyRoomState extends Schema {
  @type({ map: Player })
  public players = new MapSchema<Player>()
}
