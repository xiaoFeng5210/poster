import { ObjectArg } from '~/types'

interface Options {
  width: number;
  height: number;
}

class Canvas {
  public width!: number;
  public height!: number;
  /**包围canvas的外层容器 */
  public wrapperEl!: HTMLElement;
  /** 下层 canvas 画布，主要用于绘制所有物体 */
  public lowerCanvasEl!: HTMLCanvasElement;
  /** 上层 canvas，主要用于监听鼠标事件、涂鸦模式、左键点击拖蓝框选区域 */
  public upperCanvasEl!: HTMLCanvasElement;
  /** 缓冲层画布 */
  public cacheCanvasEl!: HTMLCanvasElement;
  /** 上层画布环境 */
  public contextTop!: CanvasRenderingContext2D;
  /** 下层画布环境 */
  public contextContainer!: CanvasRenderingContext2D;
  /** 缓冲层画布环境 */
  public contextCache!: CanvasRenderingContext2D;
  /** 整个画布到上面和左边的偏移量 */
  public _offset: { top: number; left: number } = { top: 0, left: 0 }
  /** 整个画布的缩放 TODO: */
  /** 画布中所有添加的物体实例 */
  private _objects: ObjectArg[] = [];


  constructor(el: HTMLCanvasElement, options: Options) {
    this.width = options.width;
    this.height = options.height;
    this._initLowerCanvas(el);
    // this.drawGrid()
  }

  protected _initLowerCanvas(el: HTMLCanvasElement) {
    this.lowerCanvasEl = el;
    this.contextContainer = this.lowerCanvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.lowerCanvasEl.width = this.width;
    this.lowerCanvasEl.height = this.height;
    this.lowerCanvasEl.style.width = this.width + 'px';
    this.lowerCanvasEl.style.height = this.height + 'px';
  }
  public add(...args: ObjectArg[]): Canvas {
    this._objects.push(...args);
    this.renderAll()
    return this
  }

  public renderAll(): Canvas {
    const ctx = this.contextContainer; // 下层画布环境
    this.clearContext(ctx);
    this._objects.forEach(obj => {
      obj.render(ctx)
    })
    return this
  }

  public drawGrid() {
    const ctx = this.contextContainer;
    ctx.strokeStyle = "#ccc";
    for (let i = 0; i <= this.width, i += 50;) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.height);
      ctx.stroke();
    }
    for (let i = 0; i <= this.height, i += 50;) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(this.width, i);
      ctx.stroke();
    }
  }

  public clearContext(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
    return this
  }
}

export default Canvas
