import { Group, Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  /**
   * CABIN
   */

  const cabin = new Group();
  const cabinSideRight = new Mesh(geometries.cabinSideRight, materials.red);
  cabinSideRight.receiveShadow = true;
  cabinSideRight.castShadow = true;

  const cabinSideLeft = new Mesh(geometries.cabinSideLeft, materials.red);
  cabinSideLeft.receiveShadow = true;
  cabinSideLeft.castShadow = true;
  cabinSideLeft.position.set(0, 0, 1.4);

  const cabinRoof = new Mesh(geometries.cabinRoof, materials.black);
  cabinRoof.receiveShadow = true;
  cabinRoof.castShadow = true;
  cabinRoof.position.set(1.1, 2.05, 0.75);

  const cabinFloor = new Mesh(geometries.cabinFloor, materials.black);
  cabinFloor.receiveShadow = true;
  cabinFloor.castShadow = true;
  cabinFloor.position.set(0, 0.05, 0.75);

  const cabinFront = new Mesh(geometries.cabinFront, materials.red);
  cabinFront.receiveShadow = true;
  cabinFront.castShadow = true;
  cabinFront.position.set(0, 0, 1.5);
  cabinFront.rotateY(Math.PI / 2);

  const cabinBack = new Mesh(geometries.cabinBack, materials.red);
  cabinBack.receiveShadow = true;
  cabinBack.castShadow = true;
  cabinBack.position.set(2.5, 0.375, 0.75);

  cabin.add(
    cabinSideRight,
    cabinSideLeft,
    cabinRoof,
    cabinFloor,
    cabinFront,
    cabinBack
  );
  cabin.position.set(0.5, 0.6, -0.75);

  /**
   * CHIMNEY
   */

  const chimney = new Group();
  chimney.name = "chimney";

  const chimneyBottom = new Mesh(geometries.chimneyBottom, materials.red);
  chimneyBottom.receiveShadow = true;
  chimneyBottom.castShadow = true;
  const chimneyTop = new Mesh(geometries.chimneyTop, materials.red);
  chimneyTop.name = "chimneyTop";
  chimneyTop.receiveShadow = true;
  chimneyTop.castShadow = true;
  chimneyTop.position.y = 0.25;

  chimney.add(chimneyBottom, chimneyTop);
  chimney.position.set(-1.55, 1.85, 0);

  /**
   * NOSE
   */

  const nose = new Group();

  const noseTop = new Mesh(geometries.noseTop, materials.red);
  noseTop.receiveShadow = true;
  noseTop.castShadow = true;

  const noseBottom = new Mesh(geometries.noseBottom, materials.red);
  noseBottom.receiveShadow = true;
  noseBottom.castShadow = true;
  noseBottom.position.set(-0.2, 0, 0);
  noseBottom.rotation.z = Math.PI / 2;

  const noseRing = new Mesh(geometries.noseRing, materials.black);
  noseRing.receiveShadow = true;
  noseRing.castShadow = true;
  noseRing.position.y = -1.15;

  const noseRingBottom = new Mesh(geometries.noseRingBottom, materials.black);
  noseRingBottom.receiveShadow = true;
  noseRingBottom.castShadow = true;
  noseRingBottom.position.set(-0.2, -1.15, 0);

  const rings = 3;
  for (let i = 0; i < rings; i++) {
    const newRing = noseRing.clone();
    const newRingBottom = noseRingBottom.clone();
    newRing.position.clone(noseRing.position);
    newRing.position.y += 2.4 / rings + (2.4 / rings) * i;
    newRingBottom.position.clone(noseRingBottom.position);
    newRingBottom.position.y += 2.4 / rings + (2.4 / rings) * i;
    nose.add(newRing, newRingBottom);
  }

  const noseFront = new Mesh(geometries.noseFront, materials.red);
  noseFront.receiveShadow = true;
  noseFront.castShadow = true;
  noseFront.rotation.z = -Math.PI / 2;
  noseFront.position.set(-0.4, 1.5, -0.4);

  nose.add(noseTop, noseBottom, noseRing, noseRingBottom, noseFront);
  nose.position.set(-0.7, 1.1, 0);
  nose.rotation.z = Math.PI / 2;

  /**
   * WHEELS
   */

  const wheel = new Group();
  wheel.position.y = 0.1;
  const wheelInner = new Mesh(geometries.wheel, materials.black);
  wheelInner.scale.set(0.2, 1.1, 0.2);
  wheelInner.position.y = 0.01;

  const wheelOuter = new Mesh(geometries.wheel, materials.metal);
  wheelOuter.receiveShadow = true;
  wheelOuter.castShadow = true;

  wheel.add(wheelInner, wheelOuter);
  wheel.rotation.x = Math.PI / 2;

  const wheelLeft = new Group();
  for (let i = 0; i < 4; i++) {
    const newWheel = wheel.clone();
    newWheel.position.x -= 1.1 * i;
    wheelLeft.add(newWheel);
  }
  wheelLeft.position.set(2, 0.4, 0.9);

  const wheelRight = wheelLeft.clone();
  wheelRight.rotation.y = Math.PI;
  wheelRight.position.x = -1.3;
  wheelRight.position.z = -0.9;

  const wheelJointRight = new Mesh(geometries.wheelJoint, materials.red);
  wheelJointRight.position.set(0.6, 0.5, 0.98);
  const wheelJointLeft = wheelJointRight.clone();
  wheelJointLeft.position.set(0.6, 0.5, -0.98);

  wheelLeft.name = "wheelLeft";
  wheelRight.name = "wheelRight";
  wheelJointRight.name = "wheelJointRight";
  wheelJointLeft.name = "wheelJointLeft";
  const wheels = new Group();
  wheels.add(wheelRight, wheelLeft, wheelJointRight, wheelJointLeft);

  const smoke = new Mesh(geometries.smoke, materials.smoke);

  return {
    nose,
    cabin,
    chimney,
    wheels,
    smoke,
  };
}

export { createMeshes };
