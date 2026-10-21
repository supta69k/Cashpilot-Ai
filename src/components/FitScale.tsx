import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type FitScaleProps = {
  /** Design width of the mockup. */
  width: number
  /** Design height of the mockup. Rendered height is height × scale. */
  height: number
  /** Never shrink below this factor; the excess is cropped sideways. */
  minScale?: number
  className?: string
  children: ReactNode
}

/**
 * Proportionally scales a fixed-design mockup to the width it is given.
 * Below minScale the mockup stops shrinking and is cropped evenly instead,
 * which keeps dense UI screenshots legible on phones.
 */
export default function FitScale({
  width,
  height,
  minScale = 0,
  className = '',
  children,
}: FitScaleProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = outerRef.current
    if (!el) return

    const update = () => {
      const next = Math.min(1, Math.max(el.clientWidth / width, minScale))
      setScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [width, minScale])

  return (
    <div
      ref={outerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: height * scale }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `calc(50% - ${width / 2}px)`,
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
