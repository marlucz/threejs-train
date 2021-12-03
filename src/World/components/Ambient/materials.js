import {
  MeshPhongMaterial,
} from "three";

function createMaterials() {
  const cloud = new MeshPhongMaterial({
    color: "#d8d0d1",
    flatShading: true,
  });

  return {
    cloud,
  };
}

export {
  createMaterials
};