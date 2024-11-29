import * as S from 'components/modalVerifyVisit/ModalVerifyVisit.style';
import {Image} from 'react-native';
import analytics from '@react-native-firebase/analytics';

interface Props {
  handleReportIssue: () => void;
  handleStampModal: () => void;
}

export default function ModalFailed({handleReportIssue, handleStampModal}: Props) {
  const handleSkipReportIssue = () => {
    /* 오류제보 x 로깅 */
    analytics().logEvent('is_report_issue', {
      timestamp: new Date().toISOString(),
      result: false
    });
    handleStampModal();
  }

  return (
    <S.Background>
      <S.Container>
        <S.Title>Couldn’t find the bin?</S.Title>
        <Image source={require('assets/images/img-verify-failed.png')} style={{width: 143, height: 152, marginTop: 10}} />
        <S.TextB1>Report the issue and we’ll update.</S.TextB1>
        <S.Button isPrimary style={{marginBottom: 10}} onPress={handleReportIssue}>
          <S.ButtonText isPrimary>Report issue</S.ButtonText>
        </S.Button>
        <S.Button onPress={handleSkipReportIssue}>
          <S.ButtonText>Maybe next time</S.ButtonText>
        </S.Button>
      </S.Container>
    </S.Background>
  );
}
