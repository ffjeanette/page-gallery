import { Box, hexToRgb } from "@mui/material"
import { styled } from "@mui/material/styles"

export type SBoxThumbOverlayProps = {
  top: number
  height: number
}

const SBoxThumbOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== ("top" || "height"),
})<SBoxThumbOverlayProps>(({ theme, height, top }) => {
  const rgbaColor = hexToRgb(theme.palette.secondary.main)
    .replace("rgb(", "")
    .replace(")", "")

  return {
    position: "absolute",
    top: `${top}px`,
    background: `rgba(${rgbaColor}, 0.3)`,
    width: "100%",
    height: `${height}%`,
    opacity: 1,
    border: `1px solid ${theme.palette.secondary.main}`,
    zIndex: 1,
  }
})

export default SBoxThumbOverlay
