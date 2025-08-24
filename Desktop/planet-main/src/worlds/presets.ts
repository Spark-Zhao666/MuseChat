import { type BiomeOptions } from "./biome";
import { type PlanetOptions } from "./planet";

const beachBiome: BiomeOptions = {
  noise: {
    min: -0.05,
    max: 0.05,
    octaves: 4,
    lacunarity: 2.0,
    gain: {
      min: 0.1,
      max: 0.8,
      scale: 2,
    },
    warp: 0.3,
    scale: 1,
    power: 1.5,
  },

  colors: [
    [-0.5, 0x994400],
    [-0.0, 0xccaa00],
    [0.4, 0xcc7700],
    [1.0, 0x002222],
  ],

  seaColors: [
    [-1, 0x000066],
    [-0.55, 0x0000aa],
    [-0.1, 0x00f2e5],
  ],
  seaNoise: {
    min: -0.008,
    max: 0.008,
    scale: 6,
  },

  vegetation: {
    items: [
      {
        name: "Rock",
        density: 50,
        minimumHeight: 0.1,
        colors: {
          Gray: { array: [0x775544] },
        },
      },
      {
        name: "PalmTree",
        density: 50,
        minimumHeight: 0.1,
        colors: {
          Brown: { array: [0x8b4513, 0x5b3105] },
          Green: { array: [0x22851e, 0x22a51e] },
          DarkGreen: { array: [0x006400] },
        },
        ground: {
          color: 0x229900,
          radius: 0.1,
          raise: 0.01,
        },
      },
    ],
  },
};

const forestBiome: BiomeOptions = {
  noise: {
    min: -0.05,
    max: 0.05,
    octaves: 4,
    lacunarity: 2.0,
    gain: {
      min: 0.1,
      max: 0.8,
      scale: 2,
    },
    warp: 0.3,
    scale: 1,
    power: 0.8,
  },

  tintColor: 0x113322,

  colors: [
    [-0.5, 0x332200],
    [-0.0, 0x115512],
    [0.4, 0x224411],
    [1.0, 0x006622],
  ],

  seaColors: [
    [-1, 0x000066],
    [-0.52, 0x0000aa],
    [-0.1, 0x0042a5],
  ],
  seaNoise: {
    min: -0.005,
    max: 0.005,
    scale: 5,
  },

  vegetation: {
    items: [
      {
        name: "Rock",
        density: 5,
        minimumHeight: 0.1,
        colors: {
          Gray: { array: [0x888888, 0x616161, 0x414141] },
        },
      },
      {
        name: "CommonTree",
        density: 5,
        minimumHeight: 0.0,
      },
      {
        name: "Bush",
        density: 5,
        minimumHeight: 0.0,
      },
      {
        name: "CommonTree_Dead",
        density: 5,
      },
      {
        name: "PineTree",
        density: 5,
      },
      {
        name: "TreeStump",
        density: 1,
      },
      {
        name: "TreeStump_Moss",
        density: 1,
      },
      {
        name: "Willow",
        density: 5,
      },
      {
        name: "Willow_Dead",
        density: 5,
      },
      {
        name: "WoodLog",
        density: 1,
      },
      {
        name: "BirchTree",
        density: 5,
      },
      {
        name: "BirchTree_Dead",
        density: 5,
      },
    ],
  },
};

