import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportNewBin from "screens/reportNewBin/ReportNewBin";
import ReportNewBinDetail from "screens/reportNewBinDetail/ReportNewBinDetail";

export default function ReportNewBinNavigator() {
  const Stack = createNativeStackNavigator<RootReportNewBinParamList>();

  return (
    <Stack.Navigator initialRouteName="ReportNewBin" screenOptions={{headerShown: false}}>
      <Stack.Screen name="ReportNewBin" component={ReportNewBin} />
      <Stack.Screen name="ReportNewBinDetail" component={ReportNewBinDetail} />
    </Stack.Navigator>
  );
}