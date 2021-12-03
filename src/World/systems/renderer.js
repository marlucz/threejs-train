import { PCFSoftShadowMap, WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  return renderer;
}

export { createRenderer };
