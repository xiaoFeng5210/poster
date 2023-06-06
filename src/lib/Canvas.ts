import type { ObjectArg } from '~/types'

interface Options {
  width: number
  height: number
}

class Canvas {
  /** 这里我们需要存储一个点击点的坐标 */
  static _clickPoint: { x: number; y: number } = { x: 0, y: 0 }

  public width!: number
  public height!: number
  /** 包围canvas的外层容器 */
  public wrapperEl!: HTMLElement
  /** 下层 canvas 画布，主要用于绘制所有物体 */
  public lowerCanvasEl!: HTMLCanvasElement
  /** 上层 canvas，主要用于监听鼠标事件、涂鸦模式、左键点击拖蓝框选区域 */
  public upperCanvasEl!: HTMLCanvasElement
  /** 缓冲层画布 */
  public cacheCanvasEl!: HTMLCanvasElement
  /** 上层画布环境 */
  public contextTop!: CanvasRenderingContext2D
  /** 下层画布环境 */
  public contextContainer!: CanvasRenderingContext2D
  /** 缓冲层画布环境 */
  public contextCache!: CanvasRenderingContext2D
  /** 整个画布到上面和左边的偏移量 */
  public _offset: { top: number; left: number } = { top: 0, left: 0 }
  /** 整个画布的缩放 TODO: */
  /** 画布中所有添加的物体实例 */
  public _objects: ObjectArg[] = []

  constructor(els: HTMLCanvasElement[], options: Options) {
    Object.assign(this, options)
    this._initLowerCanvas(els[0])
    this._initUpperCanvas(els[1])
    this.drawGrid(this.contextContainer)
  }

  protected _initLowerCanvas(el: HTMLCanvasElement) {
    this.lowerCanvasEl = el
    this.contextContainer = this.lowerCanvasEl.getContext('2d') as CanvasRenderingContext2D
    this.initCanvasSize(this.lowerCanvasEl)
  }

  protected _initUpperCanvas(el: HTMLCanvasElement) {
    this.upperCanvasEl = el
    this.contextTop = this.upperCanvasEl.getContext('2d') as CanvasRenderingContext2D
    this.initCanvasSize(this.upperCanvasEl)
  }

  private initCanvasSize(canvasEl: HTMLCanvasElement) {
    canvasEl.width = this.width
    canvasEl.height = this.height
    canvasEl.style.width = `${this.width}px`
    canvasEl.style.height = `${this.height}px`
  }

  public add(...args: ObjectArg[]): Canvas {
    this._objects.push(...args)
    this.renderAll()
    return this
  }

  public renderAll(): Canvas {
    const ctx = this.contextContainer // 下层画布环境
    this.reset(this.contextContainer)
    this._objects.forEach((obj) => {
      obj.render(ctx)
    })
    return this
  }

  // 绘制网格线
  drawGrid(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(0, 0, this.width, this.height)
    gradient.addColorStop(0, '#fff') // 渐变开始颜色为白色
    gradient.addColorStop(1, '#ccc') // 渐变结束颜色为灰色
    // 设置网格线颜色为渐变色
    ctx.strokeStyle = gradient
    // 设置网格线为虚线
    ctx.setLineDash([2, 2])
    for (let i = 0; i <= this.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, this.height)
      ctx.stroke()
    }
    for (let i = 0; i <= this.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(this.width, i)
      ctx.stroke()
    }
    // 设置网格线为实线
    ctx.setLineDash([])
  }

  animate() {

  }

  public clearContext(ctx: CanvasRenderingContext2D): Canvas {
    ctx.clearRect(0, 0, this.width, this.height)
    return this
  }

  public reset(ctx: CanvasRenderingContext2D): Canvas {
    this.clearContext(ctx)
    this.drawGrid(ctx)
    return this
  }
}

export default Canvas
