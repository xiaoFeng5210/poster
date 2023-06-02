import { useEffect } from 'react'
import Canvas from '~/lib/Canvas'
import { useCanvas2DStore } from '~/store/canvasStore'
import '~/styles/view.scss'
import { Tools } from '~/components'
// import Utils from '~/lib/Utils'

function View() {
  const [_canvas, setCanvas] = useCanvas2DStore(state => [state._canvas, state.setCanvas])
  useEffect(() => {
    const els = [
      document.getElementById('lower_canvas'),
      document.getElementById('upper_canvas'),
    ]
    const canvas = new Canvas((els as HTMLCanvasElement[]), { width: 2180, height: 1060 })
    setCanvas(canvas)
  }, [])

  const listenClickCanvas = (e: unknown) => {
    const x = (e as MouseEvent).clientX
    const y = (e as MouseEvent).clientY
    if (_canvas) {
      Canvas._clickPoint = { x, y };
      (_canvas as Canvas).renderAll()
    }
  }
  return (
    <div className='g_box' id="canvas_box">
      <canvas id='lower_canvas' />
      <canvas id='upper_canvas' onClick={event => listenClickCanvas(event)} />
      {/* <Button className="position-absolute top-0 left-0" onClick={testDraw}>测试</Button> */}
      <Tools />
    </div>
  )
}
export default View
