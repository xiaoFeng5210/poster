import Konva from 'konva'

export const createTransformer = (stage: Konva.Stage, layer: Konva.Layer): Konva.Transformer => {
  stage.findOne('Transformer').destroy()
  const tr = new Konva.Transformer()
  layer.add(tr)
  return tr
}

export const listenTransformerEvents = (stage: Konva.Stage, layer: Konva.Layer) => {
  stage.on('click tap', (e) => {
    if (e.target === stage) {
      stage.findOne('Transformer').destroy()
      layer.draw()
    }
    const tr = createTransformer(stage, layer)
    tr.attachTo(e.target)
    layer.draw()
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
