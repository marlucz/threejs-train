import {
  SphereBufferGeometry
} from "three";

function createGeometries() {
  const cloud = new SphereBufferGeometry(0.5, 5, 5);

  return {
    cloud,
  };
}

export {
  createGeometries
};