import SearchSvg from 'assets/images/SearchSvg';
import axios from 'axios';
import * as S from 'components/userInput/UserInput.style';
import {Palette} from 'constants/palette';
import React, {useEffect, useState} from 'react';
import {Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';

interface Props {
  onNext: (value: string) => void;
}

export default function CountryInput({onNext}: Props) {
  const [countries, setCountries] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data: string[] = response.data.map((country: {name: {common: string}}) => country.name.common);
        const sorted = data.sort();
        setCountries(sorted);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = countries.filter(country => country.toLowerCase().includes(search.toLowerCase()));
      setFilteredCountries(filtered);
      return;
    }
    setFilteredCountries([]);
  }, [search]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <S.Container isInputFocused={isInputFocused}>
          {isInputFocused ? null : (
            <>
              <S.Step>
                <S.StepText>2/2</S.StepText>
              </S.Step>
              <S.Title>{`Which country\ndo you call home?`}</S.Title>
              <S.Label isRequired={false}>*Optional</S.Label>
            </>
          )}

          <S.SearchBar isIos={Platform.OS === 'ios'}>
            <SearchSvg width="24" height="24" fill={Palette.Gray4} />
            <S.SearchInput
              value={search}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChangeText={value => setSearch(value)}
              placeholder="Select country"
              placeholderTextColor={Palette.Gray4}
            />
          </S.SearchBar>
          <S.SearchList
            data={filteredCountries}
            renderItem={({item}) => (
              <S.SearchListItem onPress={() => setSelected('' + item)} isSelected={'' + item === selected}>
                <S.SearchListItemText isSelected={'' + item === selected}>{'' + item}</S.SearchListItemText>
              </S.SearchListItem>
            )}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps={'handled'}
          />
          <S.Button isValid onPress={() => onNext(selected)}>
            <S.ButtonText isValid>Next</S.ButtonText>
          </S.Button>
        </S.Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
