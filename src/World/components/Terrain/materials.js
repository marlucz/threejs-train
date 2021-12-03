import { MeshStandardMaterial } from "three";

function createMaterials() {
  const grass = new MeshStandardMaterial({
    color: "lawnGreen",
    flatShading: true,
  });

  const metal = new MeshStandardMaterial({
    color: "darkGrey",
    flatShading: true,
  });
  const sand = new MeshStandardMaterial({
    color: "khaki",
    flatShading: true,
  });
  const wood = new MeshStandardMaterial({
    color: "sienna",
    flatShading: true,
  });

  const tree = new MeshStandardMaterial({
    color: "#832E04",
    flatShading: true,
  });

  const leaves = new MeshStandardMaterial({
    color: "#0CAE5B",
    flatShading: true,
  });

  return {
    grass,
    metal,
    sand,
    wood,
    tree,
    leaves,
  };
}

export { createMaterials };
