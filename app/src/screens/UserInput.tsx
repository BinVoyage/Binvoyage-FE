import { NavigationProp, useNavigation } from '@react-navigation/native';
import CountryInput from 'components/userInput/CountryInput';
import NameInput from 'components/userInput/NameInput';
import {useState} from 'react';

export default function UserInput() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<'name' | 'country'>('name');
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string | null>(null);

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
      {step === 'country' && <CountryInput onNext={value => {
        setCountry(value);
        navigation.navigate('BottomNavigator');
      }}/>}
    </>
  );
}
