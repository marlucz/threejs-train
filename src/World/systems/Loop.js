import {
  Clock
} from 'three';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const time = clock.getElapsedTime();
    const delta = clock.getDelta()

    for (const object of this.updatables) {
      object.tick({
        time,
        delta
      });
    }
  }
}

export {
  Loop
};