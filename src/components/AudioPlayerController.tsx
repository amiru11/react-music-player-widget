import React, { Component } from "react";
import Slider from "rc-slider";

import {
  MdPlayArrow,
  MdPause,
  MdVolumeUp,
  MdVolumeOff,
  MdSkipNext,
  MdSkipPrevious,
  MdFileDownload
} from "react-icons/md";

import "rc-slider/assets/index.css";
import "./AudioPlayerController.scss";

interface IAudioPlayerControllerProps {
  currentTime: number;
  duration: number;
  playProgress: number;
  isPaused: boolean;
  isMuted: boolean;
  setPlay: () => void;
  setPause: () => void;
  toggleMute: () => void;
}

export default class AudioPlayerController extends Component<
  IAudioPlayerControllerProps
> {
  constructor(props: IAudioPlayerControllerProps) {
    super(props);

    console.log("AudioPlayerController", props);
  }
  render() {
    const {
      currentTime,
      duration,
      playProgress,
      isPaused,
      isMuted,
      setPlay,
      setPause,
      toggleMute
    } = this.props;
    const convertedCurrentTime = getDuration(currentTime);
    const convertedDuration = getDuration(duration);

    return (
      <div className="controller-container">
        <div className="btn-wrap">
          <button onClick={toggleMute}>
            {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
          </button>
          <div className="main-control-wrap">
            <button>
              <MdSkipPrevious />
            </button>
            <button onClick={isPaused ? setPlay : setPause}>
              {isPaused ? <MdPlayArrow /> : <MdPause />}
            </button>
            <button>
              <MdSkipNext />
            </button>
          </div>
          <button>
            <MdFileDownload />
          </button>
        </div>
        <div className="slider-wrap">
          <span className="current-time">{convertedCurrentTime}</span>
          <Slider step={0.01} defaultValue={0} value={playProgress} />
          <span className="duration">{convertedDuration}</span>
        </div>
      </div>
    );
  }
}

const getDuration = (durationSec): string => {
  const duSec = parseInt(durationSec, 10);
  let hours: string | number = Math.floor(duSec / 3600);
  let minutes: string | number = Math.floor((duSec - hours * 3600) / 60);
  let seconds: string | number = duSec - hours * 3600 - minutes * 60;
  let outDuration = "";

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (hours > 0) {
    outDuration = `${hours}:${minutes}:${seconds}`;
  } else {
    outDuration = `${minutes}:${seconds}`;
  }

  return outDuration;
};
