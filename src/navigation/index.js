import { Link, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "../services/NavigationService";
import AppRoutes from "../utils/app-routes";

import Home from "../screens/Home";
import AddSimpson from "../screens/AddSimpson";
import DetailSimpson from "../screens/DetailSimpson";
import SplashScreen from "../screens/SplashScreen";

const Navigation = ({ initialRoute, setState }) => {
  const simpsonsDataLoad = useSelector(
    (x) => x.simpsonsReducer.simpsonsDataLoad
  );

  const dispatch = useDispatch();

  const NoLoadDataStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
    >
      {!simpsonsDataLoad ? (
        <>
          <NoLoadDataStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRoute}
          >
            <NoLoadDataStack.Screen
              name={AppRoutes.SplashScreen.name}
              component={SplashScreen}
            />
          </NoLoadDataStack.Navigator>
        </>
      ) : (
        <HomeStack.Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName={AppRoutes.Main.initialRoute}
        >
          <HomeStack.Screen
            name={AppRoutes.Main.childs.Home.name}
            component={Home}
            options={{ headerTitle: AppRoutes.Main.childs.Home.headerTitle }}
          />
          <HomeStack.Screen
            name={AppRoutes.Main.childs.AddSimpson.name}
            component={AddSimpson}
            options={{ headerTitle: AppRoutes.Main.childs.AddSimpson.headerTitle }}
          />
          <HomeStack.Screen
            name={AppRoutes.Main.childs.DetailSimpson.name}
            component={DetailSimpson}
            options={{ headerTitle: AppRoutes.Main.childs.DetailSimpson.headerTitle }}
          />
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Navigation;
