import { Animated } from 'react-native';
import { Circle, Path, Polygon, Svg } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const iconProps = (color) => ({
  fill: 'none',
  stroke: color,
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

function MountainIcon({ color, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath d="m8 3 4 8 5-5 5 15H2L8 3z" {...iconProps(color)} />
    </Svg>
  );
}

function StarIcon({ color, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPolygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        {...iconProps(color)}
      />
    </Svg>
  );
}

function UserIcon({ color, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" {...iconProps(color)} />
      <AnimatedCircle cx="12" cy="7" r="4" {...iconProps(color)} />
    </Svg>
  );
}

export default function AppIcon({ name, color }) {
  if (name === 'mountain') {
    return <MountainIcon color={color} />;
  }

  if (name === 'save') {
    return <StarIcon color={color} />;
  }

  return <UserIcon color={color} />;
}
