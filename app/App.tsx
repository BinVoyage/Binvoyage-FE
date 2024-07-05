import {SafeAreaView} from 'react-native';
import StackNavigator from 'components/StackNavigator';
import styled from 'styled-components';

function App(): React.JSX.Element {
  return (
    <StyledSafeAreaView>
      <StackNavigator />
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export default App;
