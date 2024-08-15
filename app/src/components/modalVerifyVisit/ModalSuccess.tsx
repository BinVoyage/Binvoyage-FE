import api from 'api/api';
import * as S from 'components/modalVerifyVisit/ModalVerifyVisit.style';
import {Palette} from 'constants/palette';
import {useState} from 'react';
import {Alert, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {
  bin_id: number;
  address: string;
  coordinate: [number, number];
  handleStampModal: (isVisit: boolean) => void;
}

export default function ModalSuccess({bin_id, address, coordinate, handleStampModal}: Props) {
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const placeholder = `Got any tips for finding this bin?\nFeel like leaving a comment?`;
  const [content, setContent] = useState<string>('');

  const handleReviewMode = async () => {
    try {
      const response = await api.post(`/bin/visit/${bin_id}`, {
        lat: 37.563685889,
        lng: 126.975584404,
        is_visit: true,
      });
      if (response.data.success) {
        setReviewMode(true);
      } else {
        Alert.alert('실패 ㅜㅜ');
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 403 || statusCode === 404) {
          Alert.alert('에러 발생', `${error.message}`);
          console.log('로그인이 필요합니다.' + statusCode);
        } else if (statusCode === 400) {
          console.log('방문인증을 이미 하셨습니다.');
        }
      } else {
        Alert.alert('에러 발생', `${error.message}`);
      }
    }
  };

  const handleSubmit = async () => {
    if (content.length >= 5) {
      try {
        const response = await api.post('/bin/feedback', {
          bin_id,
          content,
        });

        if (response.data.success) {
          Toast.show({
            type: 'success',
            text1: 'Thank you for letting us know!',
            position: 'bottom',
            bottomOffset: 100,
            visibilityTime: 2000,
          });
          handleStampModal(true);
        } else {
          Alert.alert('실패 ㅜㅜ');
        }
      } catch (error) {
        Alert.alert(`${error}`);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
      <S.Background>
        <S.Container>
          <S.Title>{reviewMode ? 'Share your BinVoyage!' : 'Well done, OO!'}</S.Title>
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
              <S.Button onPress={() => handleStampModal(true)}>
                <S.ButtonText>Cancel</S.ButtonText>
              </S.Button>
            </>
          ) : (
            <>
              <S.Button isPrimary onPress={handleReviewMode} style={{marginBottom: 10}}>
                <S.ButtonText isPrimary> Sure! This bin is...</S.ButtonText>
              </S.Button>
              <S.Button onPress={() => handleStampModal(true)}>
                <S.ButtonText>Nope! Don’t bug me!</S.ButtonText>
              </S.Button>
            </>
          )}
        </S.Container>
      </S.Background>
    </TouchableWithoutFeedback>
  );
}
