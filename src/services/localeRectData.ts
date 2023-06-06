import type { RectOptions } from '~/types'
import { ObjectArg } from '~/types'

export function createRect(data?: Partial<RectOptions>): RectOptions {
  return {
    type: 'rect',
    visible: true,
    active: false,
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    originX: 'left',
    originY: 'top',
    stateProperties: [],
    rx: 0,
    ry: 0,
    fill: true,
    stroke: false,
    strokeStyle: 'rgb(224, 62, 26)',
    fillStyle: '#008B8B',
    ...data,
  }
}
