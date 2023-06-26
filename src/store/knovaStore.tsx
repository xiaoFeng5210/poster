import { create } from 'zustand'
import Konva from 'konva'
import { canvas_id as container } from '~/config/settings'

interface State {
  stage: Konva.Stage | null
  backLayer: Konva.Layer | null
  elementsLayer: Konva.Layer | null
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
}
export const useKonvaStore = create<State & Action>((set, get) => ({
  stage: null,
  backLayer: null,
  elementsLayer: null,
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
    set(() => ({ stage, backLayer, elementsLayer }))
    get().calculateScale(outWidth, outHeight)
  },
  calculateScale: (outWidth: number, outHeight: number) => {
    const { width, height } = get().size
    let scale = 1
    if (height > width) {
      if (outHeight > height)
        scale = 0.7
      else
        scale = outHeight / height * 0.8
    }
    else {
      if (outWidth > width)
        scale = 0.7
      else
        scale = outWidth / width * 0.8
    }
    set(() => ({ scale }))
  },
}))
