import { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { RiFullscreenFill, RiFullscreenExitLine } from 'react-icons/ri';
import { FaVolumeUp } from 'react-icons/fa';
import Styles from '../styles/Home.module.css';
import Data from '../mock';

export function useStatePlay(videoPlayer) {
  const [playing, setPlaying] = useState({
    playState: false,
    percentage: 0,
    speedTime: 1,
  });

  // Play/Pause
  const tooglePlay = () => {
    setPlaying({
      ...playing,
      playState: !playing.playState,
    });
  };

  // O que altera no tempo do vídeo, altera na barra
  const handleTimeUpdate = () => {
    const currentTimePorcentage = (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100;
    setPlaying({
      ...playing,
      percentage: currentTimePorcentage,
    });
  };

  // O que altera na barra, altera no tempo do vídeo
  const handleChangePercentage = (e) => {
    const percentageTarget = e.target.value;
    videoPlayer.current.currentTime = (videoPlayer.current.duration / 100) * percentageTarget;
  };

  // Altera a valocidade
  const handleChangeSelect = (e) => {
    setPlaying({
      ...playing,
      speedTime: e.target.value,
    });
  };

  // Altera o Volume
  const handleChangeVolum = (e) => {
    const percentageTarget = (e.target.value) / 100;
    videoPlayer.current.volume = percentageTarget;
  };

  useEffect(() => {
    playing.playState ? videoPlayer.current.play() : videoPlayer.current.pause();
  }, [playing.playState]);
  useEffect(() => {
    videoPlayer.current.playbackRate = playing.speedTime;
  }, [playing.speedTime]);
  return (
    {
      playing,
      tooglePlay,
      handleTimeUpdate,
      handleChangePercentage,
      handleChangeSelect,
      handleChangeVolum,
    }
  );
}

export default function Home() {
  const [fullClass, setFullClass] = useState(`${[Styles.PageHomeStyle]}`);
  const handleFullClass = () => {
    fullClass === `${[Styles.PageHomeStyle]}` ? setFullClass(`${[Styles.FullStyle]}`) : setFullClass(`${[Styles.PageHomeStyle]}`);
  };
  const videoPlayer = useRef(null);
  const {
    playing,
    tooglePlay,
    handleTimeUpdate,
    handleChangePercentage,
    handleChangeSelect,
    handleChangeVolum,
  } = useStatePlay(videoPlayer);

  return (
    <section className={[fullClass]}>
      {Data.map((video) => (
        <>
          <video
            width="100%"
            height="100%"
            key={video.id}
            ref={videoPlayer}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={video.source} type="video/mp4" />
            <track src="captions_pt.vtt" kind="captions" srcLang="pt" label="portuguese_captions" />
          </video>

          <div
            className={Styles.controlStyle}
          >
            <button type="button" onClick={tooglePlay}>
              {playing.playState
                ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}
            </button>

            <section>
              <input
                className={Styles.controlInputStyle}
                onChange={handleChangePercentage}
                type="range"
                min={1}
                max={100}
                value={playing.percentage}
              />
              <select
                value={playing.speedTime}
                onChange={handleChangeSelect}
              >
                {
            [0.50, 1, 1.5, 2].map((speed) => (
              <option
                key={speed}
              >
                {speed}
              </option>
            ))
          }
              </select>
              <div className={Styles.ControlVolumContainer}>
                <button
                  type="button"
                >
                  <FaVolumeUp
                    size={25}
                  />
                </button>

                <input
                  className={Styles.ControlVolum}
                  onChange={handleChangeVolum}
                  type="range"
                  min={0}
                  max={100}
                />
              </div>
              <button type="button" onClick={handleFullClass}>
                { fullClass === `${[Styles.PageHomeStyle]}` ? <RiFullscreenFill size={30} /> : <RiFullscreenExitLine size={30} />}
              </button>

            </section>
          </div>
        </>
      ))}

    </section>

  );
}
