import trailsFixture from './trails.json';

const FAKE_LATENCY_MS = 400;

// Fake API: resolves with a fresh copy of the fixture after a short delay, as
// if fetched from a server. Nothing is ever sent back; changes only live in
// TrailsProvider's state for the current session.
export function fetchTrails() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(trailsFixture.map((trail) => ({ ...trail }))), FAKE_LATENCY_MS);
  });
}
