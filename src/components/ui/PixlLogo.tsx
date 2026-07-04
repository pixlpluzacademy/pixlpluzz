import { cn } from '@/lib/utils'

interface PixlLogoProps {
  className?: string
  variant?: 'brand' | 'white'
  /** Text/letter fill when variant is brand */
  textFill?: string
}

export function PixlLogo({
  className,
  variant = 'brand',
  textFill = '#153e90',
}: PixlLogoProps) {
  const fill = variant === 'white' ? '#ffffff' : textFill
  const accent = '#54e346'

  return (
    <svg
      viewBox="0 0 300 113.11"
      className={cn('h-auto w-full', className)}
      aria-label="Pixl Pluz"
      role="img"
    >
      <polygon fill={accent} points="113.11 0 113.11 37.7 94.26 37.7 94.26 18.85 75.41 18.85 75.41 0 113.11 0" />
      <path fill={fill} d="M75.41,37.7v37.7h-37.7v-37.7h37.7v-18.85H18.85v75.41h75.41v-56.55h-18.85Z" />
      <rect fill={fill} y="94.26" width="18.85" height="18.85" />
      <polygon fill={fill} points="299.93 70.06 276.86 86.18 300 86.18 300 94.26 259.64 94.26 259.64 88.38 262.77 86.18 285.84 70.06 285.88 70.04 259.64 70.04 259.64 61.97 300 61.97 300 70.04 299.97 70.04 299.93 70.06" />
      <path fill={fill} d="M185.62,86.18v-24.22h-8.07v32.29h32.29v-8.07h-24.22Z" />
      <polygon fill={fill} points="246.85 61.97 246.85 86.18 222.63 86.18 222.63 61.97 214.56 61.97 214.56 94.26 222.63 94.26 246.85 94.26 254.92 94.26 254.92 61.97 246.85 61.97" />
      <path fill={fill} d="M244.03,42.74v-23.89h-8.07v31.96h32.29v-8.07h-24.22Z" />
      <path fill={fill} d="M177.55,50.81v-31.96h8.18v31.96h-8.18Z" />
      <polygon fill={fill} points="231.24 50.81 220.25 50.81 210.84 40.7 201.43 50.81 190.44 50.81 205.35 34.79 190.51 18.85 201.5 18.85 210.84 28.89 220.18 18.85 231.17 18.85 216.34 34.79 231.24 50.81" />
      <polygon fill={fill} points="131.96 18.85 131.96 27.03 164.66 27.03 164.66 35.2 131.96 35.2 131.96 51.14 140.14 51.14 140.14 43.38 172.84 43.38 172.84 18.85 131.96 18.85" />
      <polygon fill={fill} points="131.96 61.97 131.96 70.14 164.66 70.14 164.66 78.32 131.96 78.32 131.96 94.26 140.14 94.26 140.14 86.49 172.84 86.49 172.84 61.97 131.96 61.97" />
    </svg>
  )
}
