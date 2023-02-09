export enum ToolsEnum {
  Pencil = 'pencil',
  Crop = 'crop',
  Rect = 'rect',
  Circle = 'circle'
}

export const toolsOption = [
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

export type ToolItem = {
  type: ToolsEnum,
  icon: string,
  color: string,
  active: boolean,
  bgColor: string
}
