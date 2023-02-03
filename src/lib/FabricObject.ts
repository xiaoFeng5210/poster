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

export type BaseClassKey = keyof BaseClass

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

  constructor(options: BaseClass) {
    this.setOptions(options);
  }

  setOptions(options: BaseClass) {
    if (options) {
      let key: BaseClassKey
      for (key in options) {
        if (options.hasOwnProperty(key)) {
          switch (key) {
            case 'type':
              this.type = options.type
              break
            case 'visible':
              this.visible = options.visible
              break
            case 'active':
              this.active = options.active
              break;
            case 'top':
              this.top = options.top
              break
            case 'left':
              this.left = options.left
              break
            case 'width':
              this.width = options.width
              break
            case 'height':
              this.height = options.height
              break
            case 'scaleX':
              this.scaleX = options.scaleX
              break
            case 'scaleY':
              this.scaleY = options.scaleY
              break
            case 'angle':
              this.angle = options.angle
              break
            case 'originX':
              this.originX = options.originX
              break
            case 'originY':
              this.originY = options.originY
              break
            case 'stateProperties':
              this.stateProperties = options.stateProperties
              break
            default:
              break
          }
        }
      }
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

  _render(ctx: CanvasRenderingContext2D) {

  }


}

export default FabricObject
