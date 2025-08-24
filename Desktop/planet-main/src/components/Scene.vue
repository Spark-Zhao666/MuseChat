<template>
  <div>
    <canvas id="canvas" class="three-container"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { Stars } from "../worlds/stars";

const container = ref<HTMLElement | null>(null);

// Three.js核心对象
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let animationFrameId: number;

// 初始化Three.js场景
const initScene = () => {
  const width = window.innerWidth,
    height = window.innerHeight;

  const canvas = document.getElementById("canvas");

  if (!canvas) {
    throw new Error("Canvas not found");
  }
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 30);
  camera.position.set(0, 0, 2.5);

  renderer = new THREE.WebGLRenderer({
        antialias: true,
    canvas,
    alpha: true,
  });

  // 计算像素比优化值
  const dpr = Math.min(window.devicePixelRatio, 2); // 限制最大为2倍
  renderer.setPixelRatio(dpr);

  // 设置渲染尺寸（核心修正）
  renderer.setSize(width * dpr, height * dpr, false);

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;

  const light = new THREE.DirectionalLight();
  light.intensity = 2;
  light.position.set(2, 1, 0);
  scene.add(light);
  light.castShadow = true;
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.shadow.camera.far = 10;
  light.shadow.camera.near = 0.1;

  light.shadow.bias = 0.01;
  light.shadow.camera.top = 2;
  light.shadow.camera.right = 2;
  light.shadow.camera.bottom = -2;
  light.shadow.camera.left = -2;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const stars = new Stars({
    particleCount: 8000,
    minimumDistance: 15,
    maximumDistance: 30,
    rotationSpeed: 0.3, // 控制整体旋转速度
  });

  const clock = new THREE.Clock();

  renderer.setAnimationLoop((delta) => {
    stars.update(clock.getDelta());
    // const time = clock.getElapsedTime();
    // stars.update(time);
    renderer.render(scene, camera);
  });

  // let stars = new Stars();

  scene.add(stars);
};

// 响应式尺寸调整
const handleResize = () => {
  const width = window.innerWidth * 0.7,
    height = window.innerHeight;
  // 计算像素比优化值
  const dpr = Math.min(window.devicePixelRatio, 2); // 限制最大为2倍
  renderer.setPixelRatio(dpr);

  // 设置渲染尺寸（核心修正）
  renderer.setSize(width * dpr, height * dpr, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// 生命周期管理
onMounted(() => {
  initScene();
    window.addEventListener('resize', handleResize)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  // controls.dispose();
  renderer.dispose();
  scene.clear();
  if (container.value) {
    container.value.removeChild(renderer.domElement);
  }
});
</script>


<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}
</style>