import { createRef, RefObject, useContext, useEffect } from "react"

import { Box } from "@mui/material"

import Page from "./Page"
import { ImageViewerContext } from "../../context/ImageViewerProvider"
import { ImagePage } from "../../types"

type Props = {
  pages: Array<ImagePage>
}

const MainPreview = ({ pages }: Props) => {
  const { fullsizeImages, fullsizeScrollBox, selectedPage, setSelectedPage } =
    useContext(ImageViewerContext)

  const refs = pages.reduce((acc, page) => {
    const pageKey = page.key
    acc[pageKey] = createRef()
    return acc
  }, {} as { [key: string]: RefObject<HTMLElement> })

  useEffect(() => {
    if (selectedPage && refs) {
      refs[selectedPage?.key]?.current?.scrollIntoView({
        block: "start",
      })
      setSelectedPage(null)
    }
  }, [selectedPage, setSelectedPage, refs])

  return (
    <Box maxHeight='100%' overflow='auto' ref={fullsizeScrollBox}>
      <Box ref={fullsizeImages}>
        {pages.map(({ key, previewUrl }) => (
          <Page
            ref={refs[key] ? refs[key] : undefined}
            key={key}
            previewUrl={previewUrl}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MainPreview
