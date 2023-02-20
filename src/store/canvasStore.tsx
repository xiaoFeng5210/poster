import { create } from 'zustand'
import Rect from '~/lib/Rect'
import { createRect, randomPosition } from '~/services'
import Canvas from '../lib/Canvas'
import { ToolsEnum } from '../services'

interface State {
  _canvas: Partial<Canvas>
}

interface Action {
  setCanvas: (canvas: Canvas) => void
  setCanvasItem: (item: Partial<Canvas>) => void
  addRect: () => void
  addObject: (type: ToolsEnum) => void
}

export const useCanvas2DStore = create<State & Action>((set, get) => ({
  _canvas: {},

  setCanvas: (canvas: Canvas) => set(() => ({ _canvas: canvas })),
  setCanvasItem: (newVal: Partial<Canvas>) => set(state => ({ _canvas: { ...state._canvas, ...newVal } })),

  addRect: () => {
    const { _canvas } = get()
    if (_canvas) {
      const rect = createRect({ ...randomPosition(_canvas), width: 150, height: 100 });
      (_canvas as Canvas).add(new Rect(rect))
    }
  },

  addObject: (type: ToolsEnum) => {
    switch (type) {
      case ToolsEnum.Rect:
        get().addRect()
        break;
      default:
        break;
    }
  }
}))
