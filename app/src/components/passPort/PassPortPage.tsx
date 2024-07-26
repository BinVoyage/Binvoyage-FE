import * as S from 'components/passPort/PassPortPage.style';

interface Props {
  stampList: any[];
}

export default function PassPortPage({stampList}: Props) {
  return <S.Container>
    {stampList.map((stamp) => <S.StampWrapper key={stamp.id} source={require('assets/images/img_stamp_0.png')} resizeMode='contain'/>)}
  </S.Container>;
}
