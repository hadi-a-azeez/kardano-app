import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  AppState,
} from "react-native";
import {
  WebViewMessageEvent,
  WebViewScrollEvent,
} from "react-native-webview/lib/WebViewTypes";
import { WebView } from "react-native-webview";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "react-native-heroicons/outline";

import NoInternet from "./components/NoInternet";
import HomeScreen from "./src/screens/Home";
import ShopScreen from "./src/screens/Shop";
import CartScreen from "./src/screens/Cart";
import WishlistScreen from "./src/screens/Wishlist";

type TWebMessage = {
  action: "copy" | "notification_id" | "remove_notification_id";
  data: string;
};

type TNotificationData = {
  link?: string;
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [internetAvailable, setInternetAvailable] = useState(true);

  const holdSplashScreen = async () => {
    // keep splash screen visible
    await SplashScreen.preventAutoHideAsync();
    // pre-load your stuff
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // hide splash screen
    await SplashScreen.hideAsync();
  };

  useEffect((): (() => void) | undefined => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternetAvailable(!!state.isConnected);
    });
    holdSplashScreen();
    return () => {
      unsubscribe();
    };
  }, []);

  if (!internetAvailable) {
    return <NoInternet />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <HomeIcon size="26" color={focused ? "#00B9F1" : "black"} />
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ShoppingBagIcon
                size="26"
                color={focused ? "#00B9F1" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ShoppingCartIcon
                size="26"
                color={focused ? "#00B9F1" : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <HeartIcon size="26" color={focused ? "#00B9F1" : "black"} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
