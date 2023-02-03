import FabricObject, { BaseClass } from "./FabricObject";
import Util from "./Utils";

class Rect extends FabricObject {
  // 矩形标识
  public type: string = "rect";
  public rx: number = 0;
  public ry: number = 0;

  constructor(options: BaseClass) {
    super(options);

  }

}

export default Rect
