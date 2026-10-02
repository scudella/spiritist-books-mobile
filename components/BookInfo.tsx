import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import {ComponentProps} from 'react';

type BookInfoProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label?: string;
  text?: string;
};

const BookInfo = ({icon, label, text}: BookInfoProps) => {
  return (
    <View style={styles.container}>
      <Ionicons style={styles.bookIcon} name={icon} color='white' size={16} />
      {label && <Text style={styles.bookLabel}>{label}</Text>}
      {text && <Text style={styles.bookText}>{text}</Text>}
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
    marginRight: 16,
    alignItems: 'center',
    color: colors.secondary[500],
  },
  bookLabel: {
    textTransform: 'capitalize',
    letterSpacing: 1,
    padding: 2,
    paddingRight: 8,
    fontSize: 14,
    marginRight: 4,
    color: colors.primary[600],
  },
  bookText: {
    letterSpacing: 1,
    fontSize: 12,
    color: colors.secondary[300],
  },
});
