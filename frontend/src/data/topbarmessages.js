const AUTHENTICATED_MESSAGES = [
    "Beat the rush - see gym occupancy in real-time! 🕒",
    "Skip the crowd, not the workout! 🏋️‍♂️",
    "Real-time updates for smarter workouts 📱"
];

const GUEST_MESSAGES = [
    "Sign in to see real-time estimates of gym occupancy 🔐",
    "Want live updates? Sign in with your CMU email ✉️",
];

export function getTopBarMessage(isAuthenticated) {
    const messages = isAuthenticated ? AUTHENTICATED_MESSAGES : GUEST_MESSAGES;
    return messages[Math.floor(Math.random() * messages.length)];
}