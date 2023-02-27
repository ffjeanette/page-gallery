import { useContext } from "react"

import { Box } from "@mui/material"

import { ImageViewerContext } from "../../context/ImageViewerProvider"
import MainPreview from "../MainPreview"
import Thumbs from "../Thumbs"
import { ImagePage } from "../../types"

type Props = {
  pages: Array<ImagePage>
}

const ImagePreview = ({ pages }: Props) => {
  const { viewContainerBox } = useContext(ImageViewerContext)

  return (
    <Box
      style={{
        height: "100%",
        maxHeight: "100%",
      }}
    >
      <Box
        style={{
          height: "100%",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          pl={2}
          flex='1 1 auto'
          style={{
            overflowY: "hidden",
          }}
        >
          <Box maxHeight='100%' height='100%' ref={viewContainerBox}>
            <Box
              display='grid'
              columnGap='8px'
              gridTemplateColumns='auto auto'
              gridTemplateRows='100%'
              maxHeight='100%'
              height='100%'
            >
              <Thumbs pages={pages} />
              <MainPreview pages={pages} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ImagePreview
