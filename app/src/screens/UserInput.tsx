import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import CountryInput from 'components/userInput/CountryInput';
import NameInput from 'components/userInput/NameInput';
import {useState} from 'react';
import {Alert} from 'react-native';

type UserInputProps = {
  route: RouteProp<RootStackParamList, 'UserInput'>;
};

export default function UserInput({route}: UserInputProps) {
  const { id_token } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<'name' | 'country'>('name');
  const [name, setName] = useState<string>('');

  const handleSubmit = async (value: string) => {
    try {
      const response = await api.put('/user', {
        user_name: name,
        nationality: value,
      });

      if (response.status === 200) {
        // 회원가입 성공 시 로그인 정보 저장
        await AsyncStorage.setItem('authToken', id_token);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomNavigator'}],
          }),
        );
      } else {
        console.log('회원정보 등록 실패');
      }
    } catch (error) {
      Alert.alert('에러 발생', `${error}`);
    }
  };

  return (
    <>
      {step === 'name' && (
        <NameInput
          onNext={value => {
            setName(value);
            setStep('country');
          }}
        />
      )}
      {step === 'country' && <CountryInput onNext={handleSubmit} />}
    </>
  );
}
