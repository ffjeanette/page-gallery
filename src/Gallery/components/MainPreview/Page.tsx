import { forwardRef, memo } from "react"

import Box from "@mui/material/Box"
import { ImagePage } from "../../types"

type Props = {
  previewUrl: ImagePage["previewUrl"]
}

const Page = forwardRef(({ previewUrl }: Props, ref) => {
  return (
    <Box
      ref={ref}
      m={0.5}
      mb={2}
      boxShadow={
        "0px 4px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)"
      }
    >
      <img
        style={{ display: "block" }}
        src={previewUrl}
        height='auto'
        width='100%'
        alt='A voucher'
      />
    </Box>
  )
})

export default memo(Page)
