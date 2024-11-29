/* eslint-disable prettier/prettier */
type RootTabParamList = {
  HomeNavigator: {
    screen: 'Home' | 'PassPort' | 'LoginInProcess';
  }
  FindBin: undefined;
  MyNavigator: undefined;
};

type RootStackParamList = {
  BottomNavigator: undefined;
  Login: undefined;
  OnBoarding: undefined;
  UserInput: {id_token: string};
  NewTrashDetail: undefined;
  BinDetailNavigator: {
    screen: 'BinDetail' | 'FeedbackList' | 'ReportFeedback' | 'ReportWrongInfo' | 'VerifyVisit';
    params?: {
      bin_id?: number;
      type_name?: string;
      location_type_name?: string;
      address?: string;
      detail?: string;
      image?: string;
      isVerifyVisit?: boolean;
    };
  };
  ReportNewBinNavigator: undefined;
};

type RootHomeParamList = {
  Home: undefined;
  PassPort: undefined;
  LoginInProcess: undefined;
};

type RootBinDetailParamList = {
  BinDetail: {bin_id: number};
  FeedbackList: {bin_id: number};
  ReportFeedback: {date: string; author: string; content: string; feedbackId: number};
  ReportWrongInfo: {
    bin_id: number;
    type_name: string;
    location_type_name: string;
    address: string;
    detail: string;
    image: string;
    isVerifyVisit: boolean;
  };
  VerifyVisit: {
    bin_id: number;
    type_name: string;
    location_type_name: string;
    address: string;
    detail: string;
    image: string;
    coordinate: [number, number];
  };
  LoginInProcess: undefined;
};

type RootReportNewBinParamList = {
  ReportNewBin: undefined;
  ReportNewBinDetail: {
    address: string;
    coordinate: [number, number] | null; // [lat, lng]
  };
};

type RootMyParamList = {
  MyPage: undefined;
  MyFeedback: undefined;
  LoginInProcess: undefined;
};
