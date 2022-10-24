import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ duration = 1500, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View
      style={[
        {
          ...props.style,

          // Bind opacity to animated value
          opacity: fadeAnim,
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};
