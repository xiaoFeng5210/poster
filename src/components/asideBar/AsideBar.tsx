import type { FC } from 'react'
import '~/styles/asidebar.scss'
import { Trigger } from '@arco-design/web-react'

const AsideBar: FC = () => {
  const options = [{
    name: '元素',
    key: 'element',
    icon: 'i-ep-element-plus',
  }, {
    name: '图层',
    key: 'layer',
    icon: 'i-uil-layer-group',
  }]
  return (
    <ul className='h-100% w-60px'>
      {
        options.map((item, index) => {
          return (
            <Trigger showArrow
              trigger='click'
              position='rt'
              popup={() => (<div className="w-100px h-100px bg-white">1233333</div>)}
              >
              <li key={index} className="hover:text-#4080FF hover:color-#4080FF">
                <i className={`${item.icon} text-30px p-y-5px`}></i>
                <span>{item.name}</span>
              </li>
            </Trigger>
          )
        })
      }
    </ul>
  )
}
export { AsideBar }
