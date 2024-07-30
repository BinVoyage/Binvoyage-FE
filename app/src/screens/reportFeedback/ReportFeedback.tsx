import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import ArrowPrevSvg from 'assets/images/ArrowPrevSvg'
import { Palette } from 'constants/palette'
import * as S from 'screens/reportFeedback/ReportFeedback.style'

type ReportFeedbackProps = {
  route: RouteProp<RootBinDetailParamList, 'ReportFeedback'>;
};

export default function ReportFeedback({route}: ReportFeedbackProps) {
  const { date, author, content } = route.params;
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();

  return <S.Container>
    <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
      <ArrowPrevSvg width='24' height='24' fill={Palette.Gray4}/>
    </S.ArrowPrevWrapper>
  </S.Container>
}