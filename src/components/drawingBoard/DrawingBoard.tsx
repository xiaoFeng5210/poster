import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Spin } from '@arco-design/web-react'
import { canvas_id, canvas_outer } from '~/config/settings'
import { useKonvaStore } from '~/store/knovaStore'

interface BoxStyles {
  left: number
  top: number
  transformOrigin: string
  transform: string
}
const DrawingBoard: FC = () => {
  const [loading, setLoading] = useState(true)
  const initKonva = useKonvaStore(state => state.init)
  const [scale, size] = useKonvaStore(state => [state.scale, state.size])
  const [canvasBoxStyles, setCanvasBoxStyles] = useState<BoxStyles | {}>({})

  const setOutBoxSize = ($box: HTMLElement) => {
    if ($box.clientWidth && $box.clientHeight) {
      const outWidth = $box.clientWidth
      const outHeight = $box.clientHeight
      const left = (outWidth - size.width) / 2
      const top = (outHeight - size.height) / 2
      setCanvasBoxStyles({
        left,
        top,
        transformOrigin: 'center',
        transform: `scale(${scale}) `,
      })
      setLoading(false)
    }
  }
  const initDashboard = () => {
    // 获取画布外面元素的宽高
    const $box = document.getElementById(canvas_outer)!
    initKonva($box.clientWidth, $box.clientHeight)
  }
  const showStyles = useMemo(() => {
    return loading ? { display: 'none' } : { display: 'block' }
  }, [loading])
  useEffect(() => {
    const $box = document.getElementById(canvas_outer)
    if ($box)
      setOutBoxSize($box)
  }, [scale])
  useEffect(() => {
    initDashboard()
  }, [])
  return (
    <div id={canvas_outer} className='flex-1 canvas_out relative overflow-hidden'>
      <Spin tip='This may take a while' loading={loading} style={{ width: '100%', height: '100%', marginTop: '400px' }} />
      <div className='absolute canvas_box' style={{ ...canvasBoxStyles, ...showStyles }}>
        <div id={canvas_id} className=" bg-white" ></div>
      </div>
    </div>
  )
}
export { DrawingBoard }
