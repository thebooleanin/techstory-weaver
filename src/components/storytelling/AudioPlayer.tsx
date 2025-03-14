
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  RotateCcw, Download, Share 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioSrc: string;
  imageUrl?: string;
  title: string;
  author: string;
  isLive?: boolean;
  onEnded?: () => void;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  imageUrl,
  title,
  author,
  isLive = false,
  onEnded,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };
    
    // Event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnd);
    
    // Set initial volume
    audio.volume = volume / 100;
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [onEnded, volume]);
  
  useEffect(() => {
    // Update audio volume when muted state changes
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [isMuted, volume]);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setIsMuted(newVolume[0] === 0);
  };
  
  const handleSeek = (newTime: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime[0];
      setCurrentTime(newTime[0]);
    }
  };
  
  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  const handleSkipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 15, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleSkipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 15, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className={cn("bg-card rounded-lg shadow-sm overflow-hidden", className)}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className="flex flex-col md:flex-row">
        {imageUrl && (
          <div className="md:w-1/3 aspect-square md:aspect-auto">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        
        <div className={cn("flex-1 p-4", !imageUrl && "w-full")}>
          <div className="mb-4">
            {isLive && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400 mb-2">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                Live
              </span>
            )}
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
          
          {!isLive && (
            <div className="space-y-2 mb-4">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSkipBackward}
                disabled={isLive}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full", 
                  isPlaying ? "bg-primary text-primary-foreground" : "bg-primary/90 text-primary-foreground"
                )}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSkipForward}
                disabled={isLive}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRestart}
                disabled={isLive}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <div className="relative" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                {showVolumeSlider && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover shadow-md rounded-lg p-3 w-32">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                )}
              </div>
              
              <Button
                size="icon"
                variant="ghost"
                asChild
              >
                <a href={audioSrc} download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
