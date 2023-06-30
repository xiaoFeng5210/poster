import { create } from 'zustand'
import Konva from 'konva'
import { v4 as uuidv4 } from 'uuid'
import { canvas_id as container } from '~/config/settings'
import { KonvaGraphType } from '~/services'
import { attacheTransformer, createTransformer, listenTransformerEvents } from '~/lib/konvaUse/transformer'

interface State {
  stage: Konva.Stage | null
  backLayer: Konva.Layer | null
  elementsLayer: Konva.Layer | null
  tranformer: Konva.Transformer | null
  scale: number
  // 整体尺寸
  size: {
    width: number
    height: number
  }
}
interface Action {
  init: (width: number, height: number) => void
  calculateScale: (outWidth: number, outHeight: number) => void
  addRect: () => void
}
export const useKonvaStore = create<State & Action>((set, get) => ({
  stage: null,
  backLayer: null,
  elementsLayer: null,
  tranformer: null,
  scale: 1,
  size: {
    width: 900,
    height: 1200,
  },

  init: (outWidth: number, outHeight: number) => {
    const { width, height } = get().size
    const stage = new Konva.Stage({
      container,
      width,
      height,
    })
    const backLayer = new Konva.Layer()
    const elementsLayer = new Konva.Layer()
    stage.add(backLayer)
    stage.add(elementsLayer)
    set(() => ({ stage, backLayer, elementsLayer, tranformer: createTransformer() }))
    get().elementsLayer!.add(get().tranformer!)
    get().calculateScale(outWidth, outHeight)
    // 加入onclick事件
    listenTransformerEvents(get().tranformer!, get().stage!)
  },
  addRect: () => {
    const rect = {
      x: 150,
      y: 40,
      width: 300,
      height: 300,
      fill: '#F57274',
      draggable: true,
      id: `${uuidv4()}=${KonvaGraphType.Rect}`,
    }
    get().elementsLayer!.add(new Konva.Rect(rect))
    // const tr = new Konva.Transformer()
    // get().elementsLayer!.add(tr)
    // tr.nodes([get().stage!.findOne(`#${rect.id}`)!])
    attacheTransformer(get().tranformer!, get().stage!, get().elementsLayer!, rect.id)
  },
  calculateScale: (outWidth: number, outHeight: number) => {
    const { width, height } = get().size
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
    set(() => ({ scale }))
  },
}))
