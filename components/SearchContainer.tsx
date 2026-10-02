import {StyleSheet, View} from 'react-native';
import FormRow from './FormRow';
import {useTranslation} from 'react-i18next';
import {colors} from '../theme/colors';
import {
  useAllBooksContext,
  SearchField,
  SearchText,
} from '../screens/SearchScreen';
import {useEffect, useRef} from 'react';

function SearchContainer() {
  const {t} = useTranslation('addBook');
  const {handleSearch, searchParams, setSearchParams} = useAllBooksContext();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleTextChange(field: SearchField, enteredValue: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const updatedParams: SearchText = {
      ...searchParams,
      [field]: enteredValue,
    };

    setSearchParams(updatedParams);

    timeoutRef.current = setTimeout(() => {
      handleSearch(updatedParams);
    }, 400);
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputRow}>
        <FormRow
          labelText={t('título')}
          type='default'
          maxLength={30}
          onChangeText={(enteredText) => handleTextChange('title', enteredText)}
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.larger1}
          value={searchParams.title || ''}
        />
        <FormRow
          labelText={t('autor/a')}
          type='default'
          maxLength={30}
          onChangeText={(enteredText) =>
            handleTextChange('authors', enteredText)
          }
          autoCorrect={false}
          autoCapitalize='none'
          value={searchParams.authors || ''}
        />
      </View>
      <View style={styles.inputRow}>
        <FormRow
          labelText={t('autor / autora espiritual')}
          type='default'
          maxLength={20}
          onChangeText={(enteredText) =>
            handleTextChange('spiritualAuthors', enteredText)
          }
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.larger}
          value={searchParams.spiritualAuthors || ''}
        />
        <FormRow
          labelText={t('ano publicação')}
          type='decimal-pad'
          maxLength={4}
          onChangeText={(enteredText) =>
            handleTextChange('publishedYear', enteredText)
          }
          autoCorrect={false}
          autoCapitalize='none'
          value={searchParams.publishedYear || ''}
        />
      </View>
    </View>
  );
}
export default SearchContainer;

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 8,
    marginBottom: 4,
    borderWidth: 1,
    marginTop: 6,
    borderColor: colors.primary[100],
    borderRadius: 5,
    padding: 2,
  },
  row: {
    textTransform: 'capitalize',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  larger: {
    flex: 3,
  },
  larger1: {
    flex: 1.2,
  },
});
