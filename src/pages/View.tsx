import { useEffect } from 'react'
import { useKonvaStore } from '~/store/knovaStore'
import '~/styles/view.scss'
import { AsideBar, Attributes, Header } from '~/components'
import { canvas_id } from '~/config/settings'
// import Utils from '~/lib/Utils'

function View() {
  const initKonva = useKonvaStore(state => state.init)
  useEffect(() => {
    // 获取画布的宽高
    const { width, height } = document.querySelector(canvas_id)!.getBoundingClientRect()
    initKonva(width, height)
  }, [])
  return (
    <div className='g_box' id="canvas_box">
      <Header />
      <main className="flex">
        <AsideBar />
        <div id={canvas_id} className='flex-1 canvas_box' />
        <Attributes />
      </main>
    </div>
  )
}
export default View