const snowForestBiome: BiomeOptions = {
  noise: {
    min: -0.05,
    max: 0.05,
    octaves: 4,
    lacunarity: 2.0,
    gain: {
      min: 0.1,
      max: 0.8,
      scale: 2,
    },
    warp: 0.3,
    scale: 1,
    power: 0.8,
  },

  tintColor: 0x119922,

  colors: [
    [-0.5, 0xff99ff],
    [-0.0, 0xffffff],
    [0.4, 0xeeffff],
    [1.0, 0xffffff],
  ],

  seaColors: [
    [-1, 0x8899cc],
    [-0.52, 0xaaccff],
    [-0.1, 0xaaccff],
  ],
  seaNoise: {
    min: -0.0,
    max: 0.001,
    scale: 5,
  },

  vegetation: {
    items: [
      {
        name: "Rock_Snow",
        density: 5,
        minimumHeight: 0.1,
        colors: {
          Gray: { array: [0x888888, 0x616161, 0x414141] },
        },
      },
      {
        name: "CommonTree_Snow",
        density: 5,
        minimumHeight: 0.0,
      },
      {
        name: "Bush_Snow",
        density: 5,
        minimumHeight: 0.0,
      },
      {
        name: "CommonTree_Dead_Snow",
        density: 5,
      },
      {
        name: "PineTree_Snow",
        density: 5,
      },
      {
        name: "TreeStump_Snow",
        density: 1,
      },
      {
        name: "TreeStump_Snow",
        density: 1,
      },
      {
        name: "Willow_Snow",
        density: 5,
      },
      {
        name: "Willow_Dead_Snow",
        density: 5,
      },
      {
        name: "WoodLog_Snow",
        density: 1,
      },
      {
        name: "BirchTree_Snow",
        density: 5,
      },
      {
        name: "BirchTree_Dead_Snow",
        density: 5,
      },
    ],
  },
};

// 高兴（Happy）
const happyBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 2.0,
    gain: {
      min: 0.2,
      max: 0.7,
      scale: 1.5,
    },
    warp: 0.2,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0xfff799], // 明亮黄色
    [0.0, 0xffe066],
    [0.4, 0xffc300],
    [1.0, 0xfff799],
  ],
  seaColors: [
    [-1, 0x99e6ff],
    [-0.5, 0x66ccff],
    [-0.1, 0x33bbff],
  ],
  seaNoise: {
    min: -0.005,
    max: 0.005,
    scale: 4,
  },
};

// 愤怒（Angry）
const angryBiome: BiomeOptions = {
  noise: {
    min: -0.07,
    max: 0.07,
    octaves: 5,
    lacunarity: 2.5,
    gain: {
      min: 0.3,
      max: 0.9,
      scale: 2.5,
    },
    warp: 0.5,
    scale: 1.2,
    power: 1.8,
  },
  colors: [
    [-0.5, 0x660000], // 深红
    [0.0, 0xcc0000],
    [0.4, 0xff3300],
    [1.0, 0x990000],
  ],
  seaColors: [
    [-1, 0x330000],
    [-0.5, 0x660000],
    [-0.1, 0xcc3333],
  ],
  seaNoise: {
    min: -0.01,
    max: 0.01,
    scale: 6,
  }
};

// 悲伤（Sad）
const sadBiome: BiomeOptions = {
  noise: {
    min: -0.04,
    max: 0.04,
    octaves: 3,
    lacunarity: 1.8,
    gain: {
      min: 0.1,
      max: 0.6,
      scale: 1.2,
    },
    warp: 0.15,
    scale: 0.9,
    power: 0.7,
  },
  colors: [
    [-0.5, 0x334477], // 深蓝灰
    [0.0, 0x5577aa],
    [0.4, 0x99bbcc],
    [1.0, 0xccccff],
  ],
  seaColors: [
    [-1, 0x222244],
    [-0.5, 0x335577],
    [-0.1, 0x6688aa],
  ],
  seaNoise: {
    min: -0.004,
    max: 0.004,
    scale: 4,
  },
};

// 欢愉（Joyful）
const joyfulBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.5,
    gain: {
      min: 0.2,
      max: 0.5,
      scale: 1.1,
    },
    warp: 0.1,
    scale: 1.1,
    power: 1.2,
  },
  colors: [
    [-0.5, 0xffe0f0], // 粉色系
    [0.0, 0xffb3e6],
    [0.4, 0xff99cc],
    [1.0, 0xffe0f0],
  ],
  seaColors: [
    [-1, 0x99ffe0],
    [-0.5, 0x66ffcc],
    [-0.1, 0x33ffbb],
  ],
  seaNoise: {
    min: -0.003,
    max: 0.003,
    scale: 3,
  },
};

