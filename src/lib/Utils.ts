const PiBy180 = Math.PI / 180 // 写在这里相当于缓存，因为会频繁调用

interface Point {
  x: number
  y: number
}
class Util {
  /** 单纯的创建一个新的 canvas 元素 */
  static createCanvasElement() {
    const canvas = document.createElement('canvas')
    return canvas
  }

  /** 角度转弧度，注意 canvas 中用的都是弧度，但是角度对我们来说比较直观 */
  static degressToRadians(degrees: number): number {
    return degrees * PiBy180
  }

  /** 弧度转角度，注意 canvas 中用的都是弧度，但是角度对我们来说比较直观 */
  static radiansToDegrees(radians: number): number {
    return radians / PiBy180
  }

  /** 从数组中溢出某个元素 */
  static removeFromArray(array: any[], value: any) {
    const idx = array.indexOf(value)
    if (idx !== -1)
      array.splice(idx, 1)

    return array
  }

  static clone(obj: any) {
    if (!obj || typeof obj !== 'object')
      return obj
    const temp = new obj.constructor()
    for (const key in obj) {
      if (!obj[key] || typeof obj[key] !== 'object')
        temp[key] = obj[key]

      else
        temp[key] = Util.clone(obj[key])
    }
    return temp
  }

  static loadImage(url: string, options: any = {}) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      const done = () => {
        img.onload = img.onerror = null
        resolve(img)
      }
      if (url) {
        img.onload = done
        img.onerror = () => {
          reject(new Error(`Error loading ${img.src}`))
        }
        options && options.crossOrigin && (img.crossOrigin = options.crossOrigin)
        img.src = url
      }
      else {
        done()
      }
    })
  }

  static min(points: number[]): number {
    return Math.min(...points)
  }

  static max(points: number[]): number {
    return Math.max(...points)
  }

  // 包围盒的宽高
  static makeBoundingBoxFromPoints(points: Point[]) {
    const xPoints = points.map(point => point.x)
    const yPoints = points.map(point => point.y)
    const minX = Util.min(xPoints)
    const maxX = Util.max(xPoints)
    const minY = Util.min(yPoints)
    const maxY = Util.max(yPoints)
    const width = Math.abs(maxX - minX)
    const height = Math.abs(maxY - minY)
    return {
      left: minX,
      top: minY,
      width,
      height,
    }
  }
}

export default Util
