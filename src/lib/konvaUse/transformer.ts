import Konva from 'konva'

export const createTransformer = (stage: Konva.Stage, layer: Konva.Layer): Konva.Transformer => {
  const tr = new Konva.Transformer()
  layer.add(tr)
  return tr
}

export const listenTransformerEvents = (stage: Konva.Stage, layer: Konva.Layer) => {
  const tr = createTransformer(stage, layer)
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

export const useAttachTransformer = (stage: Konva.Stage, layer: Konva.Layer) => {
  return (id: string) => {
    if (stage.findOne(`#${id}`)) {
      const tr = createTransformer(stage, layer)
      tr.attachTo(stage.findOne(`#${id}`))
    }
  }
}
