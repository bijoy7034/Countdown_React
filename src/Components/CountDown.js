import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    let interval;

    if (isPlaying && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const handleTogglePlayPause = () => {
    if (totalSeconds > 0) {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    }
  };

  const handleMinutesChange = (event) => {
    const newMinutes = parseInt(event.target.value, 10);

    if (!isNaN(newMinutes)) {
      setTotalSeconds(newMinutes * 60);
    } else if (event.target.value === "") {
      setTotalSeconds(0);
    } else {
   
    }
  };

  return (
    <div className='countdown-container'>
      <div>
        <label>Enter Minutes: </label> <br/>
        <input
          type="number"
          value={Math.floor(totalSeconds / 60)}
          onChange={handleMinutesChange}
        />
      </div>
      <div className='countdown-digit'>
        <div className='btn-container'>
          <button onClick={handleTogglePlayPause} className={`play-pause-button ${isPlaying ? 'playing' : 'paused'}`}>
            <span className="play-icon"><i class="fa fa-play-circle" style={{fontSize: "70px"}}></i></span>
            <span className="pause-icon"><i class="	fa fa-pause-circle" style={{fontSize: "70px"}}></i></span>
          </button>
        </div>
        <p>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};

export default Countdown;
