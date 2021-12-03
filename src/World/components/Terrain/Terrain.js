import { Vector3, Group, Object3D, Matrix4 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";

import { createMeshes } from "./meshes.js";

import { Train } from "../Train/Train.js";

class Terrain extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();
    this.train = new Train();
    this.dummy = new Object3D();
    this.sampler = null;
    this.treeCount = 15;

    this._position = new Vector3();
    this._normal = new Vector3();
    this._scale = new Vector3();

    this.add(
      this.meshes.globe,
      this.meshes.sand,
      this.meshes.sleepers,
      this.meshes.rail,
      this.meshes.treeRoot,
      this.meshes.treeCrown,
      this.train
    );

    this.resample();
  }

  resample() {
    this.sampler = new MeshSurfaceSampler(this.meshes.globe)
      .setWeightAttribute(null)
      .build();

    for (let i = 0; i < this.treeCount; i++) {
      this.resampleParticle(i);
    }

    this.meshes.treeRoot.instanceMatrix.needsUpdate = true;
    this.meshes.treeCrown.instanceMatrix.needsUpdate = true;
  }

  resampleParticle(i) {
    this.sampler.sample(this._position, this._normal);

    if (this._position.z < 2 && this._position.z > -2) {
      this.resampleParticle(i);
      return;
    }

    const up = new Vector3(0, 1, 0);
    let axis;
    if (this._normal.y == 1 || this._normal.y == -1) {
      axis = new Vector3(1, 0, 0);
    } else {
      axis = new Vector3().crossVectors(up, this._normal).normalize();
    }

    const radians = Math.acos(this._normal.dot(up));
    const matrix = new Matrix4().makeRotationAxis(axis, radians);
    this.dummy.rotation.setFromRotationMatrix(matrix);
    this.dummy.position.addVectors(this._position, this._normal.clone());
    const scale = 1 + Math.random() * 2;
    this.dummy.scale.set(scale, scale, scale);

    const crownDummy = this.dummy.clone();
    crownDummy.position.multiplyScalar(1.15);
    crownDummy.scale.set(scale, scale + 0.8, scale);

    this.dummy.updateMatrix();
    crownDummy.updateMatrix();

    this.meshes.treeRoot.setMatrixAt(i, this.dummy.matrix);
    this.meshes.treeCrown.setMatrixAt(i, crownDummy.matrix);
  }

  tick({ delta, time }) {
    this.train.tick({
      delta,
      time,
    });
    this.rotation.y = -time * 0.1;
    this.rotation.x = -time * 0.1;
  }
}

export { Terrain };
