import React from 'react';
import {AppNavigation} from './src/navigation/appNavigation';
import {AppProvider} from './src/providers/AppProvider';

export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}