// 新增情绪预设（不重复生成 anger）
const annoyanceBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 2.0,
    gain: { min: 0.2, max: 0.7, scale: 1.6 },
    warp: 0.3,
    scale: 1,
    power: 1.2,
  },
  colors: [
    [-0.5, 0x665522],
    [0.0, 0xe6b800],
    [0.4, 0xff9900],
    [1.0, 0x996600],
  ],
  seaColors: [
    [-1, 0x336699],
    [-0.5, 0x3399cc],
    [-0.1, 0x66cce6],
  ],
  seaNoise: { min: -0.005, max: 0.005, scale: 4 },
};

const disapprovalBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.8,
    gain: { min: 0.15, max: 0.6, scale: 1.2 },
    warp: 0.1,
    scale: 1,
    power: 0.9,
  },
  colors: [
    [-0.5, 0x2f2f2f],
    [0.0, 0x556b2f],
    [0.4, 0x6b8e23],
    [1.0, 0x3b5323],
  ],
  seaColors: [
    [-1, 0x1c2a2e],
    [-0.5, 0x2e4052],
    [-0.1, 0x37474f],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const disgustBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 2.0,
    gain: { min: 0.2, max: 0.7, scale: 1.5 },
    warp: 0.2,
    scale: 1,
    power: 1.1,
  },
  colors: [
    [-0.5, 0x223311],
    [0.0, 0x556b2f],
    [0.4, 0x88aa22],
    [1.0, 0x335522],
  ],
  seaColors: [
    [-1, 0x103322],
    [-0.5, 0x165c3a],
    [-0.1, 0x2a8f5a],
  ],
  seaNoise: { min: -0.004, max: 0.004, scale: 4 },
};

const fearBiome: BiomeOptions = {
  noise: {
    min: -0.06,
    max: 0.06,
    octaves: 4,
    lacunarity: 2.2,
    gain: { min: 0.25, max: 0.8, scale: 2 },
    warp: 0.5,
    scale: 1.1,
    power: 1.6,
  },
  colors: [
    [-0.5, 0x0b0b2b],
    [0.0, 0x162447],
    [0.4, 0x1f4068],
    [1.0, 0x1b1b3a],
  ],
  seaColors: [
    [-1, 0x070a16],
    [-0.5, 0x0d1b2a],
    [-0.1, 0x1b263b],
  ],
  seaNoise: { min: -0.006, max: 0.006, scale: 6 },
};

const nervousnessBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 2.0,
    gain: { min: 0.2, max: 0.7, scale: 1.4 },
    warp: 0.4,
    scale: 1,
    power: 1.1,
  },
  colors: [
    [-0.5, 0xe0f7fa],
    [0.0, 0xfff59d],
    [0.4, 0xa5d6a7],
    [1.0, 0xffecb3],
  ],
  seaColors: [
    [-1, 0x8ecae6],
    [-0.5, 0x48cae4],
    [-0.1, 0x90e0ef],
  ],
  seaNoise: { min: -0.005, max: 0.005, scale: 5 },
};

const amusementBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.6,
    gain: { min: 0.2, max: 0.5, scale: 1.2 },
    warp: 0.15,
    scale: 1.05,
    power: 1.1,
  },
  colors: [
    [-0.5, 0xfff0cc],
    [0.0, 0xffccf2],
    [0.4, 0xccfff2],
    [1.0, 0xffffcc],
  ],
  seaColors: [
    [-1, 0x99f6ff],
    [-0.5, 0x66e0ff],
    [-0.1, 0x33d4ff],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const approvalBiome: BiomeOptions = {
  noise: {
    min: -0.025,
    max: 0.025,
    octaves: 3,
    lacunarity: 1.8,
    gain: { min: 0.15, max: 0.6, scale: 1.3 },
    warp: 0.12,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0xe0f2f1],
    [0.0, 0x80cbc4],
    [0.4, 0x4db6ac],
    [1.0, 0x26a69a],
  ],
  seaColors: [
    [-1, 0x004d40],
    [-0.5, 0x00796b],
    [-0.1, 0x26a69a],
  ],
  seaNoise: { min: -0.004, max: 0.004, scale: 4 },
};

