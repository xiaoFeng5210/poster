import { RouterProvider } from "react-router-dom"
import './styles/App.css'
import routes from './config/route'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
