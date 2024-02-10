import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import render from './App';
import reportWebVitals from './reportWebVitals';
import ReactPlayer from 'react-player';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

class App extends React.Component
{
  state = 
  {
    currentIndex: 0,
    videoList : [
      'https://www.youtube.com/watch?v=7DKv5H5Frt0&ab_channel=TomScott',
      'https://www.youtube.com/watch?v=F0JDK_71yDg&ab_channel=TomScott',
      // Add more videos as needed
    ],
  };
  nextIndex = () => {
    const { videoList, currentIndex } = this.state;
    if (currentIndex == videoList - 1)
    {
      return this.setState({currentIndex: 0});
    }

    return this.setState({currentIndex: currentIndex + 1,});
  };

  prevIndex = () => {
    const { videoList, currentIndex} = this.state;
    if(currentIndex == 0)
    {
      return this.setState({
        currentIndex : videoList.length - 1,
      });
    }

    return this.setState({
      currentIndex: currentIndex - 1,
    })
  }
  render() {
    const {videoList, currentIndex} = this.state;
  
    return (
      <div className="App">
        <ReactScrollWheelHandler
        upHandler={this.prevIndex}
        downHandler={this.nextIndex}>
        <header className="App-header">
          <ReactPlayer url={videoList[currentIndex]}/>
        </header>
        </ReactScrollWheelHandler>
      </div>
    );
  }
};


export default App;



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
