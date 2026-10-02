import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Shared screen shell: handles the top and bottom safe-area insets so screens
// only lay out their own content. Pass `edgeToEdge` when a screen draws its
// own header behind the status bar (it must then pad by the top inset itself).
export default function ScreenLayout({ children, footer, edgeToEdge = false, screenStyle }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: edgeToEdge ? 0 : insets.top, paddingBottom: footer ? 0 : insets.bottom },
        screenStyle,
      ]}
    >
      <View style={styles.content}>{children}</View>
      {footer && <View style={[styles.footer, { paddingBottom: insets.bottom }]}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  footer: {
    width: '100%',
    backgroundColor: '#FFF',
  },
});
