import Util from '~/lib/Utils'

export interface BaseClass {
  type: string
  visible: boolean
  active: boolean
  top: number
  left: number
  width: number
  height: number
  scaleX: number
  scaleY: number
  angle: number
  originX: string
  originY: string
  stateProperties: string[]
  fill: boolean
  fillStyle: string
  stroke: boolean
}

class FabricObject {
  /** 物体类型标识 */
  public type = 'object'
  /** 是否可见 */
  public visible = true
  /** 是否处于激活态，也就是是否被选中 */
  public active = false
  /** 物体位置的 top 值，就是 y */
  public top = 0
  /** 物体位置的 left 值，就是 x */
  public left = 0
  /** 物体的原始宽度 */
  public width = 0
  /** 物体的原始高度 */
  public height = 0
  /** 物体当前的缩放倍数 x */
  public scaleX = 1
  /** 物体当前的缩放倍数 y */
  public scaleY = 1
  /** 物体当前的旋转角度 */
  public angle = 0
  /** 默认水平变换中心 left | right | center */
  public originX = 'left'
  /** 默认垂直变换中心 top | bottom | center */
  public originY = 'left'
  public fill = false
  public stroke = true
  public isMoving = false
  public borderColor = ''
  /** 列举常用的属性 */
  public stateProperties: string[] = ('top left width height scaleX scaleY ' + 'angle fill originX originY ' + 'stroke strokeWidth ' + 'borderWidth visible').split(' ')

  constructor(options: Partial<BaseClass>) {
    this.setOptions<Partial<BaseClass>>(options)
  }

  setOptions<T>(options: T) {
    if (options)
      Object.assign(this, options)
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.width === 0 || this.height === 0 || !this.visible)
      return
    ctx.save()
    this.transform(ctx)
    // 绘制物体
    this._render(ctx)
    // 监测物体是否处于激活态，如果是的话就绘制边框
    if (this.active)
      this.drawBorders(ctx)
    ctx.restore()
  }

  transform(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.left, this.top)
    ctx.rotate(Util.degressToRadians(this.angle))
    ctx.scale(this.scaleX, this.scaleY)
  }

  drawBorders(ctx: CanvasRenderingContext2D): FabricObject {
    const padding = 0
    const padding2 = padding * 2
    const strokeWidth = 1
    ctx.save()
    ctx.globalAlpha = this.isMoving ? 0.5 : 1 // 物体变换的时候使其透明度减半，提升用户体验
    ctx.strokeStyle = this.borderColor
    ctx.lineWidth = strokeWidth
    /** 画边框的时候需要把 transform 变换中的 scale 效果抵消，这样才能画出原始大小的线条 */
    ctx.scale(1 / this.scaleX, 1 / this.scaleY)
    const w = this.getWidth()
    const h = this.getHeight()
    // 这里直接用原生的 api strokeRect 画边框即可，当然要考虑到边宽和内间距的影响
    // 就是画一个规规矩矩的矩形
    ctx.strokeRect(
      -w / 2 - padding - strokeWidth / 2,
      -h / 2 - padding - strokeWidth / 2,
      w + padding2 + strokeWidth,
      h + padding2 + strokeWidth,
    )
    // TODO: 画边框的时候需要考虑到物体的旋转角度，这里暂时不考虑
    ctx.restore()
    return this
  }

  // TODO: drawControls(ctx: CanvasRenderingContext2D) {

  // }

  /** 获取当前大小，包含缩放效果 */
  getWidth(): number {
    return this.width * this.scaleX
  }

  /** 获取当前大小，包含缩放效果 */
  getHeight(): number {
    return this.height * this.scaleY
  }

  // 父类先写一个方法放在这里，子类可以重写
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _render(ctx: CanvasRenderingContext2D) {

  }
}

export default FabricObject
