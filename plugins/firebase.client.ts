import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, onDisconnect, get, onValue, push } from 'firebase/database';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getAnalytics } from 'firebase/analytics';

export default defineNuxtPlugin(async nuxtApp => {
  const fb = useRuntimeConfig();


  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
  };

  let NotificationToken = null;

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const database = getDatabase(app);

  // try {
  //   const analytics = getAnalytics(app);
  // } catch (error) {
  //   console.error("Analytics Not Supported")
  // }

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.provide('firestore', firestore);
  nuxtApp.vueApp.provide('database', database);
  nuxtApp.provide('database', database);

  // Facebook Auth Provider
  const facebookProvider = new FacebookAuthProvider();

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      return result.user;
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  nuxtApp.provide('signInWithFacebook', signInWithFacebook);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  function getDeviceId() {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  }

  const getUserDetails = async (c, i) => {
    const userRef = ref(database, `/users/${i}/plans/${c}`);
    const userStatusSnapshot = await get(userRef);
    return userStatusSnapshot.val();
  };

  const userOnline = async () => {
    const { data } = await useFetch('/api/users/admin');
    const userId = data.value.user.uid;
    const userRef = ref(database, `/users/${userId}/status`);
    const deviceRef = ref(database, `/users/${userId}/device`);
    const notifTokensRef = ref(database, `/users/${userId}/notifTokens`);
    const currentDeviceId = getDeviceId();

    await set(userRef, true);
    await set(deviceRef, currentDeviceId);

    if (NotificationToken) {
      const notifTokensSnapshot = await get(notifTokensRef);
      const notifTokens = notifTokensSnapshot.exists() ? notifTokensSnapshot.val() : [];
      if (!Object.values(notifTokens).includes(NotificationToken)) {
        const newTokenRef = push(notifTokensRef);
        await set(newTokenRef, NotificationToken);
      }
    }

    onDisconnect(userRef).set(false);

    onValue(deviceRef, async (snapshot) => {
      if (snapshot.val() == 'devicereload') {
        await adminRegenerateToken()
        location.reload()
      } else if (snapshot.exists() && snapshot.val() !== currentDeviceId) {
        // alert("Someone else logged in!");
        localStorage.setItem("refreshed", 'true');
        document.getElementById('someoneelselogout').click()
        // localStorage.clear();
        // document.cookie.split(';').forEach(cookie => {
        //   document.cookie = cookie.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        // });
        // location.replace('/');
      }
    });
  };

  const reloadAdmin = async (id) => {
    const deviceRef = ref(database, `/users/${id}/device`);
    await set(deviceRef, 'devicereload');
  }

  nuxtApp.provide('userOnline', userOnline);
  nuxtApp.provide('reloadAdmin', reloadAdmin);
  nuxtApp.provide('logout', logout);
  nuxtApp.provide('getUserDetails', getUserDetails);

  // **🔹 Check if the browser is Safari Mobile**
  function isSafariMobile() {
    return /iP(ad|hone|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent);
  }

  // if (!isSafariMobile()) {
  //   // ✅ Register Service Worker
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/firebase-messaging-sw.js')
  //       .catch(err => console.error('Service Worker Registration Failed:', err));
  //   }

  //   // ✅ Request Notification Token
  //   const messaging = getMessaging(app);

  //   getToken(messaging, {
  //     vapidKey: 'BGuWjWZUNHCuF8prEEGsj6pmppIsvp2Sq3U5ul7rlynln2svrhZzLreFeMa4SjER9gfvci3QK9MsGni-uheGnvE',
  //     serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
  //   })
  //     .then(currentToken => {
  //       if (currentToken) {
  //         NotificationToken = currentToken;
  //       } else {
  //         console.warn('No registration token available.');
  //       }
  //     })
  //     .catch(err => {
  //       console.error("No Notification Permission", err);
  //     });

  //   // ✅ Handle Incoming Messages
  //   onMessage(messaging, (payload) => {
  //     if (Notification.permission === "granted") {
  //       new Notification(payload.notification.title, {
  //         body: payload.notification.body,
  //         icon: payload.notification.icon || '/default-icon.png',
  //       });
  //     }
  //   });
  // } else {
  //   console.warn("Push notifications are not supported in Safari mobile.");
  // }

});
