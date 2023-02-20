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
  stroke: boolean
}

class FabricObject {
  /** 物体类型标识 */
  public type: string = 'object';
  /** 是否可见 */
  public visible: boolean = true;
  /** 是否处于激活态，也就是是否被选中 */
  public active: boolean = false;
  /** 物体位置的 top 值，就是 y */
  public top: number = 0;
  /** 物体位置的 left 值，就是 x */
  public left: number = 0;
  /** 物体的原始宽度 */
  public width: number = 0;
  /** 物体的原始高度 */
  public height: number = 0;
  /** 物体当前的缩放倍数 x */
  public scaleX: number = 1;
  /** 物体当前的缩放倍数 y */
  public scaleY: number = 1;
  /** 物体当前的旋转角度 */
  public angle: number = 0;
  /** 默认水平变换中心 left | right | center */
  public originX: string = 'left';
  /** 默认垂直变换中心 top | bottom | center */
  public originY: string = 'left';
  public fill: boolean = false;
  public stroke: boolean = true;
  /** 列举常用的属性 */
  public stateProperties: string[] = ('top left width height scaleX scaleY ' + 'angle fill originX originY ' + 'stroke strokeWidth ' + 'borderWidth visible').split(' ');

  constructor(options: Partial<BaseClass>) {
    this.setOptions<Partial<BaseClass>>(options);
  }

  setOptions<T>(options: T) {
    if (options) {
      Object.assign(this, options)
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.width === 0 || this.height === 0 || !this.visible) return
    ctx.save()
    this.transform(ctx)
    // 绘制物体
    this._render(ctx)
    ctx.restore()
  }

  transform(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.left, this.top)
    ctx.rotate(Util.degressToRadians(this.angle))
    ctx.scale(this.scaleX, this.scaleY)
  }
  // 父类先写一个方法放在这里，子类可以重写
  _render(ctx: CanvasRenderingContext2D) {

  }
}

export default FabricObject
