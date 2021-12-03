import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 1000);

  camera.position.set(-30,50, 80);

  return camera;
}

export { createCamera };
