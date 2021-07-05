import { Container } from "@chakra-ui/react"
import SortingVisualizer from './components/SortingVisualizer';
import Header from "./components/Header"

function App() {
  return (

    <Container position={"relative"} maxW="container.lg" height={"100%"} centerContent >
      <Header />
      <SortingVisualizer></SortingVisualizer>
    </Container>
  );
}

export default App;
