import Konva from 'konva'
import { createTransformer, listenTransformerEvents } from '../konvaUse/transformer'
import { canvas_id as container } from '~/config/settings'

class KonvaController {
  protected stage: Konva.Stage | null = null
  protected backLayer: Konva.Layer | null = null
  protected elementsLayer: Konva.Layer | null = null
  protected size: { width: number; height: number } = { width: 900, height: 1200 }
  protected tranformer: Konva.Transformer | null = createTransformer()
  protected scale = 1

  constructor(width: number, height: number) {
    this._init(width, height)
  }

  private _init(outWidth: number, outHeight: number) {
    const { width, height } = this.size
    this.stage = new Konva.Stage({
      container,
      width,
      height,
    })
    this.backLayer = new Konva.Layer()
    this.elementsLayer = new Konva.Layer()
    this.stage.add(this.backLayer)
    this.stage.add(this.elementsLayer)
    this.calculateScale(outWidth, outHeight)
    // 加入onclick事件
    listenTransformerEvents(this.tranformer!, this.stage!)
  }

  private calculateScale(outWidth: number, outHeight: number) {
    const { width, height } = this.size
    let scale = 1
    if (height > width) {
      if (outHeight > height)
        scale = 0.6
      else
        scale = outHeight / height * 0.8
    }
    else {
      if (outWidth > width)
        scale = 0.6
      else
        scale = outWidth / width * 0.8
    }
    this.scale = scale
  }
}

export default KonvaController
