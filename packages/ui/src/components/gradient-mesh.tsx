import * as React from "react"
import { cn } from "../lib/cn"

export interface GradientMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gradient color stops */
  colors?: string[]
  /** Animation duration in seconds */
  duration?: number
  /** Blur intensity in px */
  blur?: number
  /** Overall intensity/opacity (0-1) */
  intensity?: number
}

export const GradientMesh = React.forwardRef<HTMLDivElement, GradientMeshProps>(
  (
    {
      className,
      children,
      colors = ["#a855f7", "#ec4899", "#6366f1", "#06b6d4"],
      duration = 10,
      blur = 60,
      intensity = 0.6,
      style,
      ...props
    },
    ref
  ) => {
    const meshLayers = React.useMemo(() => {
      return colors.map((color, i) => ({
        id: i,
        color,
        x: 25 + ((i * 50) / colors.length),
        y: 25 + ((i * 35) % 50),
        size: 50 + (i % 3) * 20,
      }))
    }, [colors])

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        style={style}
        {...props}
      >
        <div
          className="absolute inset-0"
          style={{ filter: `blur(${blur}px)`, opacity: intensity }}
        >
          {meshLayers.map((layer) => (
            <div
              key={layer.id}
              className="absolute animate-mesh-shift motion-reduce:[animation:none] [background-size:200%_200%]"
              style={{
                "--mesh-duration": `${duration + layer.id * 2}s`,
                width: `${layer.size}%`,
                height: `${layer.size}%`,
                left: `${layer.x}%`,
                top: `${layer.y}%`,
                background: `radial-gradient(circle at center, ${layer.color}, transparent 70%)`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${-layer.id * (duration / colors.length)}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        {children}
      </div>
    )
  }
)

GradientMesh.displayName = "GradientMesh"
