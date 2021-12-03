import {
  Group,
  Mesh,
  Object3D
} from "three";

import {
  createGeometries
} from "./geometries.js";
import {
  createMaterials
} from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const createCloud = () => {
    const cloudObject = new Object3D();

    const cloudBlocks = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < cloudBlocks; i++) {
      const cloudMesh = new Mesh(geometries.cloud, materials.cloud);

      cloudMesh.position.x = i * 0.3;
      cloudMesh.position.y = Math.random() * 0.5;
      cloudMesh.position.z = Math.random() * 1;
      cloudMesh.rotation.z = Math.random() * Math.PI * 2;
      cloudMesh.rotation.y = Math.random() * Math.PI * 2;

      const cloudScale = 0.1 + Math.random() * 0.9;
      cloudMesh.scale.set(cloudScale, cloudScale, cloudScale);

      cloudMesh.castShadow = true;
      cloudMesh.receiveShadow = true;

      cloudObject.add(cloudMesh);
    }
    return cloudObject;
  };

  const clouds = new Group();
  const cloudsCount = 30;
  const stepAngle = (Math.PI * 2) / cloudsCount;

  for (let i = 0; i < cloudsCount; i++) {
    const cloud = createCloud();

    cloud.position.x = Math.random() * 2 - 1;
    cloud.position.y = Math.random() * 2 - 1;
    cloud.position.z = Math.random() * 2 - 1;
    cloud.position.normalize();
    cloud.position.multiplyScalar(35 - Math.random() * 5);

    const cloudScale = 2 + Math.random() * 2;
    cloud.scale.set(cloudScale, cloudScale, cloudScale);

    clouds.add(cloud);
  }


  return {
    clouds,
  };
}

export {
  createMeshes
};