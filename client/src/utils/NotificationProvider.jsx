import { useEffect } from 'react';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { useAuthUser } from '@/hooks/jwt/useAuthUser';

export default function NotificationProvider() {
  const { userInfo } = useAuthUser();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        if (!userInfo?.userId) return;

        // Initialize Pusher Beams
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: '35cd6f1f-efdb-43c0-b321-1500e97dd08d'
        });

        const tokenProvider = new PusherPushNotifications.TokenProvider({
          url: `${import.meta.env.VITE_SERVER_API}/pusher/beams-auth`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Start and associate user
        await beamsClient.start();
        await beamsClient.setUserId(userInfo.userId, tokenProvider);
        
        console.log('✅ Notifications initialized for user:', userInfo.userId);

        // Verify registration
        const deviceId = await beamsClient.getDeviceId();
        const interests = await beamsClient.getDeviceInterests();
        console.log('Device ID:', deviceId, 'Interests:', interests);

      } catch (error) {
        console.error('❌ Notification setup error:', error);
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setupNotifications();
          }
        });
      });
    }
  }, [userInfo?.userId]);  // Re-run when user changes

  return null;
}