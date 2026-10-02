import { StyleSheet, View } from 'react-native';

export default function ScreenLayout({ children, footer, screenStyle }) {
  return (
    <View style={[styles.screen, screenStyle]}>
      <View style={styles.content}>{children}</View>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
