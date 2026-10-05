import {Host, HorizontalMultiBrowseCarousel} from '@expo/ui/jetpack-compose';
import BookThumbnail from './BookThumbnail';

type MultiBrowseProps = {
  thumbs: string[];
};

export default function MultiBrowse({thumbs}: MultiBrowseProps) {
  return (
    <Host matchContents={{vertical: true}} style={{width: '100%'}}>
      <HorizontalMultiBrowseCarousel
        preferredItemWidth={100}
        itemSpacing={4}
        flingBehavior='singleAdvance'
      >
        {thumbs.map((thumb, index) => (
          <BookThumbnail key={index} src={thumb} />
        ))}
      </HorizontalMultiBrowseCarousel>
    </Host>
  );
}
