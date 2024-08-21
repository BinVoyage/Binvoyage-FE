import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowDownSvg from 'assets/images/ArrowDownSvg';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import BinSvg from 'assets/images/BinSvg';
import FootPrintSvg from 'assets/images/FootPrintSvg';
import ModalOpenMap from 'components/modalOpenMap/ModalOpenMap';
import ReviewItem from 'components/reviewItem/ReviewItem';
import {Palette} from 'constants/palette';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as S from 'screens/binDetail/BinDetail.style';
import {mapStore} from 'store/Store';
import {formatDate} from 'utils/formatDate';

type BinDetailProps = {
  route: RouteProp<RootBinDetailParamList, 'BinDetail'>;
};

export default function BinDetail({route}: BinDetailProps) {
  const {bin_id} = route.params;
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();
  const [binData, setBinData] = useState<BinDetail | null>(null);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentLocation = mapStore(state => state.currentPosition);

  const [labelText, setLabelText] = useState<string>('');

  const lableTextData = [
    'Most users found this bin!',
    'Some users found this bin!',
    'May not always be found here',
    'No visitors came here recently',
  ];

  useEffect(() => {
    const getBinData = async () => {
      try {
        // const response = await api.get<BinDetailResponse>(`/bin/search/${bin_id}`);
        const response = await api.get<BinDetailResponse>(`/bin/search/${bin_id}?lat=${currentLocation?.latitude}&lng=${currentLocation?.longitude}`);
        setBinData(response.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    const getFeedbackData = async () => {
      try {
        const response = await api.get(`/bin/feedback/${bin_id}`);
        setFeedbackList(response.data.data.feedback_list);
      } catch (error) {
        console.error('4.' + error);
      }
    };

    getBinData();
    getFeedbackData();
  }, []);

  useEffect(() => {
    if (binData) {
      if (!binData.success_count) {
        setLabelText(lableTextData[3]);
        return;
      }
      const successRate = (binData.success_count / (binData.success_count + binData.fail_count)) * 100;
      if (successRate >= 70) {
        setLabelText(lableTextData[0]);
      } else if (successRate >= 40) {
        setLabelText(lableTextData[1]);
      } else {
        setLabelText(lableTextData[2]);
      }
    }
  }, [binData]);

  return (
    <>
      <S.Container>
        <S.ArrowDownWrapper onPress={() => navigation.goBack()}>
          <ArrowDownSvg width="24" height="24" fill={Palette.Gray4} />
        </S.ArrowDownWrapper>
        <ScrollView bounces={false} style={{flex: 1, backgroundColor: Palette.Gray1}}>
          <S.TopContainer>
            <S.TopLabel>
              <S.TopLabelText>{labelText}</S.TopLabelText>
            </S.TopLabel>
            <S.Title>{binData?.address}</S.Title>
            <S.RowWrapper style={{justifyContent: 'space-between'}}>
              <S.RowWrapper>
                <S.RowWrapper>
                  <BinSvg width="18" height="18" fill={Palette.Gray4} />
                  <S.TextInfo1>{binData?.type_name}</S.TextInfo1>
                </S.RowWrapper>
                <S.Division />
                <S.RowWrapper>
                  <FootPrintSvg width="24" height="24" fill={Palette.Gray4} />
                  {binData?.distance ? <S.TextInfo1>{Math.round(binData.distance)}m</S.TextInfo1> : <S.TextInfo1>isLoading...</S.TextInfo1>}
                </S.RowWrapper>
              </S.RowWrapper>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReportWrongInfo', {
                    bin_id: binData?.bin_id ?? -1,
                    type_name: binData?.type_name ?? '',
                    location_type_name: binData?.location_type_name ?? '',
                    address: binData?.address ?? '',
                    detail: binData?.detail ?? '',
                    image: binData?.image ?? '',
                    isVerifyVisit: false,
                  })
                }>
                <S.RowWrapper>
                  <S.TextWrongInfo>Wrong Info?</S.TextWrongInfo>
                  <ArrowNextSvg width="14" height="14" fill={Palette.Primary} />
                </S.RowWrapper>
              </TouchableOpacity>
            </S.RowWrapper>
            {binData?.image ?? <S.ImageArea />}
          </S.TopContainer>
          <S.GrayContainer>
            <S.DetailWrapper>
              <S.RowWrapper>
                <S.TextLocationPrimary>Location details</S.TextLocationPrimary>
                <S.LabelLocation>
                  <S.LabelLocationText>{binData?.location_type_name}</S.LabelLocationText>
                </S.LabelLocation>
              </S.RowWrapper>
              <S.TextLocationContents>{binData?.detail}</S.TextLocationContents>
            </S.DetailWrapper>
            <S.DetailWrapper>
              <S.DetailTitle>{labelText}</S.DetailTitle>
              <S.VisitRecordWrapper>
                <S.VisitRecordBox>
                  <S.TextVisitNum isSuccessful>{binData?.success_count}</S.TextVisitNum>
                  <S.VisitDescription>Successful visits</S.VisitDescription>
                </S.VisitRecordBox>
                <S.VisitRecordBox>
                  <S.TextVisitNum>{binData?.fail_count}</S.TextVisitNum>
                  <S.VisitDescription>Failed visits</S.VisitDescription>
                </S.VisitRecordBox>
              </S.VisitRecordWrapper>
              {/* 최근 n개의 발견 / 실패 리스트 출력 */}
              {binData?.visit_list
                ? binData.visit_list.slice(0, 5).map((item, index) => (
                    <S.RowWrapper style={{marginBottom: 2}} key={index}>
                      <S.TextDate>{formatDate(item.visit_dt)}</S.TextDate>
                      {item.is_success ? (
                        <S.VisitDescription>
                          Someone <Text style={{color: Palette.Primary}}>found</Text> this bin
                        </S.VisitDescription>
                      ) : (
                        <S.VisitDescription>
                          Someone <Text style={{color: Palette.Secondary2}}>couldn't find</Text> this bin
                        </S.VisitDescription>
                      )}
                    </S.RowWrapper>
                  ))
                : null}
            </S.DetailWrapper>
            <S.DetailWrapper style={{paddingBottom: 0}}>
              <S.DetailTitle>
                After-visit feedback <Text style={{color: Palette.Primary}}>{feedbackList.length}</Text>
              </S.DetailTitle>
              <View style={{marginTop: 18, marginBottom: 30}}>
                {feedbackList.map((item, index) => (
                  <ReviewItem
                    key={item.feedback_id}
                    feedbackId={item.feedback_id}
                    date={formatDate(item.registration_dt)}
                    author={item.user_name}
                    content={item.content}
                    isLast={index === feedbackList.length - 1 ? true : false}
                  />
                ))}
              </View>
              <S.SeeAllWrapper
                onPress={() =>
                  navigation.navigate('FeedbackList', {
                    bin_id,
                  })
                }>
                <S.TextSeeAll>See All</S.TextSeeAll>
                <ArrowDownSvg width="24" height="24" fill={Palette.Gray4} />
              </S.SeeAllWrapper>
            </S.DetailWrapper>
          </S.GrayContainer>
        </ScrollView>
        <S.BtnContainer>
          <S.Button
            isPrimary
            onPress={() =>
              navigation.navigate('VerifyVisit', {
                bin_id: binData?.bin_id ?? -1,
                type_name: binData?.type_name ?? '',
                location_type_name: binData?.location_type_name ?? '',
                address: binData?.address ?? '',
                detail: binData?.detail ?? '',
                image: binData?.image ?? '',
                coordinate: binData?.coordinate!,
              })
            }>
            <S.ButtonText>Verify visit</S.ButtonText>
          </S.Button>
          <S.Button onPress={() => setIsModalOpen(true)}>
            <S.ButtonText>Get directions</S.ButtonText>
          </S.Button>
        </S.BtnContainer>
      </S.Container>
      {isModalOpen ? <ModalOpenMap setIsModalOpen={setIsModalOpen} label={binData?.address ?? 'Destination'} coords={binData?.coordinate} /> : null}
    </>
  );
}
