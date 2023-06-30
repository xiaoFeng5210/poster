import Konva from 'konva'

export const createTransformer = (stage: Konva.Stage, layer: Konva.Layer): Konva.Transformer => {
  stage.findOne('Transformer').destroy()
  const tr = new Konva.Transformer()
  layer.add(tr)
  return tr
}
