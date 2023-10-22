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

import NoInternet from "./components/NoInternet";

type TWebMessage = {
  action: "copy" | "notification_id" | "remove_notification_id";
  data: string;
};

type TNotificationData = {
  link?: string;
};

export default function App() {
  const webViewRef = useRef<WebView>(null);

  const [refresherEnabled, setEnableRefresher] = useState(true);
  const [internetAvailable, setInternetAvailable] = useState(true);
  const [webviewLink, setWebviewLink] = useState("https://kardano.in");

  const onAndroidBackPress = (): boolean => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  const handleWebMessage = async (e: WebViewMessageEvent) => {
    const message: TWebMessage = JSON.parse(e.nativeEvent.data);
    // if (message.action === "copy") await Clipboard.setStringAsync(message.data);
    // if (message.action === "notification_id") {
    //   OneSignal.setExternalUserId(String(message.data));
    // }
    // if (message.action === "remove_notification_id") {
    //   OneSignal.removeExternalUserId();
    // }
  };

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
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
      return (): void => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          onAndroidBackPress
        );
      };
    }
    return () => {
      unsubscribe();
    };
  }, []);

  //Code to get scroll position
  const handleScroll = (event: WebViewScrollEvent) => {
    const yOffset = Number(event.nativeEvent.contentOffset.y);
    setEnableRefresher(yOffset === 0);
  };

  if (!internetAvailable) {
    return <NoInternet />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            enabled={refresherEnabled}
            onRefresh={() => {
              webViewRef?.current?.reload();
            }}
          />
        }
      >
        <WebView
          source={{ uri: webviewLink }}
          style={{ flex: 1 }}
          ref={webViewRef}
          allowsBackForwardNavigationGestures={true}
          javaScriptEnabled
          allowUniversalAccessFromFileURLs
          onMessage={handleWebMessage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
