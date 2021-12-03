import { MeshStandardMaterial } from "three";

function createMaterials() {
  const red = new MeshStandardMaterial({
    color: "firebrick",
    flatShading: true,
  });

  const black = new MeshStandardMaterial({
    color: "black",
    flatShading: true,
  });

  const metal = new MeshStandardMaterial({
    color: "darkGrey",
    flatShading: true,
  });

  const smoke = new MeshStandardMaterial({
    color: "#eeeeee",
    flatShading: true,
  });

  return {
    red,
    black,
    metal,
    smoke,
  };
}

export { createMaterials };
