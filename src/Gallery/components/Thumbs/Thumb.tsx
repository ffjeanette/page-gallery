import { memo } from "react"

import { Box } from "@mui/system"

type Props = {
  thumbUrl: string
  onClickThumb: () => void
}

const Thumb = ({ thumbUrl, onClickThumb }: Props) => {
  return (
    <Box
      position='relative'
      display='flex'
      border='1px solid'
      borderColor='divider'
      marginBottom={0.5}
      width='100%'
      onClick={() => onClickThumb && onClickThumb()}
    >
      <img
        style={{ maxWidth: "100%" }}
        width='100%'
        src={thumbUrl}
        alt='A voucher page thumbnail'
      />
    </Box>
  )
}

export default memo(Thumb)
