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
import { WebView } from "react-native-webview";
import Loader from "../../components/Loader";

const WishlistScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [showLoading, setShowLoading] = useState(true);
  const [refresherEnabled, setEnableRefresher] = useState(true);
  const [webviewLink, setWebviewLink] = useState(
    "https://kardano.in/wishlist-2/"
  );

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
          style={{ flex: showLoading ? 0 : 1 }}
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

export default WishlistScreen;
