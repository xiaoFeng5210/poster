import type Canvas from '~/lib/Canvas'

export const randomPosition = (_canvas: Partial<Canvas>): { top: number; left: number } => {
  const offsetArr = [
    [0, 0],
    [-200, 0],
    [0, -200],
    [-200, -200],
    [200, 0],
    [0, 200],
    [200, 200],
  ]
  let offsetLeft = 0
  let offsetTop = 0
  const el = document.getElementById('canvas_box')
  const left = ((el?.getBoundingClientRect()?.width) ?? 0) / 2 - _canvas!._offset!.left
  const top = ((el?.getBoundingClientRect()?.height) ?? 0) / 2 - _canvas!._offset!.top
  const randomIndex = Math.floor(Math.random() * offsetArr.length)
  offsetLeft = left - (offsetArr[randomIndex][0] + (Math.random() < 0.5 ? -100 : 100) * Math.random())
  offsetTop = top - (offsetArr[randomIndex][1] + (Math.random() < 0.5 ? -100 : 100) * Math.random())

  return {
    left: Math.floor(offsetLeft),
    top: Math.floor(offsetTop),
  }
}
