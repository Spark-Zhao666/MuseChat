<template>
  <div>
    <canvas id="planet-canvas" class="three-container"></canvas>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import emitter from '../utils/emitter'
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {Planet} from "../worlds/planet";
import {planetPresets, biomePresets} from "../worlds/presets";

// Three.js核心对象
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;

let planetMesh: THREE.Mesh;
let hasMusic = false; // 新增变量，标记是否有音乐
let hasPlanet = false;

// 新增：用于存储音乐频谱数据
let spectrumData: number[] = [];
let haloMesh: THREE.Mesh | null = null;
let haloGeometry: THREE.RingGeometry | null = null;

// 新增：音乐开始后的下倾动画参数
let tiltActive = false;
let tiltDone = false;
let tiltStartX = 0;
let tiltEndX = Math.PI / 6; // 约 -15°
let tiltStartTime = 0;
const tiltDuration = 2000; // ms

const presets = Object.keys(planetPresets);

// 事件总线
emitter.on('action', handleCreatePlanet)   // listen
function handleCreatePlanet(event: any) {
  const action_type = event.type
  const action_value = event.value
  if (action_type == 'create_planet') {
    if (!presets.includes(action_value)) {
      console.warn(`Unknown planet preset: ${action_value}`);
    }else {
      if (!hasPlanet) {
        setHueRangeFromPreset(action_value);
        createPlanet(action_value);
        hasPlanet = true;
      }
    }
  }
  else if (action_type == 'play_music') {
    hasMusic = !!event && event.value;
    // 音乐开始时触发下倾动画
    if (hasMusic && planetMesh) {
      tiltActive = true;
      tiltDone = false;
      tiltStartX = planetMesh.rotation.x;
      tiltStartTime = performance.now();
    }
  } else if (action_type === 'music_end' || action_type === 'music_ended') {
    // 音乐自然结束
    hasMusic = false;
  } else if(action_type == 'music_spectrum') {
    // 字符串和数组两种情况
    if (Array.isArray(event.value)) {
      spectrumData = event.value;
    } else if (typeof event.value === 'string') {
      spectrumData = event.value.split(',').map(Number);
    } else {
      spectrumData = [];
    }
  }else if(action_type=='stop_music'){
    hasMusic = false;
    spectrumData = [];
  }
  else {
    console.warn(`Unknown action type: ${action_type}`);
  }
}


