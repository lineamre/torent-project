import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface AndroidStatusBarProps {
  soundEnabled?: boolean;
}

export default function AndroidStatusBar({ soundEnabled = true }: AndroidStatusBarProps) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="android-status-bar"
      className="w-full h-8 px-5 pt-1.5 flex items-center justify-between text-[11px] font-mono tracking-tight text-[#D1CBE8]/90 select-none z-30 pointer-events-none"
    >
      {/* Left: Live Clock & Notification glyphs */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#F5F3FF] tracking-normal font-sans text-xs">
          {timeStr || '12:45'}
        </span>
        <div className="flex items-center gap-1.5 opacity-75">
          <span className="text-[10px] text-[#FFE600]">🍌</span>
          <Sparkles className="w-2.5 h-2.5 text-[#00F2FE]" />
          {soundEnabled ? (
            <Volume2 className="w-2.5 h-2.5 text-[#FFE600]" />
          ) : (
            <VolumeX className="w-2.5 h-2.5 text-zinc-500" />
          )}
        </div>
      </div>

      {/* Right: Network & Battery Indicators */}
      <div className="flex items-center gap-2 text-xs opacity-90">
        <span className="text-[9px] font-bold tracking-wider font-mono text-[#00F2FE]">5G</span>
        <Wifi className="w-3 h-3 text-[#D1CBE8]" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono font-medium">96%</span>
          <BatteryMedium className="w-3.5 h-3.5 text-[#FFE600]" />
        </div>
      </div>
    </div>
  );
}
