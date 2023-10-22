import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { WebViewScrollEvent } from "react-native-webview/lib/WebViewTypes";
import { WebView } from "react-native-webview";
import Loader from "../../components/Loader";

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [showLoading, setShowLoading] = useState(true);

  const [refresherEnabled, setEnableRefresher] = useState(true);
  const [webviewLink, setWebviewLink] = useState("https://kardano.in");

  const onAndroidBackPress = (): boolean => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect((): (() => void) | undefined => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
      return (): void => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          onAndroidBackPress
        );
      };
    }
  }, []);

  //Code to get scroll position
  const handleScroll = (event: WebViewScrollEvent) => {
    const yOffset = Number(event.nativeEvent.contentOffset.y);
    setEnableRefresher(yOffset === 0);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
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
        {showLoading ? <Loader /> : <></>}

        <WebView
          source={{ uri: webviewLink }}
          style={{
            flex: showLoading ? 0 : 1,
          }}
          ref={webViewRef}
          allowsBackForwardNavigationGestures={true}
          javaScriptEnabled
          allowUniversalAccessFromFileURLs
          onLoadStart={() => {
            setShowLoading(true);
          }}
          onLoad={() => {
            setShowLoading(false);
          }}
          // onMessage={handleWebMessage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
