import './App.css';
import React from 'react';
import ReactPlayer from 'react-player';
import leftArrow from './arrow-left-circle.svg';
import rightArrow from './arrow-right-circle.svg';
import film from './film.svg';
import filePlus from './file-plus.svg';
import logOut from './log-out.svg';
import messageCircle from './message-circle.svg';
import user from './user.svg';

class App extends React.Component
{
  state = 
  {
    videoData: [],
    currentIndex: 0,
    videoList : [
      'https://www.youtube.com/watch?v=7DKv5H5Frt0&ab_channel=TomScott',
      'https://www.youtube.com/watch?v=F0JDK_71yDg&ab_channel=TomScott',
      'https://www.youtube.com/watch?v=FO_Ox_dH0M8&ab_channel=TomScott',
      'https://www.youtube.com/watch?v=jplrbxI5GN8&ab_channel=TomScott',
      'https://www.youtube.com/watch?v=LDiXNsWQzD0&ab_channel=TomScott',
      // Add more videos as needed
    ],
  };

  componentDidMount() {
    // Fetch video data from the server when the component mounts
    fetch('http://localhost:3000/videoData')
      .then(response => response.json())
      .then(data => {
        this.setState({ videoData: data });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  nextIndex = () => {
    console.log(currentIndex);
    const { videoList, currentIndex } = this.state;
    if (currentIndex == videoList.length - 1)
    {
      return this.setState({currentIndex: 0});
    }

    return this.setState({currentIndex: currentIndex + 1,});
  };

  prevIndex = () => {
    console.log("scroll up");
    const { videoList, currentIndex} = this.state;
    if(currentIndex == 0)
    {
      return this.setState({
        currentIndex : videoList.length - 1,
      });
    }

    return this.setState({
      currentIndex: currentIndex - 1,
    });
  };
  render() {
    const {videoList, currentIndex} = this.state;
  
    return (
      <div className="view-reels">
        <div className="div">
          <div className="overlap">
            <div className="group">
              <div className="text-wrapper">Account Profile</div>
              <img className="user" alt="User" src={user} />
            </div>
            <div className="overlap-wrapper">
              <div className="overlap-group">
                <div className="upload"> Upload</div>
                <img className="file-plus" alt="File plus" src={filePlus} />
              </div>
            </div>
            <div className="group-2">
              <div className="text-wrapper-2">Messaging</div>
              <img className="message-circle" alt="Message circle" src={messageCircle} />
            </div>
            <div className="group-3">
              <div className="text-wrapper-3">Clothing reels</div>
              <img className="film" alt="Film" src={film}  />
            </div>
            <div className="overlap-group-wrapper">
              <div className="overlap-2">
                <div className="text-wrapper-4">Sign out</div>
                <img className="log-out" alt="Log out" src={logOut} />
              </div>
            </div>
          </div>
          <div className="rectangle">
            <ReactPlayer url={videoList[currentIndex]}
            width="100%"
            height="100%"/>
          </div>
          <div className="text-wrapper-5">Clothing reels</div>
          <div className="div-wrapper">
            <div className="overlap-group-2">
              <div className="rectangle-2"> 
              </div>              
              <div className="text-wrapper-6">Make an offer</div>
            </div>
          </div>
          <div>
            <img className="arrow-left-circle" alt="Arrow left circle" src={leftArrow}/>
            <button onClick={this.prevIndex}>test</button>
          </div>
          <div>
            <img className="arrow-right-circle" alt="Arrow right circle" src={rightArrow}/>
            <button onClick={this.nextIndex}></button>
          </div>
        </div>
      </div>
    );
  }
};



export default App;
