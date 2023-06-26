import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Spin } from '@arco-design/web-react'
import { canvas_id, canvas_outer } from '~/config/settings'
import { useKonvaStore } from '~/store/knovaStore'

const DrawingBoard: FC = () => {
  const [loading, setLoading] = useState(true)
  const changeLoading = (status: boolean) => {
    setLoading(status)
  }
  const initKonva = useKonvaStore(state => state.init)
  const [scale, size] = useKonvaStore(state => [state.scale, state.size])
  const [outSize, setOutSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    // 获取画布外面元素的宽高
    const $box = document.getElementById(canvas_outer)!
    setOutSize({
      width: $box.clientWidth,
      height: $box.clientHeight,
    })
  }, [])
  useEffect(() => {
    if (!loading)
      initKonva(outSize.width, outSize.height)
  }, [loading])
  const canvasBoxStyles = useMemo(() => {
    const left = (outSize.width - size.width) / 2
    const top = (outSize.height - size.height) / 2
    if (outSize.width || outSize.height)
      changeLoading(false)
    return {
      left,
      top,
      transformOrigin: 'center',
      transform: `scale(${scale}) `,
    }
  }, [outSize, scale])
  return (
    <div id={canvas_outer} className='flex-1 canvas_out relative overflow-hidden'>
      {
        loading
          ? (
          <Spin tip='This may take a while' loading={loading} style={{ display: 'block', height: '100%', marginTop: '400px' }} />
            )
          : (
          <div className='absolute canvas_box' style={canvasBoxStyles}>
            <div id={canvas_id} className=" bg-white" ></div>
          </div>
            )
      }
    </div>
  )
}
export { DrawingBoard }