const excitementBiome: BiomeOptions = {
  noise: {
    min: -0.06,
    max: 0.06,
    octaves: 5,
    lacunarity: 2.3,
    gain: { min: 0.3, max: 0.9, scale: 2.4 },
    warp: 0.6,
    scale: 1.2,
    power: 1.7,
  },
  colors: [
    [-0.5, 0x7a1f00],
    [0.0, 0xff6f00],
    [0.4, 0xff3d00],
    [1.0, 0xff9100],
  ],
  seaColors: [
    [-1, 0x330000],
    [-0.5, 0x661a00],
    [-0.1, 0xcc5200],
  ],
  seaNoise: { min: -0.008, max: 0.008, scale: 6 },
};

const gratitudeBiome: BiomeOptions = {
  noise: {
    min: -0.025,
    max: 0.025,
    octaves: 3,
    lacunarity: 1.7,
    gain: { min: 0.2, max: 0.6, scale: 1.3 },
    warp: 0.12,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0x665c1e],
    [0.0, 0xc9a227],
    [0.4, 0x9ccc65],
    [1.0, 0xf6e27a],
  ],
  seaColors: [
    [-1, 0x2e3d3f],
    [-0.5, 0x3f5c5c],
    [-0.1, 0x5fa19e],
  ],
  seaNoise: { min: -0.004, max: 0.004, scale: 4 },
};

const loveBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.5,
    gain: { min: 0.2, max: 0.5, scale: 1.1 },
    warp: 0.1,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0xffe0e6],
    [0.0, 0xffb3c1],
    [0.4, 0xff8fa3],
    [1.0, 0xffc1d6],
  ],
  seaColors: [
    [-1, 0x8e0038],
    [-0.5, 0xc51162],
    [-0.1, 0xff4081],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const optimismBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.6,
    gain: { min: 0.2, max: 0.5, scale: 1.2 },
    warp: 0.1,
    scale: 1.05,
    power: 1.1,
  },
  colors: [
    [-0.5, 0xfff8e1],
    [0.0, 0xfff176],
    [0.4, 0x80deea],
    [1.0, 0xb2ebf2],
  ],
  seaColors: [
    [-1, 0x0288d1],
    [-0.5, 0x03a9f4],
    [-0.1, 0x4fc3f7],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const reliefBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.5,
    gain: { min: 0.15, max: 0.5, scale: 1.1 },
    warp: 0.08,
    scale: 1,
    power: 0.9,
  },
  colors: [
    [-0.5, 0xe8f5e9],
    [0.0, 0xc8e6c9],
    [0.4, 0xb3e5fc],
    [1.0, 0x81d4fa],
  ],
  seaColors: [
    [-1, 0x006064],
    [-0.5, 0x00838f],
    [-0.1, 0x00acc1],
  ],
  seaNoise: { min: -0.002, max: 0.002, scale: 2 },
};

const prideBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 2.0,
    gain: { min: 0.2, max: 0.7, scale: 1.6 },
    warp: 0.2,
    scale: 1.1,
    power: 1.3,
  },
  colors: [
    [-0.5, 0x311b92],
    [0.0, 0x512da8],
    [0.4, 0x9575cd],
    [1.0, 0xffd740],
  ],
  seaColors: [
    [-1, 0x1a237e],
    [-0.5, 0x283593],
    [-0.1, 0x5c6bc0],
  ],
  seaNoise: { min: -0.005, max: 0.005, scale: 5 },
};

const admirationBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.5,
    gain: { min: 0.15, max: 0.5, scale: 1.1 },
    warp: 0.1,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0xe3f2fd],
    [0.0, 0x90caf9],
    [0.4, 0x64b5f6],
    [1.0, 0xfff59d],
  ],
  seaColors: [
    [-1, 0x0d47a1],
    [-0.5, 0x1976d2],
    [-0.1, 0x42a5f5],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const desireBiome: BiomeOptions = {
  noise: {
    min: -0.035,
    max: 0.035,
    octaves: 3,
    lacunarity: 2.0,
    gain: { min: 0.25, max: 0.7, scale: 1.6 },
    warp: 0.25,
    scale: 1.05,
    power: 1.3,
  },
  colors: [
    [-0.5, 0x4a0033],
    [0.0, 0x880e4f],
    [0.4, 0xc2185b],
    [1.0, 0xe91e63],
  ],
  seaColors: [
    [-1, 0x2a0033],
    [-0.5, 0x4a004d],
    [-0.1, 0x880e4f],
  ],
  seaNoise: { min: -0.004, max: 0.004, scale: 4 },
};

const caringBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.5,
    gain: { min: 0.15, max: 0.5, scale: 1.1 },
    warp: 0.08,
    scale: 1,
    power: 0.9,
  },
  colors: [
    [-0.5, 0xfff0e6],
    [0.0, 0xffd1c1],
    [0.4, 0xffccbc],
    [1.0, 0xf8bbd0],
  ],
  seaColors: [
    [-1, 0x5d4037],
    [-0.5, 0x795548],
    [-0.1, 0xa1887f],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const disappointmentBiome: BiomeOptions = {
  noise: {
    min: -0.025,
    max: 0.025,
    octaves: 3,
    lacunarity: 1.8,
    gain: { min: 0.15, max: 0.6, scale: 1.3 },
    warp: 0.12,
    scale: 1,
    power: 0.95,
  },
  colors: [
    [-0.5, 0x2e3b4e],
    [0.0, 0x4f5b66],
    [0.4, 0x7b8a8b],
    [1.0, 0xb0bec5],
  ],
  seaColors: [
    [-1, 0x1c2630],
    [-0.5, 0x263238],
    [-0.1, 0x37474f],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const embarrassmentBiome: BiomeOptions = {
  noise: {
    min: -0.02,
    max: 0.02,
    octaves: 2,
    lacunarity: 1.5,
    gain: { min: 0.15, max: 0.5, scale: 1.1 },
    warp: 0.1,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0xffebee],
    [0.0, 0xffcdd2],
    [0.4, 0xef9a9a],
    [1.0, 0xffccbc],
  ],
  seaColors: [
    [-1, 0xb71c1c],
    [-0.5, 0xd32f2f],
    [-0.1, 0xef5350],
  ],
  seaNoise: { min: -0.003, max: 0.003, scale: 3 },
};

const griefBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 2,
    lacunarity: 1.6,
    gain: { min: 0.1, max: 0.4, scale: 1.0 },
    warp: 0.05,
    scale: 0.95,
    power: 0.6,
  },
  colors: [
    [-0.5, 0x0a0f1a],
    [0.0, 0x1f2833],
    [0.4, 0x3a4750],
    [1.0, 0x2e3440],
  ],
  seaColors: [
    [-1, 0x000814],
    [-0.5, 0x001d3d],
    [-0.1, 0x003566],
  ],
  seaNoise: { min: -0.002, max: 0.002, scale: 2 },
};

const remorseBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 1.9,
    gain: { min: 0.15, max: 0.6, scale: 1.3 },
    warp: 0.15,
    scale: 1,
    power: 1.0,
  },
  colors: [
    [-0.5, 0x102a43],
    [0.0, 0x243b53],
    [0.4, 0x334e68],
    [1.0, 0x486581],
  ],
  seaColors: [
    [-1, 0x0b3142],
    [-0.5, 0x114b5f],
    [-0.1, 0x1a6f8b],
  ],
  seaNoise: { min: -0.004, max: 0.004, scale: 4 },
};

const surpriseBiome: BiomeOptions = {
  noise: {
    min: -0.04,
    max: 0.04,
    octaves: 4,
    lacunarity: 2.2,
    gain: { min: 0.25, max: 0.7, scale: 1.8 },
    warp: 0.6,
    scale: 1.1,
    power: 1.4,
  },
  colors: [
    [-0.5, 0x4a148c],
    [0.0, 0x7e57c2],
    [0.4, 0xfff176],
    [1.0, 0xffeb3b],
  ],
  seaColors: [
    [-1, 0x311b92],
    [-0.5, 0x512da8],
    [-0.1, 0x9575cd],
  ],
  seaNoise: { min: -0.006, max: 0.006, scale: 6 },
};

