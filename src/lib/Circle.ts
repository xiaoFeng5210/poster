import type { BaseClass } from './FabricObject'
import FabricObject from './FabricObject'

export interface Options extends BaseClass {
  cx: number
  cy: number
  r: number
  startAngle: number
  endAngle: number
  strokeStyle: string
  fillStyle: string
}
class Circle extends FabricObject {
  public type = 'circle'
  public cx = 0
  public cy = 0
  public r = 50
  public startAngle = 0
  public endAngle = 2 * Math.PI
  public strokeStyle = 'black'
  public fillStyle = '#A18CD1'

  constructor(options: Partial<Options>) {
    super(options)
    this._initCircle(options)
  }

  _initCircle(options: Partial<Options>) {
    Object.assign(this, options ?? {})
    this.width = this.r * 2
    this.height = this.r * 2
    this.cx = this.left
    this.cy = this.top
    console.log(this)
  }

  _render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.cx, this.cy, this.r, this.startAngle, this.endAngle)
    ctx.strokeStyle = this.strokeStyle
    ctx.fillStyle = this.fillStyle
    if (this.fill)
      ctx.fill()
    if (this.stroke)
      ctx.stroke()
    ctx.closePath()
  }
}

export default Circle
