import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext'; // Adjust path if needed
import Toast from "react-native-toast-message"

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot /> {/* This renders all your routed pages like login, home, etc. */}
      <Toast/>
    </AuthProvider>
  );
}
