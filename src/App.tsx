import { Container } from "@mui/system"
import dummydata from "./Gallery/dummyData"
import Gallery from "./Gallery"
import { ImageViewerProvider } from "./Gallery/context/ImageViewerProvider"

function App() {
  return (
    <Container maxWidth={"md"} style={{ height: "100%" }}>
      <ImageViewerProvider>
        <Gallery pages={dummydata} />
      </ImageViewerProvider>
    </Container>
  )
}

export default App
