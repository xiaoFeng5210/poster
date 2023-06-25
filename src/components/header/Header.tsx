import type { FC } from 'react'
import '~/styles/header.scss'
import { Button } from '@arco-design/web-react'

const Header: FC = () => {
  return (
    <header className="w-100% h-45px p-x-10px inline-flex items-center ">
      <img src="/logo.svg" className='w-30px h-30px' alt="" />
      <span className='m-l-10px'>导入文件</span>
      <ul className='m-l-auto flex items-center'>
        <li><Button type='text' size='default'>清空</Button></li>
        <li>
          <Button type='text' size="default">保存</Button>
        </li>
      </ul>
    </header>
  )
}
export { Header }
