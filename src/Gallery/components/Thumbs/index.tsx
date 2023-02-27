import { useCallback, useContext } from "react"

import { Box } from "@mui/material"

import Thumb from "./Thumb"
import SBoxThumbOverlay from "./ThumbOverlay"
import { ImagePage } from "../../types"
import { ImageViewerContext } from "../../context/ImageViewerProvider"

type Props = {
  pages: Array<ImagePage>
}

const Thumbs = ({ pages }: Props) => {
  const {
    thumbsImages,
    thumbsScrollBox,
    thumbOverlay,
    overlayHeight,
    setSelectedPage,
  } = useContext(ImageViewerContext)

  const handleClickThumb = useCallback(
    (page: ImagePage) => () => {
      setSelectedPage(page)
    },
    [setSelectedPage]
  )

  return (
    <Box maxHeight='100%' overflow='auto' maxWidth={100} ref={thumbsScrollBox}>
      <Box style={{ maxWidth: 100, marginRight: 6 }} ref={thumbsImages}>
        <Box position='relative'>
          <SBoxThumbOverlay
            top={0}
            height={overlayHeight || 0}
            sx={{
              cursor: "grab",
            }}
            ref={thumbOverlay}
          />
          {pages.map((page) => (
            <Thumb
              key={page.key}
              onClickThumb={handleClickThumb(page)}
              thumbUrl={page.thumbUrl}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Thumbs
