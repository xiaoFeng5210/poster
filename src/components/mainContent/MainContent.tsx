import { type FC } from 'react'

import { AsideBar, Attributes, DrawingBoard } from '~/components'

const MainContent: FC = () => {
  return (
    <main className="flex">
      <AsideBar />
      <DrawingBoard />
      <Attributes />
    </main>
  )
}
export { MainContent }
