import Konva from 'konva'

export const createTransformer = (): Konva.Transformer => {
  const tr = new Konva.Transformer()
  tr.setZIndex(9999)
  return new Konva.Transformer()
}

export const listenTransformerEvents = (tr: Konva.Transformer, stage: Konva.Stage) => {
  stage.on('click tap', (e) => {
    if (e.target === stage) {
      tr.nodes([])
      return
    }
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
    const isSelected = tr.nodes().includes(e.target)
    if (!metaPressed && !isSelected)
      tr.nodes([e.target])
  })
}

export const attacheTransformer = (tr: Konva.Transformer, stage: Konva.Stage, layer: Konva.Layer, id: string) => {
  if (tr)
    tr.nodes([stage.findOne(`#${id}`)])
}
