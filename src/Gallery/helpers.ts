export const getPercentHeight = (
  boundaryBoxRect: DOMRect,
  sourceRect: DOMRect
) => {
  const heightPercent = (boundaryBoxRect.height / sourceRect.height) * 100
  return heightPercent
}

export const getPxPositionFromTop = (
  targetRect: DOMRect,
  sourceRect: DOMRect,
  sourceBoxScrollTop: number
) => {
  const sourceScrollPercentFromTop =
    (sourceBoxScrollTop / sourceRect?.height ?? 0) * 100
  const pxFromTop = (sourceScrollPercentFromTop * targetRect?.height ?? 0) / 100
  return pxFromTop
}

export const getPercentPositionFromTop = (
  sourceRect: DOMRect,
  sourceBoxScrollTop: number
) => {
  const percentScrolledFromTop =
    (sourceBoxScrollTop / sourceRect?.height ?? 0) * 100
  return percentScrolledFromTop
}
