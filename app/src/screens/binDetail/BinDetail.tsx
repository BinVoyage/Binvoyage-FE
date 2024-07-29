import ArrowDownSvg from 'assets/images/ArrowDownSvg';
import ArrowNextSvg from 'assets/images/ArrowNextSvg';
import BinSvg from 'assets/images/BinSvg';
import FootPrintSvg from 'assets/images/FootPrintSvg';
import ReviewItem from 'components/reviewItem/ReviewItem';
import {Palette} from 'constants/palette';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as S from 'screens/binDetail/BinDetail.style';

const dummyReviews = [
  {id: 0, date: '2024-07-29', author: 'sunho', content: 'hihihihihihihihihihih'},
  {id: 1, date: '2024-07-28', author: 'lee', content: 'hihihihihihihihihihih'},
];

export default function BinDetail() {
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
          <S.Title>서울 성북구 창경궁로43길 17 지상1층</S.Title>
          <S.RowWrapper style={{justifyContent: 'space-between'}}>
            <S.RowWrapper>
              <S.RowWrapper>
                <BinSvg width="18" height="18" fill={Palette.Gray4} />
                <S.TextInfo1>Trash</S.TextInfo1>
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
                <S.LabelLocationText>Subway Entrance</S.LabelLocationText>
              </S.LabelLocation>
            </S.RowWrapper>
            <S.TextLocationContents>Near the bus stop</S.TextLocationContents>
          </S.DetailWrapper>
          <S.DetailWrapper>
            <S.DetailTitle>Most users found this bin last month!</S.DetailTitle>
            <S.VisitRecordWrapper>
              <S.VisitRecordBox>
                <S.TextVisitNum isSuccessful>1</S.TextVisitNum>
                <S.VisitDescription>Successful visits</S.VisitDescription>
              </S.VisitRecordBox>
              <S.VisitRecordBox>
                <S.TextVisitNum>12</S.TextVisitNum>
                <S.VisitDescription>Failed visits</S.VisitDescription>
              </S.VisitRecordBox>
            </S.VisitRecordWrapper>
            {/* 최근 n개의 발견 / 실패 리스트 출력 */}
            <S.RowWrapper style={{marginBottom: 2}}>
              <S.TextDate>2024. 07. 02.</S.TextDate>
              <S.VisitDescription>
                Someone <Text style={{color: Palette.Primary}}>found</Text> this bin
              </S.VisitDescription>
            </S.RowWrapper>
            <S.RowWrapper style={{marginBottom: 2}}>
              <S.TextDate>2024. 07. 01.</S.TextDate>
              <S.VisitDescription>
                Someone <Text style={{color: Palette.Secondary2}}>couldn't find</Text> this bin
              </S.VisitDescription>
            </S.RowWrapper>
          </S.DetailWrapper>
          <S.DetailWrapper style={{paddingBottom: 0}}>
            <S.DetailTitle>
              After-visit feedback <Text style={{color: Palette.Primary}}>23</Text>
            </S.DetailTitle>
            <View style={{marginTop: 18, marginBottom: 30}}>
              {dummyReviews.map((review, index) => (
                <ReviewItem
                  key={review.id}
                  date={review.date}
                  author={review.author}
                  content={review.content}
                  isLast={index === dummyReviews.length - 1 ? true : false}
                />
              ))}
            </View>
            <S.SeeAllWrapper>
              <S.TextSeeAll>See All</S.TextSeeAll>
              <ArrowDownSvg width='24' height='24' fill={Palette.Gray4}/>
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
