import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import DashBoardScreen from "./screens/DashBoardScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"dashboard"} component={DashBoardScreen}/>
                <Stack.Screen name={"details"} component={DetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

