import firebase from 'firebase';

const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch (error) {
    return error;
  }
};

const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: '513152731481',
  });
  askForPermissioToReceiveNotifications();
};

export default initializeFirebase;
