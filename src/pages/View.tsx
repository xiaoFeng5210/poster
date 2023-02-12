import React, { useEffect } from 'react'
import Canvas from '~/lib/Canvas'
import { useCanvas2DStore } from '~/store/canvasStore'
import { createRect, randomPosition } from '~/services'
import '~/styles/view.scss'
import Rect from '~/lib/Rect'
import { Button } from '@arco-design/web-react'
import { Tools } from '~/components'

function View() {
  const [_canvas, setCanvas] = useCanvas2DStore(state => [state._canvas, state.setCanvas])
  useEffect(() => {
    const canvas = new Canvas((document.getElementById('lower_canvas') as HTMLCanvasElement), { width: 2180, height: 1060 })
    setCanvas(canvas)
  }, []);

  return (
    <div className='g_box' id="canvas_box">
      <canvas id='lower_canvas' />
      {/* <Button className="position-absolute top-0 left-0" onClick={testDraw}>测试</Button> */}
      <Tools />
    </div>
  )
}
export default View
