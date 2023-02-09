import Canvas from "~/lib/Canvas"

export const randomPosition = (_canvas: Partial<Canvas>): { top: number, left: number } => {
  return {
    top: Math.floor(Math.random() * (_canvas!.height! - 200)),
    left: Math.floor(Math.random() * (_canvas!.width! - 200)),
  }
}
