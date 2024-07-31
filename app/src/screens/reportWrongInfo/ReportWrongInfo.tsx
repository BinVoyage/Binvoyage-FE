import ArrowPrevSvg from 'assets/images/ArrowPrevSvg';
import BinSvg from 'assets/images/BinSvg';
import {Palette} from 'constants/palette';
import * as S from 'screens/reportWrongInfo/ReportWrongInfo.style';

export default function ReportWrongInfo() {
  return (
    <S.Container>
      <S.ArrowPrevWrapper>
        <ArrowPrevSvg width="24" height="24" fill={Palette.Gray4} />
      </S.ArrowPrevWrapper>
      <S.RowWrapper style={{gap: 2}}>
        <BinSvg width="18" height="18" fill={Palette.Secondary2} />
        <S.TextInfoB1>Trash</S.TextInfoB1>
      </S.RowWrapper>
      <S.Title>What details are incorrect?</S.Title>
      <S.AddressWrapper>
        <S.TextInfoB3>서울 성북구 창경궁로43길 17 지상1층</S.TextInfoB3>
      </S.AddressWrapper>
      <S.ImageArea />
      <S.DetailWrapper>
        <S.RowWrapper style={{justifyContent: 'flex-start'}}>
          <S.TextLocationPrimary>Location details</S.TextLocationPrimary>
          <S.LabelLocation>
            <S.LabelLocationText>Subway Entrance</S.LabelLocationText>
          </S.LabelLocation>
        </S.RowWrapper>
        <S.TextLocationContents>Near the bus stop</S.TextLocationContents>
      </S.DetailWrapper>
    </S.Container>
  );
}
