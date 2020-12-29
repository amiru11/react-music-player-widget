import React, { Component } from "react";
import Draggable from "react-draggable";
import { MdClose } from "react-icons/md";

import { IAudioPlayerListItem } from "../interfaces/audioPlayerList";

import AudioPlayerController from "components/AudioPlayerController";
import AudioPlayerList from "components/AudioPlayerList";

import "./AudioPlayer.scss";

interface IAudioPlayerProps {
  isOpen: boolean;
  isMinimalized: boolean;
  playList: IAudioPlayerListItem[];
  closeModal: () => void;
  initPlayList?: () => void;
}

interface IAudioPlayerStates {
  isDrag: boolean;
  moveX: number;
  moveY: number;
  audioSrc: string;
  currentTime: number;
  duration: number;
  playProgress: number;

  isPaused: boolean;
  isMuted: boolean;
  selectedItemIdx: number;
}

export default class AudioPlayer extends Component<
  IAudioPlayerProps,
  IAudioPlayerStates
> {
  musicAudio: HTMLAudioElement;
  audioInterval: any;

  constructor(props: IAudioPlayerProps) {
    super(props);

    this.state = {
      isDrag: false,
      moveX: 0,
      moveY: 0,
      audioSrc: "",
      currentTime: 0,
      duration: 0,
      playProgress: 0,
      isPaused: false,
      isMuted: false,
      selectedItemIdx: -1
    };

    this.audioInterval = null;
    this.musicAudio = null;

    this.setPlay = this.setPlay.bind(this);
    this.setPause = this.setPause.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.onControllerDrag = this.onControllerDrag.bind(this);
    this.onControllerDragStart = this.onControllerDragStart.bind(this);
    this.onControllerDragStop = this.onControllerDragStop.bind(this);

    this.createAudio();
  }

  componentDidMount() {
    this.loadAudio();
    this.addAudioEventListener();
  }

  componentWillUnmount() {
    this.initAudioPlayer();
  }

  // draggable
  onControllerDrag() {
    this.setState((state) => ({ ...state, isDrag: true }));
  }
  onControllerDragStart() {
    this.setState((state) => ({ ...state, isDrag: false }));
  }
  onControllerDragStop(e: any, { x, y }: { x: any; y: any }) {
    console.log("e", e);
    console.log("x, y", x, y);
    this.setState({ moveX: x, moveY: y });
  }
  /****************************** Audio START ******************************************/
  /**
   * 1. createAudioElement
   * 2. loadAudio
   * 3. EventListener
   * 4. setInterval
   * 5. clearInterval
   * 6, Audio state action
   */

  // 오디오 엘리먼트 생성
  createAudio() {
    this.musicAudio = document.createElement("audio");
    this.musicAudio.autoplay = true;
    this.musicAudio.preload = "auto";
  }

  // 오디오 엘리먼트에 주소주입
  loadAudio() {
    const { playList } = this.props;
    this.musicAudio.src = playList[0].url;
    // this.musicAudio.load();
    console.log("loadAudio", this.musicAudio);
  }

  // 오디오 이벤트 핸들러 등록
  addAudioEventListener() {
    this.musicAudio.onloadstart = (e: any) => {
      console.log("onloadstart", this.musicAudio.currentTime);
    };
    this.musicAudio.onprogress = (e: any) => {
      console.log("onprogress", this.musicAudio.currentTime);
    };
    this.musicAudio.onloadedmetadata = (e: any) => {
      console.log("onloadedmetadata", this.musicAudio.duration);
      this.setState((state) => ({
        ...state,
        duration: this.musicAudio.duration
      }));
    };
    this.musicAudio.onloadeddata = (e: any) => {
      console.log("onloadeddata", this.musicAudio.currentTime);
    };
    this.musicAudio.oncanplaythrough = (e: any) => {
      console.log("oncanplaythrough", this.musicAudio.currentTime);
    };
    this.musicAudio.onwaiting = (e: any) => {
      console.log("onwaiting", this.musicAudio.currentTime);
    };
    this.musicAudio.onplaying = (e: any) => {
      console.log("onplaying", this.musicAudio.currentTime);
      this.clearAudioInterval();
      this.setAudioInterval();
    };
    this.musicAudio.onpause = (e: any) => {
      console.log("onpause", this.musicAudio.currentTime);
      if (
        Math.floor(this.musicAudio.currentTime) >=
        Math.floor(this.musicAudio.duration)
      ) {
        this.clearAudioInterval();
        this.setStop();
      }
    };
    this.musicAudio.onended = (e: any) => {
      console.log("onended", this.musicAudio.currentTime);
      this.clearAudioInterval();
      this.setStop();
    };
    this.musicAudio.onerror = (e: any) => {
      console.log("onerror ", e.target.src);
      this.clearAudioInterval();
    };
  }

  // audio progress interval
  setAudioInterval() {
    if (this.musicAudio) {
      this.setState((state) => ({
        ...state,
        currentTime: this.musicAudio.currentTime
      }));
    }
    this.audioInterval = setInterval(() => {
      if (this.musicAudio) {
        const { currentTime, duration } = this.musicAudio;
        const playProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
        this.setState((state) => ({
          ...state,
          currentTime,
          playProgress
        }));
      }
    }, 50);
  }

  clearAudioInterval() {
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = null;
    }
  }

  // audio Status action
  // audio Play
  setPlay(): void {
    const { duration } = this.musicAudio;
    if (duration) this.musicAudio.play();
    console.log("setPlay", this.musicAudio.paused);
    this.setState((state) => ({ ...state, isPaused: this.musicAudio.paused }));
  }

  // audio Pause
  setPause(): void {
    const { paused } = this.musicAudio;
    if (!paused) this.musicAudio.pause();
    console.log("setPause", this.musicAudio.paused);
    this.setState((state) => ({ ...state, isPaused: this.musicAudio.paused }));
  }

  // audio Stop
  setStop(): void {
    const { duration, paused } = this.musicAudio;
    if (duration) this.musicAudio.currentTime = 0;
    if (paused) this.musicAudio.pause();

    this.setState((state) => ({ ...state, isPaused: this.musicAudio.paused }));
  }

  // audio Mute
  toggleMute(): void {
    const { isMuted } = this.state;
    this.musicAudio.muted = !isMuted;
    this.setState((state) => ({ ...state, isMuted: !isMuted }));
  }

  /****************************** Audio END ******************************************/

  initAudioPlayer() {
    if (this.musicAudio) {
      const { paused, duration } = this.musicAudio;
      if (!paused) this.musicAudio.pause();
      if (duration) this.musicAudio.currentTime = 0;
      this.musicAudio.src = "";
    }
    this.clearAudioInterval();
    this.setState({
      isDrag: false,
      moveX: 0,
      moveY: 0,
      audioSrc: "",
      currentTime: 0,
      duration: 0,
      playProgress: 0,
      isPaused: false,
      selectedItemIdx: -1
    });
  }

  render() {
    const { isMinimalized, playList, closeModal } = this.props;
    const {
      moveX,
      moveY,
      currentTime,
      playProgress,
      duration,
      isPaused,
      isMuted
    } = this.state;
    return !isMinimalized ? (
      <Draggable
        // bounds={bounds}
        handle=".drag-header"
        position={{ x: moveX, y: moveY }}
        onDrag={this.onControllerDrag}
        onStop={this.onControllerDragStop}
        onStart={this.onControllerDragStart}
      >
        <div className={"audio-player-container"}>
          <div className={"player-header"}>
            <div className={"drag-header"} />
            <AudioPlayerController
              currentTime={currentTime}
              duration={duration}
              playProgress={playProgress}
              isPaused={isPaused}
              isMuted={isMuted}
              setPlay={this.setPlay}
              setPause={this.setPause}
              toggleMute={this.toggleMute}
            />
            <button
              className={"btn-close"}
              title={"minimalize"}
              onClick={() => {}}
            >
              <MdClose />
            </button>
            <button
              className={"btn-close"}
              title={"close"}
              onClick={closeModal}
            >
              <MdClose />
            </button>
          </div>
          <div className={"player-body"}>
            <AudioPlayerList playList={playList} />
          </div>
        </div>
      </Draggable>
    ) : (
      <></>
    );
  }
}
