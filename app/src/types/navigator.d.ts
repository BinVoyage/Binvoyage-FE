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
  BinDetailNavigator: undefined;
};

type RootHomeParamList = {
  Home: undefined;
  PassPort: undefined;
};

type RootBinDetailParamList = {
  BinDetail: undefined;
  FeedbackList: undefined;
  ReportFeedback: { date: string; author: string; content: string };
  ReportWrongInfo: undefined;
};
