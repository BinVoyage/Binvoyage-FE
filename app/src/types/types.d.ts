/* eslint-disable prettier/prettier */
type SvgProps = {
  width: string;
  height: string;
  fill?: string;
};

interface Feedback {
  feedback_id: number;
  user_id: number;
  user_name: string;
  registration_dt: string;
  change_dt: string;
  content: string;
  is_my_feedback: boolean;
}

interface FeedbackResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    total_count: number;
    page: number;
    count: number;
    next: string | null;
    feedback_list: Feedback[];
  };
}

interface Visit {
  visit_dt: string;
  is_success: boolean;
}

interface BinDetail {
  bin_id: number;
  type_no: number;
  type_name: string;
  location_type_no: number;
  location_type_name: string;
  address: string;
  coordinate: [number, number];
  detail: string;
  image: string;
  image_dt: string;
  success_count: number;
  fail_count: number;
  last_visit_dt: string;
  visit_list: Visit[];
  distance: number;
}

interface BinDetailResponse {
  code: number;
  success: boolean;
  msg: string;
  data: BinData;
}

interface BinItemProps {
  bin_id: number;
  type_no: number;
  type_name: string;
  location_type_no: number;
  location_type_name: string;
  coordinate: [number, number];
  distance: number;
  visit_success_rate: number;
  address: string;
  detail: string;
  visit_count: number;
}

type CurrentPosition = {
  latitude: number;
  longitude: number;
};

type UserInfo = {
  user_name: string;
  nationality: string;
  stamp_cnt: string;
  newly_found_cnt: number;
  report_cnt: number;
  feedback_cnt: number;
};
