import {
  DynamicDrawUsage,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Mesh,
} from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const globe = new Mesh(geometries.globe, materials.grass);
  globe.receiveShadow = true;

  const sand = new Mesh(geometries.sand, materials.sand);
  sand.receiveShadow = true;

  const sleepers = new Group();
  const sleeper = new Mesh(geometries.sleeper, materials.wood);
  sleeper.position.set(0, 20, 0);
  sleeper.receiveShadow = true;

  const sleepersCount = 100;
  const thetaPerSleeper = (2 * Math.PI) / sleepersCount;

  for (let i = 0; i < sleepersCount; i++) {
    const newSleeper = sleeper.clone();
    newSleeper.position.x = Math.cos(thetaPerSleeper * i) * 20;
    newSleeper.position.y = Math.sin(thetaPerSleeper * i) * 20;
    newSleeper.rotation.z += thetaPerSleeper * i + Math.PI / 2;

    sleepers.add(newSleeper);
  }

  const rail = new Group();
  const railLeft = new Mesh(geometries.rail, materials.metal);
  railLeft.receiveShadow = true;
  railLeft.position.z = 1.05;
  const railRight = railLeft.clone();
  railRight.receiveShadow = true;
  railRight.position.z = -0.75;
  rail.add(railLeft, railRight);

  const count = 15;
  const treeRoot = new InstancedMesh(
    geometries.treeRoot,
    materials.tree,
    count
  );
  const treeCrown = new InstancedMesh(
    geometries.treeCrown,
    materials.leaves,
    count
  );

  treeRoot.instanceMatrix.setUsage(DynamicDrawUsage);
  treeCrown.instanceMatrix.setUsage(DynamicDrawUsage);

  return {
    globe,
    rail,
    sand,
    sleepers,
    treeRoot,
    treeCrown,
  };
}

export { createMeshes };
