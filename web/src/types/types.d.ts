export type SvgProps = {
  width?: string;
  height?: string;
  fill?: string;
}

export type BinInfo = {
  bin_id: number,
  type_no: number,
  type_name: string,
  location_type_no: number,
  location_type_name: string,
  coordinate: [
    number,
    number
  ],
  distance: number,
  visit_success_rate: number,
  address: string,
  detail: string,
  visit_count: number
}

export type MarkerInfo = {
  marker: kakao.maps.Marker;
  type_no: number;
  map: kakao.maps.Map;
  distance: number;
  visit_count: number;
};