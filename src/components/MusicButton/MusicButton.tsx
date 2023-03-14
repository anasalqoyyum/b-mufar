import { Audio } from 'expo-av'
import { Box, Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setMusicStatus } from '../../store/slice'

const TButton = styled(Button)
const TBox = styled(Box)

const mainTrack = require('../../../assets/audio/mainBG.mp3')

const musicOn = require('../../../assets/icon/music-on.png')
const musicOff = require('../../../assets/icon/music-off.png')

export const MusicButton = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.reducer.musicStatus)
  const sound = useRef(new Audio.Sound())

  useEffect(() => {
    LoadAudio()
    return () => {
      UnloadAudio()
    }
  }, [])

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync()
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          dispatch(setMusicStatus('playing'))
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
          dispatch(setMusicStatus('paused'))
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
          dispatch(setMusicStatus('idle'))
          console.log('Error in Loading Audio')
        } else {
          PlayAudio()
        }
      } catch (error) {
        console.error(error)
        dispatch(setMusicStatus('idle'))
      }
    } else {
      dispatch(setMusicStatus('idle'))
    }
  }

  const UnloadAudio = async () => {
    dispatch(setMusicStatus('idle'))
    await sound.current.unloadAsync()
  }

  return (
    <TBox className="absolute bottom-4 right-8">
      {status === 'idle' || status === 'playing' ? (
        <TButton size={'12'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={PauseAudio}>
          <Image key={status} size={'12'} source={musicOn} alt="music" />
        </TButton>
      ) : (
        <TButton size={'12'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={PlayAudio}>
          <Image key={status} size={'12'} source={musicOff} alt="music" />
        </TButton>
      )}
    </TBox>
  )
}
