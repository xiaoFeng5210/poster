import '~/styles/view.scss'
import { Header, MainContent } from '~/components'

function View() {
  return (
    <div className='g_box' id="canvas_box">
      <Header />
      <MainContent />
    </div>
  )
}
export default View
