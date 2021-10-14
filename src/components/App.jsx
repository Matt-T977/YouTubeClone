import axios from 'axios';
import React, { Component } from 'react';
import './App.css'
import Header from './Header/Header';
import VideoTitle from './VideoTitle/VideoTitle';
import YouTube from './YouTubeAPI/YouTube'
import VideoList from './VideoList/VideoList';
import VideoplayerWindow from './VideoPlayerWindow/VideoPlayerWindow';

import SearchResults from './SearchResults/SearchResults';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videoMetaInfo: [],
      selectedVideoId: null,
      selectedVideoTitle: null,
      selectedVideoChannelTitle: null
     }
  }

  onVideoSelected = (videoId,title,channelTitle) => {
    this.setState({
      selectedVideoId: videoId,
      selectedVideoTitle: title,
      selectedVideoChannelTitle: channelTitle
    })
    console.log(this.state)

  }

  onSearch = async (keyword) => {
    const response = await YouTube.get("/search", {
      params: {
        q:keyword
      }
    })
    this.setState({
      videoMetaInfo: response.data.items,
      selectedVideoId: response.data.items[0].id.videoId,
      selectedVideoTitle: response.data.items[0].snippet.channelTitle,
      selectedVideoChannelTitle: response.data.items[0].snippet.title
    })
    console.log(response)
    console.log(this.state)
  }


  componentDidMount = () => {

  }

  getVideo = () => {

  }

  render() { 
    return ( 
      <div className='container-fluid app-base'>

        <div className='row'>
          <Header onSearch={this.onSearch} />
          <SearchResults />
        </div>

        <div className='row'>
          <VideoTitle title={this.state.selectedVideoTitle} channelName={this.state.selectedVideoChannelTitle} /> 
        </div>

        <div className='row'>
          <div className='col'>
            Playlist
          </div>

          <div className='col'>
            <VideoplayerWindow videoId={this.state.selectedVideoId} />
          </div>
         
          <div className='col'>
            recommended
            <VideoList onVideoSelected={this.onVideoSelected} data={this.state.videoMetaInfo}/>
          </div>
        </div>
        
        <div className='row'>
          Comment Section
        </div>

      </div>
      
     );
  }
}
 
export default App;
