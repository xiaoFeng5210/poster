import type { BaseClass } from './FabricObject'
import FabricObject from './FabricObject'

export interface Options extends BaseClass {
  rx: number
  ry: number
  strokeStyle: string
  fillStyle: string
}

class Rect extends FabricObject {
  // 矩形标识
  public type = 'rect'
  public rx = 0
  public ry = 0
  public strokeStyle = 'black'
  public fillStyle = 'rgb(224, 62, 26)'

  constructor(options: Options) {
    super(options)
    this._initRect(options)
  }

  /** 一些共有的和独有的属性 */
  _initStateProperties() {
    this.stateProperties = this.stateProperties.concat(['rx', 'ry'])
  }

  /** 初始化圆角值 */
  _initRect(options: Options) {
    Object.assign(this, options ?? {})
    this.strokeStyle = options.strokeStyle || 'black'
    this.fillStyle = options.fillStyle || 'black'
  }

  _render(ctx: CanvasRenderingContext2D) {
    const rx = this.rx || 0
    const ry = this.ry || 0
    const x = -this.width / 2
    const y = -this.height / 2
    const w = this.width
    const h = this.height
    ctx.strokeStyle = this.strokeStyle
    ctx.fillStyle = this.fillStyle
    ctx.moveTo(x + rx, y)
    ctx.lineTo(x + w - rx, y)
    ctx.bezierCurveTo(x + w, y, x + w, y + ry, x + w, y + ry)
    ctx.lineTo(x + w, y + h - ry)
    ctx.bezierCurveTo(x + w, y + h, x + w - rx, y + h, x + w - rx, y + h)
    ctx.lineTo(x + rx, y + h)
    ctx.bezierCurveTo(x, y + h, x, y + h - ry, x, y + h - ry)
    ctx.lineTo(x, y + ry)
    ctx.bezierCurveTo(x, y, x + rx, y, x + rx, y)
    ctx.closePath()
    if (this.fill)
      ctx.fill()
    if (this.stroke)
      ctx.stroke()
  }
}

export default Rect
