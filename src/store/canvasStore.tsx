import { create } from 'zustand'
import Canvas from '../lib/Canvas'

interface State {
  _canvas: Partial<Canvas>
}

interface Action {
  setCanvas: (canvas: Canvas) => void
  setCanvasItem: (item: Partial<Canvas>) => void
}

export const useCanvas2DStore = create<State & Action>((set, get) => ({
  _canvas: {},

  setCanvas: (canvas: Canvas) => set(() => ({ _canvas: canvas })),
  setCanvasItem: (newVal: Partial<Canvas>) => set(state => ({ _canvas: { ...state._canvas, ...newVal } }))
}))
