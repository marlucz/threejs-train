import { Group, MathUtils, Vector3 } from "three";
import { createMeshes } from "./meshes.js";
import gsap from "gsap";

const wheelSpeed = MathUtils.degToRad(180);

class Train extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();

    this.smokeRecycle = [];
    this.worldCoords = null;
    this.smoke = null;
    this.freqCount = 0;
    this.frequency = 10;
    this.chimneyTop = null;

    this.add(
      this.meshes.nose,
      this.meshes.cabin,
      this.meshes.chimney,
      this.meshes.wheels
    );

    this.position.y = 20.2;
    this.castShadow = true;

    this.meshes.chimney.traverse((child) => {
      if (child.name === "chimneyTop") {
        this.chimneyTop = child;
      }
    });
  }

  dropSmoke = (s) => {
    s.material.opacity = 1;
    s.position.set(-1.55, 2.3, 0);
    s.scale.set(0.1, 0.1, 0.1);

    const scale = Math.random() * (5 - 1) + 1;

    const tweenSmokeEnter = gsap.timeline();
    tweenSmokeEnter.to(
      s.scale,
      3,
      {
        x: scale,
        y: scale,
        z: scale,
        duration: 1.5,
        delay: 0.1,
        ease: "power2.out",
      },
      0
    );
    tweenSmokeEnter.to(
      s.position,
      3,
      {
        x: s.position.x + 5,
        duration: 1.5,
        ease: "power2.in",
      },
      0
    );
    tweenSmokeEnter.to(
      s.position,
      3,
      {
        y: s.position.y + Math.random() + 1,
        z: s.position.z + (1 - Math.random() * 2),
        duration: 1.5,
        ease: "power2.out",
      },
      0
    );

    const tweenSmokeLeave = gsap.to(s.scale, 1, {
      x: 0.1,
      y: 0.1,
      z: 0.1,
      ease: "power2.in",
      onComplete: this.removeSmoke.bind(this),
      onCompleteParams: [s],
    });

    const tl = gsap.timeline();
    tl.add(tweenSmokeEnter).add(tweenSmokeLeave, 2).play();
  };

  removeSmoke(smoke) {
    this.smokeRecycle.pop();
    this.remove(smoke);
  }

  resetSmoke(smoke) {
    smoke.position.x = 0;
    smoke.position.y = 0;
    smoke.position.z = 0;
    smoke.rotation.x = Math.random() * Math.PI * 2;
    smoke.rotation.y = Math.random() * Math.PI * 2;
    smoke.rotation.z = Math.random() * Math.PI * 2;
    smoke.scale.set(0.1, 0.1, 0.1);
    smoke.material.opacity = 0;
    smoke.material.needUpdate = true;
    this.add(smoke);
    this.smokeRecycle.push(smoke);
  }

  createSmoke() {
    const smoke = this.createSmokeParticle();
    this.dropSmoke(smoke);
  }

  createSmokeParticle() {
    this.smoke = this.meshes.smoke.clone();
    this.resetSmoke(this.smoke);
    return this.smoke;
  }

  updateSmokeArr() {
    if ((this.freqCount + 10) % this.frequency === 0) {
      this.createSmoke();
    }
    this.freqCount++;
  }

  tick({ time, delta }) {
    this.meshes.wheels.children.forEach((child) => {
      switch (child.name) {
        case "wheelRight":
          child.children.forEach(
            (child) => (child.rotation.y = -wheelSpeed * time)
          );
          break;
        case "wheelLeft":
          child.children.forEach(
            (child) => (child.rotation.y = wheelSpeed * time)
          );
          break;
        case "wheelJointRight":
        case "wheelJointLeft":
          child.position.x = Math.cos(wheelSpeed * time) * 0.3 + 0.4;
          child.position.y = Math.sin(wheelSpeed * time) * 0.3 + 0.5;
          break;
        default:
          break;
      }
    });
    this.position.x = Math.cos(Math.PI / 2 + time * 0.5) * 20.2;
    this.position.y = Math.sin(Math.PI / 2 + time * 0.5) * 20.2;
    this.rotation.z = time * 0.5;

    this.updateSmokeArr();
  }
}

export { Train };
