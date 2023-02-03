import React, { useEffect } from 'react'
import Canvas from '~/lib/Canvas'
import { useCanvas2DStore } from '~/store/canvasStore'
import { createRect } from '~/services'
import '~/styles/view.scss'
import Rect from '~/lib/Rect'
import { Button } from '@arco-design/web-react'

function View() {
  const [_canvas, setCanvas] = useCanvas2DStore(state => [state._canvas, state.setCanvas])
  useEffect(() => {
    const canvas = new Canvas((document.getElementById('lower_canvas') as HTMLCanvasElement), { width: 2180, height: 1060 })
    setCanvas(canvas)
  }, []);

  useEffect(() => {
    if (_canvas) {
      console.log('canvas初始化好')
    }
  }, [_canvas])

  function testDraw() {
    if (_canvas) {
      const rect = createRect({ width: 500, height: 500 });
      // console.log(new Rect(rect))
      (_canvas as Canvas).add(new Rect(rect))
    }
  }
  return (
    <div className='g_box'>
      <canvas id='lower_canvas' />
      <Button className="position-absolute top-0 left-0" onClick={testDraw}>测试</Button>
    </div>
  )
}
export default View
