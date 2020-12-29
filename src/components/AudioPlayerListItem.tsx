import React, { Component } from "react";

import { IAudioPlayerListItem } from "../interfaces/audioPlayerList";

import "./AudioPlayerList.scss";

interface IAudioPlayerListItemProps {
  rowData: IAudioPlayerListItem;
}

export default class AudioPlayerListItem extends Component<
  IAudioPlayerListItemProps
> {
  constructor(props: IAudioPlayerListItemProps) {
    super(props);

    console.log("props", props);
  }
  render() {
    const { rowData } = this.props;
    return <li className="list-item">{rowData.title}</li>;
  }
}
