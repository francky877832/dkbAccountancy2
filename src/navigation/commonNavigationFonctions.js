import { Easing } from "react-native";

export const annimatedStackTransition = (layoutWidthOutputRatio, openAnimationTime, closeAnimationTime) => {
    return {
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          const progress = current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width * layoutWidthOutputRatio, 0], // Ajuste la vitesse de défilement
            extrapolate: 'clamp',
          });

          return {
            cardStyle: {
              transform: [
                {
                  translateX: progress,
                },
              ],
            },
          };
        },
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
                duration: openAnimationTime, // Durée de l'animation en millisecondes
                //easing: Easing.inOut(Easing.ease),
            },
          },
          close: {
            animation: 'timing',
            config: {
                duration: closeAnimationTime, // Durée de l'animation en millisecondes
                //easing: Easing.inOut(Easing.ease),
            },
          },
        },
      }
}