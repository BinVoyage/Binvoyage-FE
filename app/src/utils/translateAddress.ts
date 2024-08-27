const guMapping: {[key: string]: {englishName: string; city: string}} = {
  종로구: {englishName: 'Jongno-gu', city: 'Seoul'},
  중구: {englishName: 'Jung-gu', city: 'Seoul'},
  용산구: {englishName: 'Yongsan-gu', city: 'Seoul'},
  성동구: {englishName: 'Seongdong-gu', city: 'Seoul'},
  광진구: {englishName: 'Gwangjin-gu', city: 'Seoul'},
  동대문구: {englishName: 'Dongdaemun-gu', city: 'Seoul'},
  중랑구: {englishName: 'Jungnang-gu', city: 'Seoul'},
  성북구: {englishName: 'Seongbuk-gu', city: 'Seoul'},
  강북구: {englishName: 'Gangbuk-gu', city: 'Seoul'},
  도봉구: {englishName: 'Dobong-gu', city: 'Seoul'},
  노원구: {englishName: 'Nowon-gu', city: 'Seoul'},
  은평구: {englishName: 'Eunpyeong-gu', city: 'Seoul'},
  서대문구: {englishName: 'Seodaemun-gu', city: 'Seoul'},
  마포구: {englishName: 'Mapo-gu', city: 'Seoul'},
  양천구: {englishName: 'Yangcheon-gu', city: 'Seoul'},
  강서구: {englishName: 'Gangseo-gu', city: 'Seoul'},
  구로구: {englishName: 'Guro-gu', city: 'Seoul'},
  금천구: {englishName: 'Geumcheon-gu', city: 'Seoul'},
  영등포구: {englishName: 'Yeongdeungpo-gu', city: 'Seoul'},
  동작구: {englishName: 'Dongjak-gu', city: 'Seoul'},
  관악구: {englishName: 'Gwanak-gu', city: 'Seoul'},
  서초구: {englishName: 'Seocho-gu', city: 'Seoul'},
  강남구: {englishName: 'Gangnam-gu', city: 'Seoul'},
  송파구: {englishName: 'Songpa-gu', city: 'Seoul'},
  강동구: {englishName: 'Gangdong-gu', city: 'Seoul'},
  해운대구: {englishName: 'Haeundae-gu', city: 'Busan'},
};

export function translateAddress(address: string): string {
  const gu = Object.keys(guMapping).find(g => address.includes(g));

  if (gu) {
    const {englishName, city} = guMapping[gu];
    return `${englishName}, ${city}`;
  } else {
    return address;
  }
}
