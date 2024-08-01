import * as S from 'components/reviewItem/ReviewItem.style';
import SirenSvg from 'assets/images/SirenSvg';
import {Palette} from 'constants/palette';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  date: string;
  author: string;
  content: string;
  isLast: boolean;
  feedbackId: number;
}

export default function ReviewItem({date, author, content, feedbackId, isLast}: Props) {
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();

  return (
    <S.Container isLast={isLast}>
      <S.RowWrapper>
        <S.TextDate>{date}</S.TextDate>
        <TouchableOpacity onPress={() => navigation.navigate('ReportFeedback', {date, author, content, feedbackId})}>
          <SirenSvg width="18" height="18" fill={Palette.Gray4} />
        </TouchableOpacity>
      </S.RowWrapper>
      <S.TextAuthor>{author}</S.TextAuthor>
      <S.TextContent>{content}</S.TextContent>
    </S.Container>
  );
}
