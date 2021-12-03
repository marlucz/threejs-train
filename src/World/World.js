import { createCamera } from "./components/camera.js";
import { createAxesHelper, createGridHelper } from "./components/helpers.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";

import { Terrain } from "./components/Terrain/Terrain.js";
import { Ambient } from "./components/Ambient/Ambient.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { Group } from "three";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const { ambientLight, ambientLight2, mainLight, hemisphereLight } =
      createLights();

    const terrain = new Terrain();
    const ambient = new Ambient();

    loop.updatables.push(controls, terrain, ambient);
    scene.add(
      mainLight,
      hemisphereLight,
      ambientLight,
      // ambientLight2,
      terrain,
      ambient
    );

    const resizer = new Resizer(container, camera, renderer);

    // scene.add(createAxesHelper());
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
