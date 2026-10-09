import {Pressable, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {ComponentProps} from 'react';

type IconButtonProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  color?: string;
  size?: number;
};

function IconButton({
  icon,
  onPress,
  color = 'white',
  size = 24,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
