import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import BookInfo from './BookInfo';
import BookThumbnail from './BookThumbnail';
import {colors} from '../theme/colors';
import MultiBrowse from './MultiBrowse';

type BookProps = {
  index: string;
  title: string;
  authors: string[];
  spiritualAuthors: string[];
  originalPublisher: string;
  currentPublisher: string;
  publishedYear: string;
  copyright: string;
  yearPsychography: string[];
  isbn10: string[];
  isbn13: string[];
  originalCover: string;
  otherCover: string;
  currentCover: string;
};

const BookDetails = ({
  index,
  title,
  authors,
  spiritualAuthors,
  originalPublisher,
  currentPublisher,
  publishedYear,
  copyright,
  yearPsychography,
  isbn10,
  isbn13,
  originalCover,
  otherCover,
  currentCover,
}: BookProps) => {
  const {t} = useTranslation('book');

  const thumbs = [originalCover, currentCover && currentCover];

  const renderItem = ({item, index}: {item: string; index: number}) => {
    // Determine background color based on odd/even index
    const backgroundColor =
      index % 2 === 0 ? colors.primary['100'] : colors.primary['200'];

    return (
      <>
        <View style={[styles.spAuthors, {backgroundColor}]}>
          <BookInfo icon='star-outline' label={item} />
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.header}>
          <View>{originalCover && <BookThumbnail src={originalCover} />}</View>
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.authors}>{authors.join(', ')}</Text>
          </View>
        </View>
        <View style={styles.listSpAuthors}>
          {spiritualAuthors.length === 1 ? (
            <>
              <Text style={styles.spAuthorTitle}>
                {t('Autor(a) Espiritual')}
              </Text>
              <View style={styles.spAuthors}>
                <BookInfo icon='star-outline' label={spiritualAuthors[0]} />
              </View>
            </>
          ) : (
            <>
              <FlatList
                ListHeaderComponent={
                  <Text style={styles.spAuthorTitle}>
                    {t('Autores Espirituais')}
                  </Text>
                }
                keyExtractor={(index) => index.toString()}
                data={spiritualAuthors}
                renderItem={renderItem}
              />
            </>
          )}
        </View>
        <View style={styles.separator}></View>

        <View style={styles.content}>
          <View style={styles.contentItem}>
            <BookInfo
              icon={'book-outline'}
              label={`${t('editora atual')}`}
              text={`${currentPublisher}`}
              iconStyle={styles.label}
              labelStyle={styles.label}
            />
          </View>
          <View style={styles.contentItem}>
            <BookInfo
              icon={'book-outline'}
              label={`${t('editora original')}`}
              text={`${originalPublisher}`}
              iconStyle={styles.label}
              labelStyle={styles.label}
            />
          </View>
          <View style={styles.contentItem}>
            <BookInfo
              icon={'calendar'}
              label={`${t('ano da publicação')}`}
              text={`${publishedYear}`}
              iconStyle={styles.label}
              labelStyle={styles.label}
            />
          </View>
          <View style={styles.contentItem}>
            {yearPsychography.length > 0 && (
              <BookInfo
                icon={'calendar'}
                label={`${
                  yearPsychography.length !== 1
                    ? t('ano(s) da psicografia')
                    : t('ano da psicografia')
                }`}
                text={`${yearPsychography.join(' / ')}`}
                iconStyle={styles.label}
                labelStyle={styles.label}
              />
            )}
          </View>
          <View style={styles.contentItem}>
            <BookInfo
              icon={'calendar'}
              label={'Copyright'}
              text={`${copyright ? copyright : publishedYear}`}
              iconStyle={styles.label}
              labelStyle={styles.label}
            />
          </View>
          <View style={styles.contentItem}>
            {isbn10.length > 0 && (
              <BookInfo
                icon={'checkmark-outline'}
                label={'ISBN-10'}
                text={`${isbn10.join(` / `)}`}
                iconStyle={styles.label}
                labelStyle={styles.label}
              />
            )}
          </View>
          <View style={styles.contentItem}>
            {isbn13.length > 0 && (
              <BookInfo
                icon={'checkmark-outline'}
                label={'ISBN-13'}
                text={`${isbn13.join(' / ')}`}
                iconStyle={styles.label}
                labelStyle={styles.label}
              />
            )}
          </View>
        </View>
        <MultiBrowse thumbs={thumbs} />
      </View>
    </>
  );
};
export default BookDetails;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#3f3f3f',
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },

  header: {
    padding: 16,
    borderBottomColor: colors.secondary['300'],
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 2,
    marginLeft: 24,
    justifyContent: 'center',
  },
  title: {
    textTransform: 'none',
    color: colors.primary['400'],
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  authors: {
    fontSize: 16,
    letterSpacing: 1,
    color: colors.secondary['400'],
  },
  listSpAuthors: {
    backgroundColor: colors.primary['300'],
    paddingBottom: 10,
    maxHeight: 160,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  spAuthorTitle: {
    backgroundColor: colors.primary['300'],
    textAlign: 'center',
  },
  spAuthors: {
    paddingBottom: 2,
    paddingLeft: 30,
    backgroundColor: colors.primary['100'],
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary['300'],
  },
  content: {
    paddingVertical: 4,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: '#3f3f3f',
    borderWidth: 1,
    borderColor: colors.secondary['500'],
  },
  contentItem: {
    padding: 3,
  },
  label: {
    color: colors.primary['300'],
  },
});
