import {
  createContext,
  MutableRefObject,
  useMemo,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

import { getPercentHeight } from "../helpers"
import useNestedScroll from "../hooks/useNestedScroll"
import useResizeObserver from "../hooks/useResizeObserver"
import { ImagePage } from "../types"

export type ImageViewerScrollState = {
  selectedPage: ImagePage | null
  setSelectedPage: Dispatch<SetStateAction<ImagePage | null>>
  thumbOverlay: MutableRefObject<HTMLDivElement | undefined> | undefined
  fullsizeScrollBox: MutableRefObject<HTMLDivElement | undefined> | undefined
  thumbsScrollBox: MutableRefObject<HTMLDivElement | null> | undefined
  fullsizeImages: MutableRefObject<HTMLDivElement | null> | null
  thumbsImages: MutableRefObject<HTMLDivElement | null> | undefined
  viewContainerBox: MutableRefObject<HTMLDivElement | null> | null
  overlayHeight: number
}

export const initialState: ImageViewerScrollState = {
  selectedPage: null,
  setSelectedPage: () => {},
  thumbOverlay: undefined,
  thumbsImages: undefined,
  thumbsScrollBox: undefined,
  fullsizeImages: null,
  fullsizeScrollBox: undefined,
  viewContainerBox: null,
  overlayHeight: 0,
}

export const ImageViewerContext =
  createContext<ImageViewerScrollState>(initialState)

type Props = {
  children: React.ReactNode
}

export const ImageViewerProvider = ({ children }: Props) => {
  const [selectedPage, setSelectedPage] = useState<ImagePage | null>(null)

  const thumbOverlay = useRef<HTMLDivElement>()
  const fullsizeScrollBox = useRef<HTMLDivElement>()
  const thumbsScrollBox = useRef<HTMLDivElement>(null)
  const { boundingRef: fullsizeImages, boundingRect: fullsizeImagesRect } =
    useResizeObserver()

  const { boundingRef: thumbsImages } = useResizeObserver()

  const { boundingRef: viewContainerBox, boundingRect: viewContainerBoxRect } =
    useResizeObserver()

  useNestedScroll({
    thumbOverlay: thumbOverlay?.current,
    thumbImages: thumbsImages?.current,
    thumbScrollBox: thumbsScrollBox?.current,
    fullsizeImages: fullsizeImages?.current,
    fullsizeScrollBox: fullsizeScrollBox?.current,
  })

  const overlayHeight = useMemo(() => {
    const height =
      viewContainerBoxRect && fullsizeImagesRect
        ? getPercentHeight(viewContainerBoxRect, fullsizeImagesRect)
        : 0

    return height
  }, [fullsizeImagesRect, viewContainerBoxRect])

  return (
    <ImageViewerContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
        thumbOverlay,
        thumbsImages,
        thumbsScrollBox,
        fullsizeImages,
        fullsizeScrollBox,
        viewContainerBox,
        overlayHeight,
      }}
    >
      {children}
    </ImageViewerContext.Provider>
  )
}
