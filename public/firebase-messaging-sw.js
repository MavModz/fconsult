
// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// importScripts(
//     "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
// );


// firebase.initializeApp({
//     apiKey: "AIzaSyAcFVwYowP0MkOyfo9PfIPrfFtINlTMN9A",
//     authDomain: "find-and-consult-8a01c.firebaseapp.com",
//     databaseURL: "https://find-and-consult-8a01c-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "find-and-consult-8a01c",
//     storageBucket: "find-and-consult-8a01c.appspot.com",
//     messagingSenderId: "324346059957",
//     appId: "1:324346059957:web:066b555e958586094472fc",
//     measurementId: "G-D3XMW02RL3"
// });

// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//     const title = payload.notification.title;
//     const options = {
//       body: payload.notification.body,
//       icon: payload.notification.icon,
//     };
//     return self.registration.showNotification(title, options);
//   });