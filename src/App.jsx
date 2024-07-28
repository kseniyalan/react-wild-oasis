import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Button>Check in</Button>
        <Button>Check out</Button>
        <Heading as="h3">Forms</Heading>
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
