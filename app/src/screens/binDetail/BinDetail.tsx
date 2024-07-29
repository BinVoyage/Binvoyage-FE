import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from 'api/api';
import ArrowDownSvg from 'assets/images/ArrowDownSvg';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import BinSvg from 'assets/images/BinSvg';
import FootPrintSvg from 'assets/images/FootPrintSvg';
import ReviewItem from 'components/reviewItem/ReviewItem';
import {Palette} from 'constants/palette';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as S from 'screens/binDetail/BinDetail.style';
import {formatDate} from 'utils/formatDate';

export default function BinDetail() {
  const navigation = useNavigation<NavigationProp<RootBinDetailParamList>>();
  const [binData, setBinData] = useState<BinDetail | null>(null);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    const getBinData = async () => {
      try {
        const response = await api.get<BinDetailResponse>('/bin/1');
        setBinData(response.data.data);
        console.log(response.data.msg);
      } catch (error) {
        console.error(error);
      }
    };

    const getFeedBackData = async () => {
      try {
        const response = await api.get<FeedbackResponse>('/bin/feedback/1');
        setFeedbackList(response.data.data.feedback_list);
        console.log(response.data.msg);
      } catch (error) {
        console.error(error);
      }
    };

    getBinData();
    getFeedBackData();
  }, []);

  return (
    <S.Container>
      <S.ArrowDownWrapper>
        <ArrowDownSvg width="24" height="24" fill={Palette.Gray4} />
      </S.ArrowDownWrapper>
      <ScrollView bounces={false} style={{flex: 1, backgroundColor: Palette.Gray1}}>
        <S.TopContainer>
          <S.TopLabel>
            <S.TopLabelText>Most users found this bin!</S.TopLabelText>
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
                <S.TextInfo1>100m</S.TextInfo1>
              </S.RowWrapper>
            </S.RowWrapper>
            <TouchableOpacity>
              <S.RowWrapper>
                <S.TextWrongInfo>Wrong Info?</S.TextWrongInfo>
                <ArrowNextSvg width="14" height="14" fill={Palette.Primary} />
              </S.RowWrapper>
            </TouchableOpacity>
          </S.RowWrapper>
          <S.ImageArea />
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
            <S.DetailTitle>Most users found this bin last month!</S.DetailTitle>
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
                  <S.RowWrapper style={{marginBottom: 2}}>
                    <S.TextDate>{formatDate(item.visit_dt)}</S.TextDate>
                    <S.VisitDescription>
                      Someone <Text style={{color: item.is_success ? Palette.Primary : Palette.Secondary2}}>found</Text> this bin
                    </S.VisitDescription>
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
                  date={formatDate(item.registration_dt)}
                  author={item.user_name}
                  content={item.content}
                  isLast={index === feedbackList.length - 1 ? true : false}
                />
              ))}
            </View>
            <S.SeeAllWrapper onPress={() => navigation.navigate('FeedBackList')}>
              <S.TextSeeAll>See All</S.TextSeeAll>
              <ArrowDownSvg width="24" height="24" fill={Palette.Gray4} />
            </S.SeeAllWrapper>
          </S.DetailWrapper>
        </S.GrayContainer>
      </ScrollView>
      <S.BtnContainer>
        <S.Button isPrimary>
          <S.ButtonText>Verify visit</S.ButtonText>
        </S.Button>
        <S.Button>
          <S.ButtonText>Get directions</S.ButtonText>
        </S.Button>
      </S.BtnContainer>
    </S.Container>
  );
}
