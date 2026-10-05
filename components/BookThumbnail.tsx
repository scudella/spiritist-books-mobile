import {Image, StyleSheet, View} from 'react-native';

type BookThumbnailProps = {
  src: string;
};
const BookThumbnail = ({src}: BookThumbnailProps) => {
  return (
    <View style={styles.thumb}>
      <Image source={{uri: src}} style={styles.image} />
    </View>
  );
};
export default BookThumbnail;

const styles = StyleSheet.create({
  thumb: {
    paddingRight: 8,
  },
  image: {
    maxWidth: '100%',
    width: 72,
    height: 100,
  },
});
