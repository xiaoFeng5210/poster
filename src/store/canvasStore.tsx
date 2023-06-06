import { create } from 'zustand'
import type Canvas from '../lib/Canvas'
import { ToolsEnum } from '../services'
import Rect from '~/lib/Rect'
import { createRect, randomPosition } from '~/services'
import Circle from '~/lib/Circle'

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
  addCircle: () => void
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
      const rect = { ...randomPosition(_canvas) };
      (_canvas as Canvas).add(new Rect(rect))
    }
  },

  addCircle: () => {
    const { _canvas } = get()
    if (_canvas) {
      const circle = { ...randomPosition(_canvas) };
      (_canvas as Canvas).add(new Circle(circle))
    }
  },

  addObject: (type: ToolsEnum) => {
    switch (type) {
      case ToolsEnum.Rect:
        get().addRect()
        break
      case ToolsEnum.Circle:
        get().addCircle()
        break
      default:
        break
    }
  },
}))
