/**
 * ProfileScreen.js
 * TrailMate: User Profile screen (Spec §D)
 *
 * Rendered by src/app/profile.js inside ScreenLayout, which supplies the top
 * padding and the IconNavigation footer.
 */

import React, { memo, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/* ------------------------------- Tokens ------------------------------- */

// Set to Inter family names (e.g. 'Inter_700Bold') once fonts are loaded.
const FONT_FAMILY = { regular: undefined, bold: undefined };

const space = { xxs: 4, xs: 8, md: 16, lg: 24, xl: 32, xxl: 40, xxxl: 48 };

const color = {
  text: { primary: '#212529', secondary: '#495057' },
  bg: { screen: '#FFFFFF' },
  surface: { placeholder: '#E4E7E5', rowPressed: '#F2F4F3' },
  border: { subtle: '#E2E2E2' },
  danger: '#D64535',
};

const typography = {
  name: { fontFamily: FONT_FAMILY.bold, fontSize: 20, lineHeight: 28, fontWeight: 'bold' },
  meta: { fontFamily: FONT_FAMILY.regular, fontSize: 15, lineHeight: 20, fontWeight: '400' },
  rowLabel: { fontFamily: FONT_FAMILY.regular, fontSize: 18, lineHeight: 24, fontWeight: '400' },
  initials: { fontFamily: FONT_FAMILY.bold, fontSize: 40, lineHeight: 48, fontWeight: 'bold' },
};

const AVATAR_SIZE = 120;
const ROW_MIN_HEIGHT = 84;

/* ------------------------------- Config ------------------------------- */

const SETTINGS_ROWS = [
  { key: 'notifications', label: 'Notifications', route: 'Notifications' },
  { key: 'units', label: 'Units', route: 'Units' },
  { key: 'about', label: 'About', route: 'About' },
];

const DEFAULT_USER = { displayName: 'Username', avatarUrl: null, trailsHiked: 12 };

/* ------------------------------- Helpers ------------------------------ */

const formatTrailsHiked = (count) => `${count} ${count === 1 ? 'trail' : 'trails'} hiked`;

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

/* ---------------------------- Sub-components -------------------------- */

const Divider = memo(function Divider() {
  return <View style={styles.divider} />;
});

const ChevronRight = memo(function ChevronRight() {
  return (
    <View style={styles.chevronBox} accessible={false} importantForAccessibility="no">
      <View style={styles.chevron} />
    </View>
  );
});

const Avatar = memo(function Avatar({ uri, name }) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={styles.avatar}
        accessibilityIgnoresInvertColors
        accessibilityLabel={`${name} profile photo`}
      />
    );
  }
  return (
    <View style={[styles.avatar, styles.avatarFallback]} accessibilityLabel={`${name} profile photo`}>
      <Text style={styles.initials}>{getInitials(name)}</Text>
    </View>
  );
});

const SettingsRow = memo(function SettingsRow({
  label,
  onPress,
  destructive = false,
  showChevron = true,
  loading = false,
  accessibilityHint,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      android_ripple={{ color: '#00000014' }}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: loading, busy: loading }}
    >
      <Text style={[styles.rowLabel, destructive && styles.rowLabelDestructive]} numberOfLines={1}>
        {label}
      </Text>
      {loading ? (
        <ActivityIndicator size="small" color={destructive ? color.danger : color.text.secondary} />
      ) : (
        showChevron && <ChevronRight />
      )}
    </Pressable>
  );
});

/* -------------------------------- Screen ------------------------------ */

export default function ProfileScreen({ user = DEFAULT_USER, onOpenSetting, onLogout }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { displayName, avatarUrl, trailsHiked } = user;

  const handleOpenSetting = useCallback(
    (row) => {
      if (typeof onOpenSetting === 'function') {
        onOpenSetting(row.route);
        return;
      }
      Alert.alert(row.label, `The ${row.label} screen is coming soon.`);
    },
    [onOpenSetting],
  );

  const performLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      if (typeof onLogout === 'function') {
        await onLogout();
      } else {
        Alert.alert('Logged out', 'Placeholder: no auth service is connected yet.');
      }
    } catch (error) {
      Alert.alert('Couldn’t log out', 'Something went wrong. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  }, [onLogout]);

  const confirmLogout = useCallback(() => {
    Alert.alert(
      'Log out?',
      'You’ll need to sign in again to see your saved trails.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: performLogout },
      ],
      { cancelable: true },
    );
  }, [performLogout]);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity block (centered) */}
        <View style={styles.identity}>
          <View style={styles.avatarWrap}>
            <Avatar uri={avatarUrl} name={displayName} />
          </View>
          <Text style={styles.name} numberOfLines={1} accessibilityRole="header">
            {displayName}
          </Text>
          {trailsHiked == null ? (
            <View style={styles.metaSkeleton} accessibilityLabel="Loading trail count" />
          ) : (
            <Text style={styles.meta} maxFontSizeMultiplier={1.3}>
              {formatTrailsHiked(trailsHiked)}
            </Text>
          )}
        </View>

        {/* Settings list (fill width) */}
        <View style={styles.list}>
          <Divider />
          {SETTINGS_ROWS.map((row) => (
            <React.Fragment key={row.key}>
              <SettingsRow label={row.label} onPress={() => handleOpenSetting(row)} />
              <Divider />
            </React.Fragment>
          ))}
          <SettingsRow
            label="Log Out"
            destructive
            showChevron={false}
            loading={isLoggingOut}
            onPress={confirmLogout}
            accessibilityHint="Signs you out of TrailMate"
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* -------------------------------- Styles ------------------------------ */

const styles = StyleSheet.create({
  // Fill: never shrink to content, even under a centering parent
  screen: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    backgroundColor: color.bg.screen,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'stretch',
    paddingHorizontal: space.lg, // 24 gutter
    paddingBottom: space.lg,
  },

  // Identity
  identity: {
    alignItems: 'center',
    paddingTop: space.lg, // 24 (+24 from ScreenLayout)
    paddingBottom: space.lg, // 24
    gap: space.xxs, // 4
  },
  avatarWrap: {
    marginBottom: space.md - space.xxs, // 12 + 4 gap = 16
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: color.surface.placeholder,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    ...typography.initials,
    color: color.text.secondary,
  },
  name: {
    ...typography.name,
    color: color.text.primary,
    textAlign: 'center',
  },
  meta: {
    ...typography.meta,
    color: color.text.secondary,
    textAlign: 'center',
  },
  metaSkeleton: {
    width: 120,
    height: space.md,
    marginVertical: 2,
    borderRadius: space.xs,
    backgroundColor: color.surface.placeholder,
  },

  // List: fill width
  list: {
    alignSelf: 'stretch',
    width: '100%',
  },
  divider: {
    alignSelf: 'stretch',
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.border.subtle,
  },
  row: {
    alignSelf: 'stretch',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // label left, chevron pinned right
    minHeight: ROW_MIN_HEIGHT,
  },
  rowPressed: {
    backgroundColor: color.surface.rowPressed,
  },
  rowLabel: {
    ...typography.rowLabel,
    flexShrink: 1,
    color: color.text.primary,
  },
  rowLabelDestructive: {
    color: color.danger,
  },

  // Chevron (24pt box, 2pt stroke)
  chevronBox: {
    width: space.lg,
    height: space.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: color.text.secondary,
    transform: [{ translateX: -2 }, { rotate: '45deg' }],
  },
});