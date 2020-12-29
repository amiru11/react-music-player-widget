import React, { Component } from "react";

import AudioPlayer from "components/AudioPlayer";

import { IAudioPlayerListItem } from "interfaces/audioPlayerList";

import "styles.css";

interface IAppProps {
  children?: JSX.Element;
}

interface IAppState {
  isOpen: boolean;
  isMinimalized: boolean;
  playList: IAudioPlayerListItem[];
}

export default class App extends Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
      isMinimalized: false,
      playList: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getPlayList();
  }

  openModal(): void {
    this.setState((state) => {
      return {
        ...state,
        isOpen: true
      };
    });
  }

  closeModal(): void {
    this.setState((state) => {
      return {
        ...state,
        isOpen: false
      };
    });
  }

  getPlayList(): void {
    const playList = [
      {
        url:
          "https://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
        title: "title 1"
      },
      {
        url:
          "https://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
        title: "title 2"
      },
      {
        url:
          "https://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
        title: "title 3"
      }
    ];
    this.setState((state) => ({
      ...state,
      playList
    }));
  }

  initPlayList() {
    this.setState({ playList: [] });
  }

  render() {
    const { isOpen, isMinimalized, playList } = this.state;
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>

        <button onClick={this.openModal}>openModal</button>
        {isOpen && (
          <AudioPlayer
            isOpen={isOpen}
            isMinimalized={isMinimalized}
            playList={playList}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
