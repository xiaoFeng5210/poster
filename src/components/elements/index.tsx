import type { FC } from 'react'
import { Divider } from '@arco-design/web-react'
import { KonvaGraphType } from '~/services'
import './index.scss'

const Elements: FC = () => {
  const commonElements = [
    {
      name: '矩形',
      icon: 'i-material-symbols-rectangle-outline',
      type: KonvaGraphType.Rect,
    },
  ]
  return (
    <div className='w-full h-auto'>
      <div className='w-full'>
        <Divider orientation='left'>基础元素</Divider>
      </div>
      <div className="common_elements w-full h-fit">
        {
          commonElements.map((item, index) => {
            return (
              <div key={index} className="common_elements_item w-31px h-36px bg-#f6f6f6 hover:color-#4080FF cursor-pointer">
                <i className={`${item.icon} text-28px vertical-middle hover:color-#4080FF`}></i>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export { Elements }
