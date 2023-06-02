import { create } from 'zustand'
import type Canvas from '../lib/Canvas'
import { ToolsEnum } from '../services'
import Rect from '~/lib/Rect'
import { createRect, randomPosition } from '~/services'

interface State {
  _canvas: Partial<Canvas>
  // 当前点击的点
  _clickPoint: { x: number; y: number }
}

interface Action {
  setCanvas: (canvas: Canvas) => void
  setCanvasItem: (item: Partial<Canvas>) => void
  setClickPoint: (x: number, y: number) => void
  addRect: () => void
  addObject: (type: ToolsEnum) => void
}

export const useCanvas2DStore = create<State & Action>((set, get) => ({
  _canvas: {},
  _clickPoint: { x: 0, y: 0 },

  setCanvas: (canvas: Canvas) => set(() => ({ _canvas: canvas })),
  setCanvasItem: (newVal: Partial<Canvas>) => set(state => ({ _canvas: { ...state._canvas, ...newVal } })),
  setClickPoint: (x: number, y: number) => set(() => ({ _clickPoint: { x, y } })),

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
        break
      default:
        break
    }
  },
}))
