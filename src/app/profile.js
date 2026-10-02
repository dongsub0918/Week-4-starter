import { Text } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import IconNavigation from '../../components/navigation/IconNavigation';

export default function ProfilePage() {
  return (
    <ScreenLayout footer={<IconNavigation />}>
      <Text>Profile placeholder</Text>
    </ScreenLayout>
  );
}
