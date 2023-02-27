import { useEffect, useRef, useState } from "react"

const useResizeObserver = () => {
  const boundingRef = useRef<HTMLDivElement | null>(null)
  const [boundingRect, setBoundingRect] = useState<DOMRect | undefined>()

  useEffect(() => {
    if (!boundingRef?.current) {
      return
    }

    setBoundingRect(boundingRef?.current?.getBoundingClientRect())

    const resizeObserver = new ResizeObserver(() => {
      boundingRef?.current &&
        setBoundingRect(boundingRef?.current?.getBoundingClientRect())
    })

    resizeObserver.observe(boundingRef.current)

    return () => resizeObserver.disconnect() // clean up
  }, [boundingRef])

  return {
    boundingRef,
    boundingRect,
  }
}

export default useResizeObserver
