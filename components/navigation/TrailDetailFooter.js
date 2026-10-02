import { Pressable, Text, View } from 'react-native';

import { navigationStyles } from './navigationStyles';

export default function TrailDetailFooter() {
  return (
    <View style={navigationStyles.footer}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Start Navigation"
        style={navigationStyles.trailDetailButton}
      >
        <Text style={navigationStyles.trailDetailButtonLabel}>Start Navigation</Text>
      </Pressable>
    </View>
  );
}
