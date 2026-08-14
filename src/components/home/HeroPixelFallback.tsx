/** CSS stand-in for the 3D cube field (loading / no-WebGL). Kept separate so it never pulls `three`. */
export function HeroPixelFallback() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 72% 48%, rgba(21,62,144,0.42) 0%, transparent 68%), radial-gradient(ellipse 40% 35% at 28% 62%, rgba(84,227,70,0.14) 0%, transparent 62%)',
        }}
      />
      <div className="absolute inset-0 pixel-grid-bg opacity-15" />
    </>
  )
}
