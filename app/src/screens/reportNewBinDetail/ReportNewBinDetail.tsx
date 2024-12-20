import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import CancelSvg from 'assets/images/CancelSvg';
import LocationSvg from 'assets/images/LocationSvg';
import {Palette} from 'constants/palette';
import useMediaPermissions from 'hooks/useMediaPermissions';
import {useEffect, useState} from 'react';
import {Alert, Linking, Platform, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as S from 'screens/reportNewBinDetail/ReportNewBinDetail.style';
import {RESULTS} from 'react-native-permissions';
import RemoveImageSvg from 'assets/images/RemoveImageSvg';

type ReportNewBinProps = {
  route: RouteProp<RootReportNewBinParamList, 'ReportNewBinDetail'>;
};

export default function ReportNewBinDetail({route}: ReportNewBinProps) {
  const {address, coordinate} = route.params;
  const navigation = useNavigation<NavigationProp<RootReportNewBinParamList>>();
  const navigation2 = useNavigation<NavigationProp<RootHomeParamList>>();
  const {checkCameraPermission, requestCameraPermission} = useMediaPermissions();
  const binTypeLabel = ['Trash', 'Recycling'];
  const locationDetailLabel = ['Subway Entrance', 'Bus/Taxi Stop', 'Roadside', 'Square/Park', 'Other'];
  const [selectedBinTypeLabel, setSelectedBinTypeLabel] = useState<number>(-1);
  const [selectedLocationDetailLabel, setSelectedLocationDetailLabel] = useState<number>(-1);
  const placeholder = `In front of a store (e.g. Olive Young) or by the bus stop? More details will help fellow wanderers!`;
  const [content, setContent] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUploadImage = async () => {
    try {
      // 먼저 현재 권한 상태를 체크
      const currentPermission = await checkCameraPermission();
      console.log('Current permission in handler:', currentPermission);

      if (currentPermission !== RESULTS.GRANTED) {
        console.log('Permission not granted, requesting...');
        const result = await requestCameraPermission();
        console.log('Permission request result in handler:', result);

        if (result !== RESULTS.GRANTED) {
          console.log('Permission denied by user');
          Alert.alert('Permission Required', 'Camera access is required to take photos. Please enable it in your device settings.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]);
          return;
        }
      }

      console.log('Permission granted, proceeding with camera...');
      await uploadByCamera();
    } catch (error) {
      console.error('Error in handleUploadImage:', error);
      Alert.alert('Error', 'Failed to handle image upload.');
    }
  };

  const getImageUrl = async () => {
    try {
      const response = await api.get('/image-url');
      if (response.data.success) {
        return response.data.data.image_url;
      } else {
        console.log('Error fetching presigned URL:');
        return null;
      }
    } catch (error) {
      console.log('Error fetching presigned URL:', error);
      return null;
    }
  };

  const uploadByCamera = async () => {
    const image = await ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (image) {
      uploadImageToS3(image);
    }
  };

  const uploadImageToS3 = async (image: any) => {
    const presignedUrl = await getImageUrl();
    console.log(presignedUrl);
    if (!presignedUrl) {
      return;
    }

    try {
      const imagePath = Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path;

      // react-native-blob-util을 사용하여 파일 업로드
      const response = await ReactNativeBlobUtil.fetch(
        'PUT',
        presignedUrl,
        {
          'Content-Type': image.mime,
        },
        ReactNativeBlobUtil.wrap(imagePath),
      );

      if (response.respInfo.status === 200) {
        console.log('Image uploaded successfully');
        setImageUrl(presignedUrl); // 업로드 후 URL을 state에 저장
      } else {
        console.error('Failed to upload image');
        Alert.alert('Error', 'Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData: any = {
        address: address,
        lat: coordinate![0],
        lng: coordinate![1],
        detail: content,
        type_no: selectedBinTypeLabel === 0 ? 1 : 2,
        location_type_no: selectedLocationDetailLabel + 1,
      };
  
      if (imageUrl) {
        requestData.image = imageUrl; // imageUrl이 있을 때만 추가
      }

      console.log(requestData);
  
      const response = await api.post(`/bin/new`, requestData);

      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Thank you for letting us know!',
          position: 'bottom',
          bottomOffset: 100,
          visibilityTime: 2000,
        });
        navigation2.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to submit. Please try again later.',
          position: 'bottom',
          bottomOffset: 100,
          visibilityTime: 2000,
        });
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to submit. Please try again later.',
        position: 'bottom',
        bottomOffset: 100,
        visibilityTime: 2000,
      });
    }
  };

  useEffect(() => {
    if (selectedBinTypeLabel !== -1 && selectedLocationDetailLabel !== -1) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }, [selectedBinTypeLabel, selectedLocationDetailLabel]);

  return (
    <S.Container>
      <S.ArrowPrevWrapper onPress={() => navigation.goBack()}>
        <CancelSvg width="24" height="24" fill={Palette.Gray4} />
      </S.ArrowPrevWrapper>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 30}}>
        <S.LocationWrapper>
          <LocationSvg width="24" height="24" fill={Palette.Primary} />
          <S.LocationText>{address}</S.LocationText>
        </S.LocationWrapper>
        <S.Title>{`Tell us more about the bin\nyou found`}</S.Title>
        <S.SubTitle>Bin type</S.SubTitle>
        <S.SelectWrapper style={{marginBottom: 24}}>
          {binTypeLabel.map((item, index) => (
            <S.SelectItem key={index} isSelected={selectedBinTypeLabel === index} onPress={() => setSelectedBinTypeLabel(index)}>
              <S.TextSelectItem isSelected={selectedBinTypeLabel === index}>{item}</S.TextSelectItem>
            </S.SelectItem>
          ))}
        </S.SelectWrapper>
        <S.SubTitle>Location details</S.SubTitle>
        <S.SelectWrapper>
          {locationDetailLabel.map((item, index) => (
            <S.SelectItem key={index} isSelected={selectedLocationDetailLabel === index} onPress={() => setSelectedLocationDetailLabel(index)}>
              <S.TextSelectItem isSelected={selectedLocationDetailLabel === index}>{item}</S.TextSelectItem>
            </S.SelectItem>
          ))}
        </S.SelectWrapper>
        <S.ReviewInput
          value={content}
          onChangeText={setContent}
          placeholder={placeholder}
          placeholderTextColor={Palette.Gray4}
          multiline
          textAlignVertical="top"
        />
        {imageUrl ? (
          <S.ImageContainer>
            <S.AttachedImage source={{uri: imageUrl}} resizeMode="cover" />
            <S.BtnRemoveImage onPress={() => setImageUrl(null)}>
              <RemoveImageSvg width="20" height="20" />
            </S.BtnRemoveImage>
          </S.ImageContainer>
        ) : (
          <S.AddPicture onPress={handleUploadImage}>
            <S.IconAddPicture source={require('assets/images/AddImage.png')} />
            <S.SubTitle style={{textAlign: 'center', marginBottom: 0}}>Upload a photo of the bin (Optional)</S.SubTitle>
            <S.TextB3>You can upload only one photo!</S.TextB3>
          </S.AddPicture>
        )}
      </ScrollView>
      <S.Button disabled={!isValid} isValid={isValid} onPress={handleSubmit}>
        <S.ButtonText isValid={isValid}>Submit</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
