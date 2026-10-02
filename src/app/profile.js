import ScreenLayout from '../../components/ScreenLayout';
import ProfileScreen from '../../components/ProfileScreen';
import IconNavigation from '../../components/navigation/IconNavigation';

export default function ProfilePage() {
  return (
    <ScreenLayout footer={<IconNavigation />}>
      <ProfileScreen />
    </ScreenLayout>
  );
}
