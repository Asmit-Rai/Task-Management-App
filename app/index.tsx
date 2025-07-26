// app/index.tsx
import { useAuth } from '../contexts/AuthContext';
import OnboardingScreen from './screens/OnboardingScreen';
import Dashboard from './screens/DashboardScreen';

export default function Index() {
  const { user} = useAuth();
  return user ? <Dashboard /> : <OnboardingScreen />;
}