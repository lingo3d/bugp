//@ts-ignore
import { Schema, type } from "@colyseus/schema"

export class PlayerSchema extends Schema {
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