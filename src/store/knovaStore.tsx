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
    // TEST
    const rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 100,
      fill: 'red',
    })
    get().elementsLayer?.add(rect)
  },
  calculateScale: (outWidth: number, outHeight: number) => {
    const { width, height } = get().size
    let scale = 1
    if (height > width) {
      if (outHeight > height)
        scale = 0.8
      else
        scale = outHeight / height
    }
    else {
      if (outWidth > width)
        scale = 0.8
      else
        scale = outWidth / width
    }
    console.log(scale)
    set(() => ({ scale }))
  },
}))
