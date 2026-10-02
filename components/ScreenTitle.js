import { StyleSheet, Text } from 'react-native';

export default function ScreenTitle({ children }) {
  return (
    <Text style={styles.title} accessibilityRole="header">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 24,
    color: '#006B3C',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 40,
  },
});
