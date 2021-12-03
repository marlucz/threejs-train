import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

function createLights() {
  const hemisphereLight = new HemisphereLight(0x6cc6cb, 0x000000, 2.5);

  const mainLight = new DirectionalLight("#FFE9F7", 1);
  mainLight.position.set(10, 10, 10);
  mainLight.castShadow = true;
  mainLight.shadow.camera.left = -50;
  mainLight.shadow.camera.right = 50;
  mainLight.shadow.camera.top = 50;
  mainLight.shadow.camera.bottom = -50;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;

  const ambientLight = new AmbientLight(0xdc8874, 2);
  const ambientLight2 = new AmbientLight(0xffffff, 1);

  return { ambientLight, ambientLight2, mainLight, hemisphereLight };
}

export { createLights };
