import * as THREE from "three";

export type StarsOptions = {
  particleCount: number;
  minimumDistance: number;
  maximumDistance: number;
  rotationSpeed: number; // 新增旋转速度参数
};

export class Stars extends THREE.Group {
  private particleCount: number = 5000;
  private minimumDistance: number = 10;
  private maximumDistance: number = 20;
  private rotationSpeed: number = 0.02; // 默认旋转速度

  // 新增存储粒子极坐标的数组
  private radii: Float32Array;
  private angles: Float32Array;
  
  private positions: Float32Array;
  private colors: Float32Array;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private particles: THREE.Points;

  constructor(opts: Partial<StarsOptions> = {}) {
    super();

    // 初始化参数
    this.particleCount = opts.particleCount ?? this.particleCount;
    this.minimumDistance = opts.minimumDistance ?? this.minimumDistance;
    this.maximumDistance = opts.maximumDistance ?? this.maximumDistance;
    this.rotationSpeed = opts.rotationSpeed ?? this.rotationSpeed;

    // 初始化数组
    this.radii = new Float32Array(this.particleCount);
    this.angles = new Float32Array(this.particleCount);
    this.positions = new Float32Array(this.particleCount * 3);
    this.colors = new Float32Array(this.particleCount * 3);

    this.setupParticles();
  }

  private setupParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.resetParticle(i);
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.colors, 3)
    );

    this.material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      sizeAttenuation: true // 启用尺寸衰减
    });

    this.particles = new THREE.Points(this.geometry, this.material);
    this.add(this.particles);
  }

  private resetParticle(i: number) {
    const index = i * 3;
    
    // 生成球面随机分布
    const distance = 
      Math.random() * (this.maximumDistance - this.minimumDistance) + 
      this.minimumDistance;
    const theta = Math.random() * Math.PI * 2; // 方位角
    const phi = Math.acos(2 * Math.random() - 1); // 极角

    // 转换为笛卡尔坐标
    this.positions[index] = distance * Math.sin(phi) * Math.cos(theta);
    this.positions[index + 1] = distance * Math.cos(phi);
    this.positions[index + 2] = distance * Math.sin(phi) * Math.sin(theta);

    // 存储极坐标参数
    this.radii[i] = distance;
    this.angles[i] = theta;

    // 颜色生成（保持原有逻辑）
    this.colors[index] = Math.random() < 0.2 ? 0.3 : 1.0;
    this.colors[index + 1] = Math.random() < 0.2 ? 0.3 : 1.0;
    this.colors[index + 2] = Math.random() < 0.2 ? 0.3 : 1.0;
  }

  // 新增更新方法
  update(deltaTime: number) {
    const positions = this.positions;
    
    for (let i = 0; i < this.particleCount; i++) {
      const index = i * 3;
      const radius = this.radii[i];
      
      // 计算差异化旋转速度（距离越远旋转越慢）
      const speed = this.rotationSpeed * (1 / radius);
      
      // 更新方位角
      this.angles[i] += deltaTime * speed;
      
      // 保持角度在0-2π范围内
      if (this.angles[i] > Math.PI * 2) this.angles[i] -= Math.PI * 2;
      
      // 转换为笛卡尔坐标
      const phi = Math.acos(positions[index + 1] / radius); // 保持原有极角
      positions[index] = radius * Math.sin(phi) * Math.cos(this.angles[i]);
      positions[index + 2] = radius * Math.sin(phi) * Math.sin(this.angles[i]);
    }

    // 标记需要更新几何体
    this.geometry.attributes.position.needsUpdate = true;
  }
}