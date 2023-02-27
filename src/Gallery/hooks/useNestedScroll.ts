import { useCallback, useEffect, useState } from "react"
import { getPxPositionFromTop } from "../helpers"

type Props = {
  fullsizeScrollBox: HTMLDivElement | undefined
  thumbScrollBox: HTMLDivElement | null | undefined
  thumbOverlay: HTMLDivElement | undefined
  thumbImages: HTMLDivElement | undefined | null
  fullsizeImages: HTMLDivElement | undefined | null
}

const useNestedScroll = ({
  fullsizeScrollBox,
  thumbScrollBox,
  thumbOverlay,
  thumbImages,
  fullsizeImages,
}: Props) => {
  const [mouseIsDown, setMouseIsDown] = useState(false)

  const [hitBoundingBoxBottom, setHitBoundingBoxBottom] = useState(false)
  const [hitBoundingBoxTop, setHitBoundingBoxTop] = useState(false)

  const [mouseDownStartPosition, setMouseDownStartPosition] = useState({
    thumbOverlayTop: 0,
    clientY: 0,
  })

  const handleRightBoxScroll = useCallback(() => {
    if (
      !(
        fullsizeScrollBox &&
        thumbScrollBox &&
        thumbOverlay &&
        thumbImages &&
        fullsizeImages
      )
    ) {
      return
    }

    if (mouseIsDown) {
      return
    } else {
      const thumbScrollBoxHeight = thumbScrollBox.getBoundingClientRect().height
      const thumbOverlayHeight = thumbOverlay.getBoundingClientRect().height

      const top = getPxPositionFromTop(
        thumbImages.getBoundingClientRect(),
        fullsizeImages.getBoundingClientRect(),
        fullsizeScrollBox.scrollTop
      )

      thumbOverlay.style.top = top + "px"

      const middle = (thumbScrollBoxHeight - thumbOverlayHeight) / 2

      thumbScrollBox.scrollTo({
        top: top - middle < 0 ? 0 : top - middle,
      })
    }
  }, [
    thumbImages,
    thumbScrollBox,
    mouseIsDown,
    thumbOverlay,
    fullsizeImages,
    fullsizeScrollBox,
  ])

  const handleWindowMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()

      if (
        !(
          thumbImages &&
          thumbOverlay &&
          fullsizeImages &&
          thumbScrollBox &&
          fullsizeScrollBox
        )
      ) {
        window.removeEventListener("mousemove", handleWindowMouseMove)
        return
      }
      if (!mouseIsDown) {
        return
      } else {
        const movedY = e.clientY - mouseDownStartPosition.clientY

        const newRelativeToParentTop =
          mouseDownStartPosition.thumbOverlayTop + movedY

        const thumbOverlayHitMaxBottom =
          newRelativeToParentTop >
          thumbImages.getBoundingClientRect().height -
            thumbOverlay.getBoundingClientRect().height
        const thumbOverlayHitMaxTop = newRelativeToParentTop < 0

        const topInBounding = thumbOverlayHitMaxTop
          ? 0
          : thumbOverlayHitMaxBottom
          ? thumbImages.getBoundingClientRect().height -
            thumbOverlay.getBoundingClientRect().height
          : newRelativeToParentTop

        if (hitBoundingBoxBottom || hitBoundingBoxTop) {
          thumbScrollBox.scrollTo({
            top: thumbScrollBox.scrollTop + e.movementY,
          })
        }

        thumbOverlay.style.top = topInBounding + "px"

        const targetScrollTop = getPxPositionFromTop(
          fullsizeImages.getBoundingClientRect(),
          thumbImages.getBoundingClientRect(),
          topInBounding
        )

        //Vi får problemer fordi det er luft under bildene som er like på begger sider.
        fullsizeScrollBox.scrollTo({
          top: targetScrollTop,
        })
      }
    },
    [
      hitBoundingBoxBottom,
      hitBoundingBoxTop,
      thumbImages,
      thumbScrollBox,
      mouseDownStartPosition.clientY,
      mouseDownStartPosition.thumbOverlayTop,
      mouseIsDown,
      thumbOverlay,
      fullsizeImages,
      fullsizeScrollBox,
    ]
  )

  const handleWindowMouseUp = useCallback(() => {
    setMouseIsDown(false)
  }, [])

  const handlethumbOverlayMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()

      if (!thumbOverlay) {
        return
      }

      setMouseIsDown(true)

      setMouseDownStartPosition((mouseDownStartPosition) => ({
        ...mouseDownStartPosition,
        thumbOverlayTop: thumbOverlay.offsetTop,
        clientY: e.clientY,
      }))
    },
    [thumbOverlay]
  )

  useEffect(() => {
    if (!fullsizeScrollBox) {
      return
    }
    /*****************************************
     * WHEN SCROLL RIGHT SIDE, MOVE thumbOverlay
     *****************************************/
    fullsizeScrollBox.addEventListener("scroll", handleRightBoxScroll)

    return () =>
      fullsizeScrollBox.removeEventListener("scroll", handleRightBoxScroll)
  }, [handleRightBoxScroll, fullsizeScrollBox])

  useEffect(() => {
    /*****************************************
     * DRAG thumbOverlay, SCROLL RIGHT SIDE
     *****************************************/
    thumbOverlay?.addEventListener("mousedown", handlethumbOverlayMouseDown)

    return () => {
      thumbOverlay?.removeEventListener(
        "mousedown",
        handlethumbOverlayMouseDown
      )
    }
  }, [handlethumbOverlayMouseDown, thumbOverlay])

  useEffect(() => {
    if (!thumbOverlay) {
      return
    }

    function onIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (!entry.rootBounds) {
          return
        }

        if (entry.boundingClientRect.top < entry.rootBounds.top) {
          setHitBoundingBoxTop(true)
        } else {
          setHitBoundingBoxTop(false)
        }
        if (
          mouseIsDown &&
          entry.boundingClientRect.bottom >= entry.rootBounds.bottom
        ) {
          setHitBoundingBoxBottom(true)
        } else {
          setHitBoundingBoxBottom(false)
        }
      })
    }

    const observer = new IntersectionObserver(onIntersection, {
      root: thumbScrollBox,
      threshold: 1,
    })

    observer.observe(thumbOverlay)

    return () => observer.disconnect()
  }, [thumbScrollBox, mouseIsDown, thumbOverlay])

  useEffect(() => {
    if (mouseIsDown) {
      if (fullsizeScrollBox) {
        fullsizeScrollBox.removeEventListener("scroll", handleRightBoxScroll)
      }

      window.addEventListener("mousemove", handleWindowMouseMove)
      window.addEventListener("mouseup", handleWindowMouseUp)
    } else {
      window.removeEventListener("mousemove", handleWindowMouseMove)
    }
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove)
      window.removeEventListener("mouseup", handleWindowMouseUp)
    }
  }, [
    handleRightBoxScroll,
    handleWindowMouseMove,
    handleWindowMouseUp,
    mouseIsDown,
    fullsizeScrollBox,
  ])
}

export default useNestedScroll
