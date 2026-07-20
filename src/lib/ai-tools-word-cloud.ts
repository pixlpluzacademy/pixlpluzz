export type AiToolTone = 'hero' | 'green' | 'blue' | 'butter' | 'white'

export interface AiToolCloudWord {
  text: string
  x: number
  y: number
  sizeRem: number
  tone: AiToolTone
  rotation: number
}

/**
 * Word-cloud layout for famous AI tools (green / blue / butter / white).
 */
export const AI_TOOLS_CLOUD_WORDS: AiToolCloudWord[] = [
  { text: 'AI TOOLS', x: 0, y: -5, sizeRem: 0, tone: 'hero', rotation: 0 },

  { text: 'CHATGPT', x: -360, y: -19, sizeRem: 0.95, tone: 'butter', rotation: 0 },
  { text: 'CLAUDE', x: -355, y: 5, sizeRem: 1.0, tone: 'blue', rotation: 0 },
  { text: 'CURSOR', x: -369, y: 30, sizeRem: 1.5, tone: 'white', rotation: 0 },
  { text: 'GEMINI', x: -357, y: 57, sizeRem: 1.0, tone: 'green', rotation: 0 },
  { text: 'COPILOT', x: -300, y: -5, sizeRem: 1.3, tone: 'blue', rotation: -90 },

  { text: 'v0', x: -116, y: -171, sizeRem: 1.1, tone: 'butter', rotation: 0 },
  { text: 'MIDJOURNEY', x: -129, y: -135, sizeRem: 1.5, tone: 'blue', rotation: 0 },
  { text: 'PERPLEXITY', x: -180, y: -88, sizeRem: 2.1, tone: 'white', rotation: 0 },

  { text: 'ZAPIER', x: -31, y: -109, sizeRem: 0.9, tone: 'butter', rotation: -90 },
  { text: 'MAKE', x: 0, y: -155, sizeRem: 1.1, tone: 'green', rotation: -90 },
  { text: 'BOLT', x: 31, y: -186, sizeRem: 0.8, tone: 'white', rotation: -90 },

  { text: 'NOTION AI', x: 158, y: -171, sizeRem: 1.9, tone: 'butter', rotation: 0 },
  { text: 'CANVA AI', x: 140, y: -129, sizeRem: 1.5, tone: 'green', rotation: 0 },
  { text: 'JASPER', x: 100, y: -85, sizeRem: 1.3, tone: 'blue', rotation: 0 },
  { text: 'SURFER', x: 220, y: -98, sizeRem: 0.75, tone: 'white', rotation: -90 },
  { text: 'GROK', x: 271, y: -135, sizeRem: 1.0, tone: 'blue', rotation: 0 },
  { text: 'WINDSURF', x: 305, y: -98, sizeRem: 1.2, tone: 'green', rotation: 0 },

  { text: 'REPLIT', x: 310, y: -12, sizeRem: 1.0, tone: 'butter', rotation: -90 },
  { text: 'LOVABLE', x: 382, y: -16, sizeRem: 1.3, tone: 'green', rotation: 0 },
  { text: 'LANGCHAIN', x: 399, y: 23, sizeRem: 1.3, tone: 'blue', rotation: 0 },
  { text: 'DEEPSEEK', x: 349, y: 57, sizeRem: 1.2, tone: 'white', rotation: 0 },

  { text: 'HUGGING FACE', x: -225,y: 106, sizeRem: 1.7, tone: 'butter', rotation: 0 },
  { text: 'COLAB', x: -178, y: 150, sizeRem: 1.4, tone: 'blue', rotation: 0 },
  { text: 'OPENAI', x: -99, y: 155, sizeRem: 1.5, tone: 'green', rotation: -90 },
  { text: 'N8N', x: -60, y: 135, sizeRem: 0.8, tone: 'white', rotation: -90 },
                 
  { text: 'GITHUB', x: 96, y: 113, sizeRem: 1.9, tone: 'blue', rotation: 0 },
  { text: 'RUNWAY', x: 65, y: 145, sizeRem: 1.5, tone: 'green', rotation: 0 },
  { text: 'SORA', x: 217, y: 130, sizeRem: 1.0, tone: 'butter', rotation: 0 },
  { text: 'ELEVENLABS', x: 57, y: 186, sizeRem: 1.4, tone: 'white', rotation: 0 },
]
