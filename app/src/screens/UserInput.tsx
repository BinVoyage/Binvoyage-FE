import CountryInput from 'components/userInput/CountryInput';
import NameInput from 'components/userInput/NameInput';
import {useState} from 'react';

export default function UserInput() {
  const [step, setStep] = useState<'name' | 'country'>('name');
  return (
    <>
      {step === 'name' && <NameInput onNext={() => setStep('country')} />}
      {step === 'country' && <CountryInput />}
    </>
  );
}
