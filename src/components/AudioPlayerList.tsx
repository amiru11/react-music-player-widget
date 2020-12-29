import React, { Component } from "react";
import AudioPlayerListItem from "components/AudioPlayerListItem";

import { IAudioPlayerListItem } from "interfaces/audioPlayerList";

import "./AudioPlayerList.scss";

interface IAudioPlayerListProps {
  children?: JSX.Element;
  playList: IAudioPlayerListItem[];
}
interface IAudioPlayerListState {}

export default class AudioPlayerList extends Component<
  IAudioPlayerListProps,
  IAudioPlayerListState
> {
  render() {
    const { playList } = this.props;
    return (
      <ul className="audio-player-list">
        {playList.length > 0 &&
          playList.map((rowData) => (
            <AudioPlayerListItem rowData={rowData} key={rowData.title} />
          ))}
      </ul>
    );
  }
}
