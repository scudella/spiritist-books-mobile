import {
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme/colors';

type FormRowProps = {
  labelText: string;
  type: KeyboardTypeOptions;
  maxLength: number;
  onChangeText: (text: string) => void;
  autoCorrect: boolean;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
  style?: StyleProp<ViewStyle>;
  value: string | undefined;
};

function FormRow({
  labelText,
  type,
  maxLength,
  onChangeText,
  autoCorrect,
  autoCapitalize,
  style,
  value,
}: FormRowProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        style={styles.input}
        keyboardType={type}
        maxLength={maxLength}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        value={value}
        selectionColor={colors.secondary[500]}
      />
    </View>
  );
}
export default FormRow;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: colors.primary[100],
    marginBottom: 4,
    textTransform: 'capitalize',
    letterSpacing: 0.75,
  },
  input: {
    backgroundColor: colors.primary[100],
    color: colors.secondary[700],
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
