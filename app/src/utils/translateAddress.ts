const guMapping: { [key: string]: string } = {
  "종로구": "Jongno-gu",
  "중구": "Jung-gu",
  "용산구": "Yongsan-gu",
  "성동구": "Seongdong-gu",
  "광진구": "Gwangjin-gu",
  "동대문구": "Dongdaemun-gu",
  "중랑구": "Jungnang-gu",
  "성북구": "Seongbuk-gu",
  "강북구": "Gangbuk-gu",
  "도봉구": "Dobong-gu",
  "노원구": "Nowon-gu",
  "은평구": "Eunpyeong-gu",
  "서대문구": "Seodaemun-gu",
  "마포구": "Mapo-gu",
  "양천구": "Yangcheon-gu",
  "강서구": "Gangseo-gu",
  "구로구": "Guro-gu",
  "금천구": "Geumcheon-gu",
  "영등포구": "Yeongdeungpo-gu",
  "동작구": "Dongjak-gu",
  "관악구": "Gwanak-gu",
  "서초구": "Seocho-gu",
  "강남구": "Gangnam-gu",
  "송파구": "Songpa-gu",
  "강동구": "Gangdong-gu"
};

export function translateAddress(address: string): string {
  const gu = Object.keys(guMapping).find(g => address.includes(g));

  if (gu) {
      const translatedGu = guMapping[gu];
      return `${translatedGu}, Seoul`;
  } else {
      return address;
  }
}