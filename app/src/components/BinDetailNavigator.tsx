import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BinDetail from 'screens/binDetail/BinDetail';
import FeedbackList from 'screens/feedbackList/FeedbackList';
import ReportFeedback from 'screens/reportFeedback/ReportFeedback';

export default function BinDetailNavigator() {
  const Stack = createNativeStackNavigator<RootBinDetailParamList>();

  return (
    <Stack.Navigator initialRouteName="BinDetail" screenOptions={{headerShown: false}}>
      <Stack.Screen name="BinDetail" component={BinDetail} />
      <Stack.Screen name="FeedbackList" component={FeedbackList} />
      <Stack.Screen name="ReportFeedback" component={ReportFeedback}/>
    </Stack.Navigator>
  );
}
