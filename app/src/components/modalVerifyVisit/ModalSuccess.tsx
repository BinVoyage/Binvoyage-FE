import api from 'api/api';
import * as S from 'components/modalVerifyVisit/ModalVerifyVisit.style';
import {Palette} from 'constants/palette';
import {useState} from 'react';
import {Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Toast from 'react-native-toast-message';
import {userStore} from 'store/Store';
import analytics from '@react-native-firebase/analytics';

interface Props {
  bin_id: number;
  address: string;
  coordinate: [number, number];
  handleStampModal: () => void;
  setModalSuccess: (value: boolean) => void;
}

export default function ModalSuccess({bin_id, address, handleStampModal}: Props) {
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const placeholder = `Got any tips for finding this bin?\nFeel like leaving a comment?`;
  const [content, setContent] = useState<string>('');
  const userInfo = userStore(state => state.userInfo);

  const handleSubmit = async () => {
    if (content.length >= 5) {
      try {
        const response = await api.post('/bin/feedback', {
          bin_id,
          content,
        });

        if (response.data.success) {
          analytics().logEvent('is_submit_feedback', {
            timestamp: new Date().toISOString(),
            result: true
          });

          Toast.show({
            type: 'success',
            text1: 'Thank you for letting us know!',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
          handleStampModal();
        } else {
          console.log('실패');
          Toast.show({
            type: 'error',
            text1: 'Something went wrong. Please try again later.',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
          handleStampModal();
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong. Please try again later.',
          position: 'bottom',
          bottomOffset: 100,
          visibilityTime: 2000,
        });
        handleStampModal();
      }
    }
  };

  const handleSkipFeedback = () => {
    analytics().logEvent('is_submit_feedback', {
      timestamp: new Date().toISOString(),
      result: false
    });
    handleStampModal();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
      <S.Background>
        <S.Container>
          <S.Title>{reviewMode ? 'Share your BinVoyage!' : `Well done, ${userInfo?.user_name}!`}</S.Title>
          <S.TextAddress>{address}</S.TextAddress>
          {reviewMode ? (
            <S.ReviewInput
              value={content}
              onChangeText={setContent}
              placeholder={placeholder}
              placeholderTextColor={Palette.Gray5}
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Image source={require('assets/images/img-verify-success.png')} style={{width: 208, height: 180}} />
          )}
          {reviewMode ? null : <S.TextB1>Want to leave simple feedback?</S.TextB1>}

          {reviewMode ? (
            <>
              <S.Button isPrimary={content.length >= 5} disabled={content.length < 5} onPress={handleSubmit} style={{marginBottom: 10}}>
                <S.ButtonText isPrimary={content.length >= 5}>Submit</S.ButtonText>
              </S.Button>
              <S.Button onPress={handleSkipFeedback}>
                <S.ButtonText>Cancel</S.ButtonText>
              </S.Button>
            </>
          ) : (
            <>
              <S.Button isPrimary onPress={() => setReviewMode(true)} style={{marginBottom: 10}}>
                <S.ButtonText isPrimary> Sure! This bin is...</S.ButtonText>
              </S.Button>
              <S.Button onPress={handleSkipFeedback}>
                <S.ButtonText>Nope! Don’t bug me!</S.ButtonText>
              </S.Button>
            </>
          )}
        </S.Container>
      </S.Background>
    </TouchableWithoutFeedback>
  );
}
