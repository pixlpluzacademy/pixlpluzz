export type AiToolTone = 'hero' | 'green' | 'blue' | 'butter' | 'white'

export interface AiToolCloudWord {
  text: string
  x: number
  y: number
  sizeRem: number
  tone: AiToolTone
  rotation: number
  /** Used when vertical labels are flattened (< ~900px) so they don’t collide */
  mobileX?: number
  mobileY?: number
}

/**
 * Word-cloud layout for famous AI tools (green / blue / butter / white).
 * Desktop coords unchanged for the right side (REPLIT). Mobile overrides only
 * apply when rotation is flattened on small screens.
 */
export const AI_TOOLS_CLOUD_WORDS: AiToolCloudWord[] = [
  { text: 'AI TOOLS', x: 0, y: -5, sizeRem: 0, tone: 'hero', rotation: 0 },

  { text: 'CHATGPT', x: -360, y: -32, sizeRem: 0.95, tone: 'butter', rotation: 0, mobileY: -55 },
  { text: 'CLAUDE', x: -355, y: -2, sizeRem: 1.0, tone: 'blue', rotation: 0, mobileY: -22 },
  { text: 'CURSOR', x: -369, y: 30, sizeRem: 1.5, tone: 'white', rotation: 0, mobileY: 14 },
  { text: 'GEMINI', x: -357, y: 60, sizeRem: 1.0, tone: 'green', rotation: 0, mobileY: 48 },
  {
    text: 'COPILOT',
    x: -435,
    y: -5,
    sizeRem: 1.3,
    tone: 'blue',
    rotation: -90,
    mobileX: -360,
    mobileY: -88,
  },

  { text: 'v0', x: -116, y: -171, sizeRem: 1.1, tone: 'butter', rotation: 0 },
  { text: 'MIDJOURNEY', x: -129, y: -135, sizeRem: 1.5, tone: 'blue', rotation: 0 },
  { text: 'PERPLEXITY', x: -180, y: -88, sizeRem: 2.1, tone: 'white', rotation: 0, mobileY: -100 },

  {
    text: 'ZAPIER',
    x: -31,
    y: -109,
    sizeRem: 0.9,
    tone: 'butter',
    rotation: -90,
    mobileX: -95,
    mobileY: -195,
  },
  {
    text: 'MAKE',
    x: 0,
    y: -155,
    sizeRem: 1.1,
    tone: 'green',
    rotation: -90,
    mobileX: 0,
    mobileY: -215,
  },
  {
    text: 'BOLT',
    x: 31,
    y: -186,
    sizeRem: 0.8,
    tone: 'white',
    rotation: -90,
    mobileX: 95,
    mobileY: -195,
  },

  { text: 'NOTION AI', x: 158, y: -171, sizeRem: 1.9, tone: 'butter', rotation: 0, mobileX: 130, mobileY: -168 },
  { text: 'CANVA AI', x: 140, y: -129, sizeRem: 1.5, tone: 'green', rotation: 0, mobileY: -128 },
  { text: 'JASPER', x: 100, y: -85, sizeRem: 1.3, tone: 'blue', rotation: 0 },
  {
    text: 'SURFER',
    x: 220,
    y: -98,
    sizeRem: 0.75,
    tone: 'white',
    rotation: -90,
    mobileX: 280,
    mobileY: -200,
  },
  { text: 'GROK', x: 271, y: -135, sizeRem: 1.0, tone: 'blue', rotation: 0, mobileX: 295, mobileY: -145 },
  { text: 'WINDSURF', x: 305, y: -98, sizeRem: 1.2, tone: 'green', rotation: 0, mobileX: 300, mobileY: -105 },

  // Right — desktop original; REPLIT only shifts on flat mobile
  {
    text: 'REPLIT',
    x: 310,
    y: -12,
    sizeRem: 1.0,
    tone: 'butter',
    rotation: -90,
    mobileX: 300,
    mobileY: 88,
  },
  { text: 'LOVABLE', x: 382, y: -16, sizeRem: 1.3, tone: 'green', rotation: 0, mobileY: -28 },
  { text: 'LANGCHAIN', x: 399, y: 23, sizeRem: 1.3, tone: 'blue', rotation: 0, mobileY: 12 },
  { text: 'DEEPSEEK', x: 349, y: 57, sizeRem: 1.2, tone: 'white', rotation: 0, mobileY: 50 },

  { text: 'HUGGING FACE', x: -225, y: 106, sizeRem: 1.7, tone: 'butter', rotation: 0, mobileY: 95 },
  { text: 'COLAB', x: -178, y: 150, sizeRem: 1.4, tone: 'blue', rotation: 0, mobileY: 130 },
  {
    text: 'OPENAI',
    x: -99,
    y: 155,
    sizeRem: 1.5,
    tone: 'green',
    rotation: -90,
    mobileX: -145,
    mobileY: 175,
  },
  {
    text: 'N8N',
    x: -60,
    y: 135,
    sizeRem: 0.8,
    tone: 'white',
    rotation: -90,
    mobileX: 5,
    mobileY: 165,
  },

  { text: 'GITHUB', x: 96, y: 113, sizeRem: 1.9, tone: 'blue', rotation: 0 },
  { text: 'RUNWAY', x: 65, y: 145, sizeRem: 1.5, tone: 'green', rotation: 0, mobileY: 155 },
  { text: 'SORA', x: 217, y: 130, sizeRem: 1.0, tone: 'butter', rotation: 0 },
  { text: 'ELEVENLABS', x: 57, y: 186, sizeRem: 1.4, tone: 'white', rotation: 0, mobileY: 200 },
]
