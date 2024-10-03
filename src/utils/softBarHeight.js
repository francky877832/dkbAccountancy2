import React from 'react';
import { Dimensions, StatusBar, View, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


  const insets = useSafeAreaInsets();
const WINDOW_HEIGHT = Dimensions.get('window').height;

  // Calculez la hauteur de la barre de navigation virtuelle
  export const BOTTOM_NAV_BAR_HEIGHT = WINDOW_HEIGHT - (Dimensions.get('screen').height - insets.bottom - (StatusBar.currentHeight || 0));


