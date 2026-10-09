import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import BookInfo from './BookInfo';
import {useTranslation} from 'react-i18next';
import {colors} from '../theme/colors';

type BookProps = {
  index: string;
  title: string;
  authors: string[];
  spiritualAuthors: string;
  currentPublisher: string;
  publishedYear: string;
  cover: string;
};

const Book = ({
  index,
  title,
  authors,
  spiritualAuthors,
  currentPublisher,
  publishedYear,
  cover,
}: BookProps) => {
  const {t} = useTranslation('book');

  return (
    <View style={styles.rootContainer}>
      <View style={styles.header}>
        {cover ? (
          <View style={styles.imageContainer}>
            <Image source={{uri: cover}} style={styles.image} />
          </View>
        ) : (
          <View>
            <Text style={styles.mainIcon}>{authors[0].charAt(0)}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>{title}</Text>
          <Text style={styles.infoText}>{authors.join(', ')}</Text>
        </View>
      </View>
      <View style={styles.horizontalSeparator}></View>
      <View style={styles.content}>
        <View style={styles.contentCenter}>
          <View style={styles.infoContainer}>
            <BookInfo
              icon='book-outline'
              label={currentPublisher}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.infoContainer2}>
            <BookInfo
              icon='calendar'
              label={publishedYear}
              iconStyle={styles.iconStyle}
              labelStyle={styles.labelStyle}
            />
          </View>
        </View>
        <View style={styles.contentCenter}>
          <View style={styles.infoContainer}>
            <BookInfo
              icon='shield-checkmark'
              label={
                spiritualAuthors.length === 1
                  ? t('Autor(a) Espiritual')
                  : t('Autores Espirituais')
              }
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.infoContainer2}>
            {spiritualAuthors.length > 0 && (
              <BookInfo
                icon='star-outline'
                iconStyle={styles.iconStyle}
                text={
                  spiritualAuthors.length === 1
                    ? spiritualAuthors
                    : t('Espíritos Diversos')
                }
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Book;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#3f3f3f',
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 16,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalSeparator: {
    width: '90%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
    marginTop: 6,
    alignSelf: 'center',
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    borderRadius: 6,
    width: 40,
    height: 45,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mainIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary[500],
    borderRadius: 6,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    marginRight: 16,
    textAlign: 'center',
    paddingTop: 12,
  },
  infoTitle: {
    marginBottom: 8,
    color: colors.primary[300],
  },
  infoText: {
    letterSpacing: 1,
    color: colors.secondary[300],
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  contentCenter: {
    marginTop: 10,
    flexDirection: 'row',
    rowGap: 24,
  },
  infoContainer: {
    flex: 1,
  },
  infoContainer2: {
    flex: 0.9,
  },
  labelStyle: {
    color: colors.primary['300'],
    textTransform: 'none',
  },
  iconStyle: {
    marginLeft: 4,
  },
});
