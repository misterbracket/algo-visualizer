import { Container } from "@chakra-ui/react"
import SortingVisualizer from './components/SortingVisualizer';

function App() {
  return (
    <Container maxW="container.lg" height={"100%"} centerContent >
      <SortingVisualizer></SortingVisualizer>
    </Container>
  );
}

export default App;
