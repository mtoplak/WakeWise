import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Database from "../database";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      console.log(notification.request.content.data);
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

const StackLayout = () => {
  useNotificationObserver();
  
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AlarmScreen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;