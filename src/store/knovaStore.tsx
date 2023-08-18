import { create } from 'zustand'
import Konva from 'konva'
import { v4 as uuidv4 } from 'uuid'
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
  initTransformer: () => void
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

  },
  initTransformer: () => {
    if (get().elementsLayer?.findOne('.Transformer')) {
      get().elementsLayer?.findOne('.Transformer')?.destroy()
      get().elementsLayer?.batchDraw()
    }
    else {
      get().elementsLayer!.add(get().tranformer!)
    }
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
    attacheTransformer(get().tranformer!, get().stage!, get().elementsLayer!, rect.id)
    get().initTransformer()
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
