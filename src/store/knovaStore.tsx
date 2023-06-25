import { create } from 'zustand'
import Konva from 'konva'
import { canvas_id as container } from '~/config/settings'

interface State {
  stage: Konva.Stage | null
  backLayer: Konva.Layer | null
  elementsLayer: Konva.Layer | null
}
interface Action {
  init: (width: number, height: number) => void
}
export const useKonvaStore = create<State & Action>((set, _get) => ({
  stage: null,
  backLayer: null,
  elementsLayer: null,

  init: (width: number, height: number) => {
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
  },
}))
