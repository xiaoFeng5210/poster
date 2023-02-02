import React, { useEffect } from 'react'
import Canvas from '~/lib/Canvas'
import { useCanvas2DStore } from '~/store/canvasStore'
import '~/styles/view.scss'

function View() {
  const [_canvas, setCanvas] = useCanvas2DStore(state => [state._canvas, state.setCanvas])
  useEffect(() => {
    const canvas = new Canvas((document.getElementById('lower_canvas') as HTMLCanvasElement), { width: 2180, height: 1060 })
    setCanvas(canvas)
  }, [])
  return (
    <div className='g_box'>
      <canvas id='lower_canvas'></canvas>
    </div>
  )
}
export default View
