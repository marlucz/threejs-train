import {
  ExtrudeBufferGeometry,
  CylinderBufferGeometry,
  Path,
  Shape,
  BoxBufferGeometry,
  RingBufferGeometry,
  IcosahedronBufferGeometry,
} from "three";

function createGeometries() {
  /**
   * CABIN
   */
  const cabinSizes = {
    width: 1.5,
    length: 2,
    height: 2,
  };
  const cabinExtrudeSettings = {
    depth: 0.1,
    bevelEnabled: false,
  };
  const cabinSideShapeRight = new Shape()
    .moveTo(0, 0)
    .lineTo(cabinSizes.length, 0)
    .lineTo(cabinSizes.length, 0.75)
    .lineTo(cabinSizes.length - 0.5, 0.75 + 0.5)
    .lineTo(cabinSizes.length - 0.5, cabinSizes.height)
    .lineTo(0, cabinSizes.height)
    .lineTo(0, 0);
  const cabinSideShapeLeft = new Shape()
    .moveTo(0, 0)
    .lineTo(cabinSizes.length, 0)
    .lineTo(cabinSizes.length + 0.5, 0)
    .lineTo(cabinSizes.length + 0.5, 0.75)
    .lineTo(cabinSizes.length, 0.75)
    .lineTo(cabinSizes.length - 0.5, 0.75 + 0.5)
    .lineTo(cabinSizes.length - 0.5, cabinSizes.height)
    .lineTo(0, cabinSizes.height)
    .lineTo(0, 0);
  const sideWindowHole = new Path()
    .moveTo(0.1, cabinSizes.height - 0.1 - 0.7)
    .lineTo(0.1 + cabinSizes.length - 0.7, cabinSizes.height - 0.1 - 0.7)
    .lineTo(0.1 + cabinSizes.length - 0.7, cabinSizes.height - 0.1)
    .lineTo(0.1, cabinSizes.height - 0.1)
    .lineTo(0.1, cabinSizes.height - 0.1 - 0.5);
  cabinSideShapeRight.holes.push(sideWindowHole);
  cabinSideShapeLeft.holes.push(sideWindowHole);
  const cabinSideRight = new ExtrudeBufferGeometry(
    cabinSideShapeRight,
    cabinExtrudeSettings
  );
  const cabinSideLeft = new ExtrudeBufferGeometry(
    cabinSideShapeLeft,
    cabinExtrudeSettings
  );
  const cabinRoof = new BoxBufferGeometry(2.5, 0.1, 1.7);
  const cabinFloor = new BoxBufferGeometry(5.5, 0.15, 1.7);

  const cabinFrontShape = new Shape()
    .moveTo(0, 0)
    .lineTo(cabinSizes.width, 0)
    .lineTo(cabinSizes.width, cabinSizes.height)
    .lineTo(0, cabinSizes.height)
    .lineTo(0, 0);
  const frontWindowHole = new Path()
    .moveTo(0.1, cabinSizes.height - 0.1 - 0.5)
    .lineTo(0.1 + cabinSizes.width - 0.2, cabinSizes.height - 0.1 - 0.5)
    .lineTo(0.1 + cabinSizes.width - 0.2, cabinSizes.height - 0.1)
    .lineTo(0.1, cabinSizes.height - 0.1)
    .lineTo(0.1, cabinSizes.height - 0.1 - 0.5);
  cabinFrontShape.holes.push(frontWindowHole);
  const cabinFront = new ExtrudeBufferGeometry(
    cabinFrontShape,
    cabinExtrudeSettings
  );
  const cabinBack = new BoxBufferGeometry(0.1, 0.75, cabinSizes.width);
  // const cabinUnder
  /**
   * TRUNK
   */

  const trunkSide = new BoxBufferGeometry(2.5, 1, 0.1);
  const trunkBack = new BoxBufferGeometry(0.1, 1, 1.5);
  const trunkFloor = new BoxBufferGeometry(2.5, 0.1, 1.5);

  /**
   * NOSE
   */

  const noseTop = new CylinderBufferGeometry(
    0.6,
    0.6,
    2.5,
    5,
    1,
    false,
    0,
    Math.PI
  );
  const noseBottom = new BoxBufferGeometry(2.5, 0.4, 1.2);
  const noseRing = new CylinderBufferGeometry(
    0.75,
    0.75,
    0.1,
    5,
    1,
    false,
    0,
    Math.PI
  );
  const noseRingBottom = new BoxBufferGeometry(0.4, 0.1, 1.5);
  const noseFrontShape = new Shape()
    .moveTo(0, 0)
    .lineTo(0, 0.4)
    .lineTo(0.2, 0.6)
    .lineTo(0.2, 0)
    .lineTo(0, 0);
  const noseFront = new ExtrudeBufferGeometry(noseFrontShape, {
    depth: 0.8,
    bevelEnabled: false,
  });
  /**
   * WHEELS
   */

  const wheel = new CylinderBufferGeometry(0.5, 0.5, 0.1, 16);
  const wheelJoint = new BoxBufferGeometry(3.4, 0.15, 0.05);

  /**
   * CHIMNEY
   */

  const chimneyBottom = new CylinderBufferGeometry(0.15, 0.15, 0.4);
  const chimneyTop = new CylinderBufferGeometry(0.25, 0.15, 0.3);

  /**
   * CIMNEY SMOKE
   */
  const smoke = new IcosahedronBufferGeometry(0.2, 1);

  return {
    cabinSideRight,
    cabinSideLeft,
    cabinRoof,
    cabinFloor,
    cabinFront,
    cabinBack,
    trunkSide,
    trunkBack,
    trunkFloor,
    noseTop,
    noseBottom,
    noseRing,
    noseRingBottom,
    noseFront,
    wheel,
    wheelJoint,
    chimneyBottom,
    chimneyTop,
    smoke,
  };
}

export { createGeometries };
