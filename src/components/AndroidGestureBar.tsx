export default function AndroidGestureBar() {
  return (
    <div
      id="android-gesture-bar-container"
      className="w-full flex items-center justify-center py-2 bg-[#120D26]/95 border-t border-white/5 pointer-events-none select-none"
    >
      {/* Android System Home Gesture Pill */}
      <div className="w-32 h-1 bg-white/30 rounded-full transition-all hover:bg-white/50 shadow-sm" />
    </div>
  );
}
