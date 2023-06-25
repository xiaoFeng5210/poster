import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { AsideBar, Attributes } from '~/components'
import { canvas_id, canvas_outer } from '~/config/settings'
import { useKonvaStore } from '~/store/knovaStore'

const MainContent: FC = () => {
  const initKonva = useKonvaStore(state => state.init)
  const [scale, size] = useKonvaStore(state => [state.scale, state.size])
  const [outSize, setOutSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    // 获取画布外面元素的宽高
    const $box = document.getElementById(canvas_outer)!
    initKonva($box.clientWidth, $box.clientHeight)
    setOutSize({
      width: $box.clientWidth,
      height: $box.clientHeight,
    })
  }, [])
  const canvasBoxStyles = useMemo(() => {
    const left = (outSize.width - size.width) / 2
    const top = (outSize.height - size.height) / 2
    console.log(left, top)
    return {
      left,
      top,
      transformOrigin: 'center',
      transform: `scale(${scale}) `,
    }
  }, [outSize])
  return (
    <main className="flex">
      <AsideBar />
      <div id={canvas_outer} className='flex-1 canvas_out relative overflow-hidden'>
        <div className='absolute canvas_box' style={canvasBoxStyles}>
          <div id={canvas_id} className=" bg-white" ></div>
        </div>
      </div>
      <Attributes />
    </main>
  )
}
export { MainContent }
