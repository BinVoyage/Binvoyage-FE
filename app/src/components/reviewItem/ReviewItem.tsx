import * as S from 'components/reviewItem/ReviewItem.style';
import SirenSvg from 'assets/images/SirenSvg';
import {Palette} from 'constants/palette';
import {TouchableOpacity} from 'react-native';

interface Props {
  date: string;
  author: string;
  content: string;
  isLast: boolean;
}

export default function ReviewItem({date, author, content, isLast}: Props) {
  return (
    <S.Container isLast={isLast}>
      <S.RowWrapper>
        <S.TextDate>{date}</S.TextDate>
        <TouchableOpacity>
          <SirenSvg width="18" height="18" fill={Palette.Gray4} />
        </TouchableOpacity>
      </S.RowWrapper>
      <S.TextAuthor>{author}</S.TextAuthor>
      <S.TextContent>{content}</S.TextContent>
    </S.Container>
  );
}
