import type { FC } from 'react'
import '~/styles/asidebar.scss'
import { Trigger } from '@arco-design/web-react'
import { Elements } from '~/components'
import { ElementsGroup } from '~/services'

const AsideBar: FC = () => {
  const components = (key: ElementsGroup) => {
    if (key === ElementsGroup.element)
      return <Elements />
    else return <></>
  }
  const options = [{
    name: '元素',
    key: ElementsGroup.element,
    icon: 'i-ep-element-plus',
  }, {
    name: '图层',
    key: ElementsGroup.layer,
    icon: 'i-uil-layer-group',
  }]
  return (
    <ul className='h-100% w-60px'>
      {
        options.map((item, index) => {
          return (
            <Trigger key={index}
              trigger='click'
              position='rt'
              popup={() => (<div className="w-220px h-auto p-10px bg-white">{components(item.key)}</div>)}
              >
              <li className="hover:text-#4080FF hover:color-#4080FF">
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
