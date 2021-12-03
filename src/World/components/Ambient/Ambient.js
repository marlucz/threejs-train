import {
  Group,
  Vector3
} from "three";

import {
  createMeshes
} from "./meshes.js";

class Ambient extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();
    this.originalPositions = this.meshes.clouds.children.map(
      (child) => child.position
    );

    this.add(this.meshes.clouds);
  }
  tick({
    time,
    delta
  }) {
    this.meshes.clouds.rotateOnWorldAxis(new Vector3(0, 1, 0), 0.002)
    this.meshes.clouds.children.forEach((child, i) => {
      const direction = i % 2 ? -1 : 1;
      child.position.y += direction * Math.sin(time) * (Math.random() * (0.004 - 0.001) + 0.001)
      child.position.z += direction * Math.sin(time) * 0.01
      child.position.x += direction * Math.cos(time) * 0.01
    })
  }
}

export {
  Ambient
};