import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {colors} from '../theme/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import {ComponentProps} from 'react';

type BookInfoProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label?: string;
  text?: string;
  iconStyle?: TextStyle;
  labelStyle?: TextStyle;
};

const BookInfo = ({
  icon,
  label,
  text,
  iconStyle,
  labelStyle,
}: BookInfoProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        style={[styles.bookIcon, iconStyle]}
        name={icon}
        color='white'
        size={16}
      />
      {label && <Text style={[styles.bookLabel, labelStyle]}>{label}</Text>}
      <View style={styles.column}>
        {text && <Text style={styles.bookText}>{text}</Text>}
      </View>
    </View>
  );
};
export default BookInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookIcon: {
    marginRight: 6,
    alignItems: 'center',
    color: colors.secondary[500],
  },
  bookLabel: {
    textTransform: 'capitalize',
    letterSpacing: 1,
    padding: 2,
    paddingRight: 8,
    fontSize: 14,
    color: colors.primary[600],
  },
  bookText: {
    letterSpacing: 1,
    fontSize: 12,
    color: colors.secondary[300],
  },
  column: {
    flex: 1,
  },
});
