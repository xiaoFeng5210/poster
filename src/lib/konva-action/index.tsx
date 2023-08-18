import Konva from 'konva'
import { createTransformer, listenTransformerEvents } from '../konvaUse/transformer'
import { useKonvaStore } from '~/store/knovaStore'
import { canvas_id as container } from '~/config/settings'

class KonvaAction {
  protected stage: Konva.Stage | null
  protected backLayer: Konva.Layer | null = null
  protected elementsLayer: Konva.Layer | null
  protected size: { width: number; height: number }
  protected tranformer: Konva.Transformer | null
  protected scale = 1

  constructor() {
    const [stage, layer, size] = useKonvaStore(state => [state.stage, state.elementsLayer, state.size])
    this.stage = stage
    this.elementsLayer = layer
    this.size = size
    this.tranformer = createTransformer()
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
    useKonvaStore.setState(() => ({ stage: this.stage, backLayer: this.backLayer, elementsLayer: this.elementsLayer, tranformer: this.tranformer }))
    useKonvaStore.getState().calculateScale(outWidth, outHeight)
    // 加入onclick事件
    listenTransformerEvents(this.tranformer!, this.stage!)
  }
}

export default KonvaAction