const realizationBiome: BiomeOptions = {
  noise: {
    min: -0.018,
    max: 0.018,
    octaves: 2,
    lacunarity: 1.4,
    gain: { min: 0.15, max: 0.45, scale: 1.0 },
    warp: 0.05,
    scale: 1,
    power: 0.95,
  },
  colors: [
    [-0.5, 0xf1f8e9],
    [0.0, 0xe3f2fd],
    [0.4, 0xbbdefb],
    [1.0, 0xc5e1a5],
  ],
  seaColors: [
    [-1, 0x01579b],
    [-0.5, 0x0277bd],
    [-0.1, 0x81d4fa],
  ],
  seaNoise: { min: -0.002, max: 0.002, scale: 2 },
};

const confusionBiome: BiomeOptions = {
  noise: {
    min: -0.05,
    max: 0.05,
    octaves: 5,
    lacunarity: 2.2,
    gain: { min: 0.25, max: 0.8, scale: 2.0 },
    warp: 0.5,
    scale: 1.2,
    power: 1.6,
  },
  colors: [
    [-0.5, 0x2e003e],
    [0.0, 0x4a148c],
    [0.4, 0x33691e],
    [1.0, 0x7cb342],
  ],
  seaColors: [
    [-1, 0x1b5e20],
    [-0.5, 0x004d40],
    [-0.1, 0x33691e],
  ],
  seaNoise: { min: -0.007, max: 0.007, scale: 6 },
};

const curiosityBiome: BiomeOptions = {
  noise: {
    min: -0.03,
    max: 0.03,
    octaves: 3,
    lacunarity: 1.9,
    gain: { min: 0.2, max: 0.6, scale: 1.4 },
    warp: 0.25,
    scale: 1.05,
    power: 1.2,
  },
  colors: [
    [-0.5, 0xe0f7fa],
    [0.0, 0x80deea],
    [0.4, 0xce93d8],
    [1.0, 0x9575cd],
  ],
  seaColors: [
    [-1, 0x006064],
    [-0.5, 0x4527a0],
    [-0.1, 0x00838f],
  ],
  seaNoise: { min: -0.004, max: 0.004, scale: 4 },
};

export const biomePresets: Record<string, BiomeOptions> = {
  beach: beachBiome,
  forest: forestBiome,
  snowForest: snowForestBiome,
  happy: happyBiome,
  angry: angryBiome,
  sad: sadBiome,
  joyful: joyfulBiome,
  // 新增
  annoyance: annoyanceBiome,
  disapproval: disapprovalBiome,
  disgust: disgustBiome,
  fear: fearBiome,
  nervousness: nervousnessBiome,
  amusement: amusementBiome,
  approval: approvalBiome,
  excitement: excitementBiome,
  gratitude: gratitudeBiome,
  love: loveBiome,
  optimism: optimismBiome,
  relief: reliefBiome,
  pride: prideBiome,
  admiration: admirationBiome,
  desire: desireBiome,
  caring: caringBiome,
  disappointment: disappointmentBiome,
  embarrassment: embarrassmentBiome,
  grief: griefBiome,
  remorse: remorseBiome,
  surprise: surpriseBiome,
  realization: realizationBiome,
  confusion: confusionBiome,
  curiosity: curiosityBiome,
  // 别名，避免重复：
  joy: joyfulBiome,
  sadness: sadBiome,
};

const beachPlanet: PlanetOptions = {
  biome: {
    preset: "beach",
  },

  material: "caustics",
};

const forestPlanet: PlanetOptions = {
  biome: {
    preset: "forest",
  },

  material: "normal",
};

const snowForestPlanet: PlanetOptions = {
  biome: {
    preset: "snowForest",
  },
};

const happyPlanet: PlanetOptions = {
  biome: {
    preset: "happy",
  },
  material: "normal",

};

const angryPlanet: PlanetOptions = {
  biome: {
    preset: "angry",
  },
  material: "normal",
};

const sadPlanet: PlanetOptions = {
  biome: {
    preset: "sad",
  },
  material: "normal",
};

