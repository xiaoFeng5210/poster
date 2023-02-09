import 'styles/tools.scss'
import { useState } from 'react'
import { useCanvas2DStore } from '~/store/canvasStore'
import { ToolsEnum } from '~/services'

interface Props {
  addRect: () => void
}

type ToolItem = {
  type: ToolsEnum,
  icon: string,
  color: string,
  active: boolean,
  bgColor: string
}

const toolsOption = [
  {
    type: ToolsEnum.Pencil,
    icon: 'i-mdi:pencil-outline',
    color: 'color-black',
    active: false,
    bgColor: 'bg_tool_white'
  },
  {
    type: ToolsEnum.Rect,
    icon: 'i-mdi:crop-square',
    color: 'color-black',
    active: false,
    bgColor: 'bg_tool_white'
  }
]

export function Tools() {
  const addObject = useCanvas2DStore(state => state.addObject)
  const [toolsOptions, setToolsOptions] = useState<ToolItem[]>(toolsOption)
  const handleSelectTool = (tool: ToolsEnum) => {
    setToolsOptions(toolsOptions.map(item => {
      if (item.type === tool) {
        item.active = true;
        item.color = 'color-white';
        item.bgColor = 'bg_tool_blue';
        addObject(tool)
      } else {
        item.active = false;
        item.color = 'color-black';
        item.bgColor = 'bg_tool_white';
      }
      return item
    }))
  }
  return (
    <div className='tools_box'>
      {
        toolsOption.map((tool, index) => {
          return (
            <div key={index} className={['tool', tool.bgColor].join(' ')} onClick={() => handleSelectTool(tool.type)}>
              <span className={['tool_item', 'w-100%', 'h-100%', tool.color, tool.icon].join(' ')}></span>
            </div>
          )
        })
      }
    </div>
  )
}
