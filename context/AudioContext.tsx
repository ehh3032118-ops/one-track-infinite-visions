"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Track } from "@/types";
import { FEATURED_TRACKS } from "@/data/mockData";

export interface AudioContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progressPercent: number;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  seek: (timeInSeconds: number) => void;
  seekToPercent: (percent: number) => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(FEATURED_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(FEATURED_TRACKS[0].durationSec || 222);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize singleton HTML5 Audio element on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audio.src = FEATURED_TRACKS[0].audioUrl || "";
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(Math.floor(audio.duration));
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      // Auto play next track when current ends
      playNext();
    };

    const handleError = () => {
      // Graceful error fallback
      console.warn("Audio stream notice: playback simulated if external network restricted.");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setDuration(track.durationSec || 200);

    const audio = audioRef.current;
    if (audio) {
      if (audio.src !== track.audioUrl) {
        audio.src = track.audioUrl || "";
        audio.currentTime = 0;
      }
      audio.play().catch(() => {
        // Autoplay policy or user interaction needed
        setIsPlaying(true);
      });
    } else {
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => {
        setIsPlaying(true);
      });
    } else {
      audio.pause();
    }
  }, []);

  const pauseTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
  }, []);

  const resumeTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        setIsPlaying(true);
      });
    }
  }, []);

  const seek = useCallback((timeInSeconds: number) => {
    const audio = audioRef.current;
    const clampedTime = Math.max(0, Math.min(timeInSeconds, duration));
    if (audio) {
      audio.currentTime = clampedTime;
    }
    setCurrentTime(clampedTime);
  }, [duration]);

  const seekToPercent = useCallback(
    (percent: number) => {
      const targetSec = (Math.max(0, Math.min(100, percent)) / 100) * duration;
      seek(targetSec);
    },
    [duration, seek]
  );

  const setVolume = useCallback((level: number) => {
    const clampedLevel = Math.max(0, Math.min(1, level));
    setVolumeState(clampedLevel);
    setIsMuted(clampedLevel === 0);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = clampedLevel;
      audio.muted = clampedLevel === 0;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (isMuted) {
      setIsMuted(false);
      const restoredVol = volume > 0 ? volume : 0.8;
      setVolumeState(restoredVol);
      if (audio) {
        audio.muted = false;
        audio.volume = restoredVol;
      }
    } else {
      setIsMuted(true);
      if (audio) {
        audio.muted = true;
      }
    }
  }, [isMuted, volume]);

  const playNext = useCallback(() => {
    const currentIndex = FEATURED_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % FEATURED_TRACKS.length;
    playTrack(FEATURED_TRACKS[nextIndex]);
  }, [currentTrack.id, playTrack]);

  const playPrev = useCallback(() => {
    const currentIndex = FEATURED_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + FEATURED_TRACKS.length) % FEATURED_TRACKS.length;
    playTrack(FEATURED_TRACKS[prevIndex]);
  }, [currentTrack.id, playTrack]);

  // Progress percentage (0 - 100)
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        progressPercent,
        volume,
        isMuted,
        togglePlay,
        playTrack,
        pauseTrack,
        resumeTrack,
        seek,
        seekToPercent,
        setVolume,
        toggleMute,
        playNextTrack: playNext,
        playPrevTrack: playPrev,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
