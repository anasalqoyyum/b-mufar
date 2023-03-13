import { Audio } from 'expo-av'
import { Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useEffect, useRef, useState } from 'react'

const TButton = styled(Button)
const mainTrack = require('../../../assets/audio/mainBG.mp3')

const musicOn = require('../../../assets/icon/music-on.png')
const musicOff = require('../../../assets/icon/music-off.png')

export const MusicButton = () => {
  const [status, setStatus] = useState(false)
  const sound = useRef(new Audio.Sound())

  useEffect(() => {
    LoadAudio()
  }, [])

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync()
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          setStatus(true)
          sound.current.playAsync()
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync()
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          setStatus(false)
          sound.current.pauseAsync()
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync()
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(mainTrack, { isLooping: true, volume: 0.3 }, true)
        if (result.isLoaded === false) {
          setStatus(false)
          console.log('Error in Loading Audio')
        } else {
          setStatus(true)
          PlayAudio()
        }
      } catch (error) {
        console.error(error)
        setStatus(false)
      }
    } else {
      setStatus(false)
    }
  }

  const renderImage = () => {
    return <Image key={status.toString()} size={'12'} source={status ? musicOn : musicOff} alt="music" />
  }

  return status ? (
    <TButton size={'12'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={PauseAudio}>
      {renderImage()}
    </TButton>
  ) : (
    <TButton size={'12'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={PlayAudio}>
      {renderImage()}
    </TButton>
  )
}
