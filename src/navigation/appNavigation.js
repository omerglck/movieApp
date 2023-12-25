import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './tabNavigation.js';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};