const joyfulPlanet: PlanetOptions = {
  biome: {
    preset: "joyful",
  },
  material: "normal",
};

// 新增星球预设（全部使用 normal 材质）
const annoyancePlanet: PlanetOptions = { biome: { preset: "annoyance" }, material: "normal" };
const disapprovalPlanet: PlanetOptions = { biome: { preset: "disapproval" }, material: "normal" };
const disgustPlanet: PlanetOptions = { biome: { preset: "disgust" }, material: "normal" };
const fearPlanet: PlanetOptions = { biome: { preset: "fear" }, material: "normal" };
const nervousnessPlanet: PlanetOptions = { biome: { preset: "nervousness" }, material: "normal" };
const amusementPlanet: PlanetOptions = { biome: { preset: "amusement" }, material: "normal" };
const approvalPlanet: PlanetOptions = { biome: { preset: "approval" }, material: "normal" };
const excitementPlanet: PlanetOptions = { biome: { preset: "excitement" }, material: "normal" };
const gratitudePlanet: PlanetOptions = { biome: { preset: "gratitude" }, material: "normal" };
const lovePlanet: PlanetOptions = { biome: { preset: "love" }, material: "normal" };
const optimismPlanet: PlanetOptions = { biome: { preset: "optimism" }, material: "normal" };
const reliefPlanet: PlanetOptions = { biome: { preset: "relief" }, material: "normal" };
const pridePlanet: PlanetOptions = { biome: { preset: "pride" }, material: "normal" };
const admirationPlanet: PlanetOptions = { biome: { preset: "admiration" }, material: "normal" };
const desirePlanet: PlanetOptions = { biome: { preset: "desire" }, material: "normal" };
const caringPlanet: PlanetOptions = { biome: { preset: "caring" }, material: "normal" };
const disappointmentPlanet: PlanetOptions = { biome: { preset: "disappointment" }, material: "normal" };
const embarrassmentPlanet: PlanetOptions = { biome: { preset: "embarrassment" }, material: "normal" };
const griefPlanet: PlanetOptions = { biome: { preset: "grief" }, material: "normal" };
const remorsePlanet: PlanetOptions = { biome: { preset: "remorse" }, material: "normal" };
const surprisePlanet: PlanetOptions = { biome: { preset: "surprise" }, material: "normal" };
const realizationPlanet: PlanetOptions = { biome: { preset: "realization" }, material: "normal" };
const confusionPlanet: PlanetOptions = { biome: { preset: "confusion" }, material: "normal" };
const curiosityPlanet: PlanetOptions = { biome: { preset: "curiosity" }, material: "normal" };
// 别名星球
const joyPlanet: PlanetOptions = { biome: { preset: "joy" }, material: "normal" };
const sadnessPlanet: PlanetOptions = { biome: { preset: "sadness" }, material: "normal" };

export const planetPresets: Record<string, PlanetOptions> = {
  // beach: beachPlanet,
  // forest: forestPlanet,
  // snowForest: snowForestPlanet,
  // happy: happyPlanet,
  angry: angryPlanet,
  // sad: sadPlanet,
  // joyful: joyfulPlanet,
  // 新增
  annoyance: annoyancePlanet,
  disapproval: disapprovalPlanet,
  disgust: disgustPlanet,
  fear: fearPlanet,
  nervousness: nervousnessPlanet,
  amusement: amusementPlanet,
  approval: approvalPlanet,
  excitement: excitementPlanet,
  gratitude: gratitudePlanet,
  love: lovePlanet,
  optimism: optimismPlanet,
  relief: reliefPlanet,
  pride: pridePlanet,
  admiration: admirationPlanet,
  desire: desirePlanet,
  caring: caringPlanet,
  disappointment: disappointmentPlanet,
  embarrassment: embarrassmentPlanet,
  grief: griefPlanet,
  remorse: remorsePlanet,
  surprise: surprisePlanet,
  realization: realizationPlanet,
  confusion: confusionPlanet,
  curiosity: curiosityPlanet,
  // 别名导出
  joy: joyPlanet,
  sadness: sadnessPlanet,
};
