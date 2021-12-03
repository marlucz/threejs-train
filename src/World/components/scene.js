import { Scene, Fog } from "three";

function createScene() {
  const scene = new Scene();

  scene.fog = new Fog(0xf7d9aa, 80, 200);

  return scene;
}

export { createScene };
