import {
  BoxBufferGeometry,
  CatmullRomCurve3,
  EllipseCurve,
  ExtrudeBufferGeometry,
  IcosahedronBufferGeometry,
  ConeBufferGeometry,
  Shape,
  Vector3,
} from "three";

function createGeometries() {
  const globe = new IcosahedronBufferGeometry(20, 4);

  const railShape = new Shape()
    .moveTo(0, 0)
    .lineTo(0, 0)
    .lineTo(0, 0.05)
    .lineTo(0.12, 0.08)
    .lineTo(0.12, 0.15)
    .lineTo(0.08, 0.15)
    .lineTo(0.08, 0.2)
    .lineTo(0.22, 0.2)
    .lineTo(0.22, 0.15)
    .lineTo(0.18, 0.15)
    .lineTo(0.18, 0.08)
    .lineTo(0.3, 0.05)
    .lineTo(0.3, 0)
    .lineTo(0, 0);

  const sandShape = new Shape()
    .moveTo(0, 0)
    .lineTo(0, 0)
    .lineTo(-1.5, 0)
    .lineTo(-1.5, 0.2)
    .lineTo(1.5, 0.2)
    .lineTo(1.5, 0)
    .lineTo(0, 0);

  const sandCurve = new EllipseCurve(
    0,
    0, // ax, aY
    20,
    20, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );
  const sandPathPoints = sandCurve
    .getPoints(40)
    .map((point) => new Vector3(point.x, point.y, 0));
  const sandPath = new CatmullRomCurve3(sandPathPoints);
  sandPath.curveType = "catmullrom";
  sandPath.closed = true;
  const sand = new ExtrudeBufferGeometry(sandShape, {
    steps: 40,
    bevelEnabled: false,
    extrudePath: sandPath,
  });

  const railCurve = new EllipseCurve(
    0,
    0, // ax, aY
    20.3,
    20.3, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );
  const railPathPoints = railCurve
    .getPoints(40)
    .map((point) => new Vector3(point.x, point.y, 0));
  const railPath = new CatmullRomCurve3(railPathPoints);
  railPath.curveType = "catmullrom";
  railPath.closed = true;

  const rail = new ExtrudeBufferGeometry(railShape, {
    steps: 40,
    bevelEnabled: false,
    extrudePath: railPath,
  });

  const sleeper = new BoxBufferGeometry(0.3, 0.1, 2.5);

  const treeRoot = new ConeBufferGeometry(0.5, 5, 6);
  const treeCrown = new IcosahedronBufferGeometry(1, 1);

  return {
    globe,
    rail,
    sand,
    sleeper,
    treeRoot,
    treeCrown,
  };
}

export { createGeometries };