// 初始化Three.js场景
const initScene = () => {
  const width = window.innerWidth * 0.7,
    height = window.innerHeight;
  const canvas = document.getElementById("planet-canvas");

  if (!canvas) {
    throw new Error("Canvas not found");
  }
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 30);
  camera.position.set(0, 0, 2.5);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  });

  renderer.setClearColor(0x000000, 0);

  // 计算像素比优化值
  const dpr = Math.min(window.devicePixelRatio, 2); // 限制最大为2倍
  renderer.setPixelRatio(dpr);

  // 设置渲染尺寸（核心修正）
  renderer.setSize(width * dpr, height * dpr, false);

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;

  controls = new OrbitControls(camera, renderer.domElement);

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

  // 新增：创建星球外围的光圈
  haloGeometry = new THREE.RingGeometry(1.15, 1.35, 2048);
  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7, // 提高初始透明度
    depthWrite: false, // 防止被遮挡
    blending: THREE.AdditiveBlending // 发光效果
  });
  haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
  haloMesh.rotation.x = Math.PI / 2;
  // 不再直接添加到场景，改为作为星球子节点
  // scene.add(haloMesh);

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);

    // 只有有音乐时才水平自转
    if (planetMesh && hasMusic) {
      planetMesh.rotation.y += 0.001; // 可调整速度
    }

    // 音乐开始后的下倾一次性缓动
    if (planetMesh && tiltActive) {
      const now = performance.now();
      const t = Math.min(1, (now - tiltStartTime) / tiltDuration);
      // easeOutCubic
      const k = 1 - Math.pow(1 - t, 3);
      planetMesh.rotation.x = tiltStartX + (tiltEndX - tiltStartX) * k;
      if (t >= 1) {
        tiltActive = false;
        tiltDone = true;
      }
    }

    // 新增：根据频谱数据动态调整光圈特效
    if (haloMesh && haloGeometry && spectrumData.length > 0 && hasMusic) {
      const pos = haloGeometry.attributes.position;
      const vertexCount = pos.count;
      const segCount = vertexCount / 2;
      for (let i = 0; i < segCount; i++) {
        // RingGeometry顶点交错排列：偶数为内圈，奇数为外圈
        const isOuter = i % 2 === 1;
        // 关键：angle分布在[0, 2π)区间，segCount为分段数
        const angle = i / (segCount - 1) * Math.PI * 2;
        const baseR = isOuter ? 1.35 : 1.15;
        // 外圈做平滑波纹，内圈不变
        const lowFreq = spectrumData.slice(0, Math.floor(spectrumData.length * 0.4));
        const lowAvg = lowFreq.length > 0 ? lowFreq.reduce((a, b) => a + b, 0) / lowFreq.length : 0;
        const wave = isOuter ? (0.04 * Math.sin(angle * 6 + performance.now() * 0.002) + 0.04 * (lowAvg / 255)) : 0;
        const r = baseR + wave;
        pos.setX(i, Math.cos(angle) * r);
        pos.setY(i, Math.sin(angle) * r);
        pos.setZ(i, 0);
      }
      pos.needsUpdate = true;
      // 光环自转
      haloMesh.rotation.z += 0.003;

      const highFreq = spectrumData.slice(Math.floor(spectrumData.length * 0.6));
      const avg = highFreq.reduce((a, b) => a + b, 0) / highFreq.length;
      const safeAvg = isNaN(avg) ? 0 : avg;
      const scale = 1 + Math.max(0, safeAvg) * 0.01 + 0.05 * Math.sin(performance.now() * 0.003);
      haloMesh.scale.set(scale, scale, scale);
      // 透明度和色相
      (haloMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.3, Math.min(1, 0.5 + Math.min(0.5, safeAvg * 0.01)));
      // 色相在星球 colors 梯度区间内渐变
      const t2 = 0.5 + 0.5 * Math.sin(performance.now() * 0.001);
      const hue = hueStart * (1 - t2) + hueEnd * t2 + safeAvg * 0.002;
      (haloMesh.material as THREE.MeshBasicMaterial).color.setHSL(Math.max(0, Math.min(1, hue)), 1, 0.6);
    }

    // if (!hasPlanet) {
    //   setHueRangeFromPreset("curiosity");
    //   createPlanet("curiosity");
    //   hasPlanet = true;
    // }
  });



  let sphereGeometry = new THREE.IcosahedronGeometry(1, 20);
  let sphereMaterial = new THREE.MeshStandardMaterial({
    color: "white",
    wireframe: true,
    wireframeLinewidth: 10,
  });
  planetMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // planetMesh.scale.set(1.2, 1.2, 1.2);
  scene.add(planetMesh);
  // 将光圈挂到星球上，使其随星球旋转/倾斜
  if (haloMesh) {
    if (haloMesh.parent) haloMesh.parent.remove(haloMesh);
    planetMesh.add(haloMesh);
  }
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
};

// createPlanet
async function createPlanet(preset: string | undefined = undefined) {
  if (!preset) {
    preset = presets[Math.floor(Math.random() * presets.length)];
  }

  console.time("planet");
  const planet = new Planet({
    detail: 50,
    ...planetPresets[preset],
  });
  let mesh = await planet.create();
  scene.remove(planetMesh);
  scene.add(mesh);
  planetMesh = mesh;
  // 新星球创建后，确保光圈继续作为其子节点
  if (haloMesh) {
    if (haloMesh.parent) haloMesh.parent.remove(haloMesh);
    planetMesh.add(haloMesh);
  }
  console.timeEnd("planet");
}

// 从预设的 colors 梯度中间色提取色相
let hueStart = 0.55;
let hueEnd = 0.55;
function setHueRangeFromPreset(preset: string) {
  const presetObj = planetPresets[preset]?.biome?.preset || preset;
  const biome = biomePresets[presetObj];
  if (biome && biome.colors && Array.isArray(biome.colors) && biome.colors.length > 1) {
    const stops = biome.colors as [number, number][];
    const startStop = stops[0];
    const endStop = stops[stops.length - 1];
    const startHSL = { h: 0, s: 0, l: 0 };
    const endHSL = { h: 0, s: 0, l: 0 };
    new THREE.Color(startStop[1]).getHSL(startHSL);
    new THREE.Color(endStop[1]).getHSL(endHSL);
    hueStart = startHSL.h;
    hueEnd = endHSL.h;
  } else {
    hueStart = hueEnd = 0.55;
  }
}

onMounted(() => {
  initScene();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  controls.dispose();
  renderer.dispose();
  scene.clear();
});
</script>


<style scoped>
.three-container {
  width: 70%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}
</style>
