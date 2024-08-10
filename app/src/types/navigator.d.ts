/* eslint-disable prettier/prettier */
type RootTabParamList = {
  HomeNavigator: undefined;
  FindBin: undefined;
  MyPage: undefined;
};

type RootStackParamList = {
  BottomNavigator: undefined;
  Login: undefined;
  OnBoarding: undefined;
  UserInput: undefined;
  NewTrashDetail: undefined;
  BinDetailNavigator: undefined;
  MyComment: undefined; // 마이페이지 -> 작성한 피드백
};

type RootHomeParamList = {
  Home: undefined;
  PassPort: undefined;
  NewTrash: undefined;
  NewTrashDetail: undefined;
  tabBarStyle?: undefined;
};

type RootBinDetailParamList = {
  BinDetail: undefined;
  FeedbackList: undefined;
  ReportFeedback: {date: string; author: string; content: string; feedbackId: number};
  ReportWrongInfo: {bin_id: number; type_name: string; location_type_name: string; address: string; detail: string; image: string};
};

type RootMyParamList = {
  MyPage: undefined;
  MyComment: undefined;
};
