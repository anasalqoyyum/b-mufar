import { Audio } from 'expo-av'
import { Box, Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'

type Props = {
  source: any
  setStatus: (val: boolean) => void
}

const TButton = styled(Button)
const TBox = styled(Box)

const soundBtn = require('../../../assets/icon/sound-start.png')

export const SoundButton = (props: Props) => {
  const [sound, setSound] = useState<any>(null)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(props.source)
    props.setStatus(true)
    setSound(sound)

    await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
          props.setStatus(false)
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <TBox className="absolute top-16 left-56 z-20">
      <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={playSound}>
        <Image size={'16'} source={soundBtn} alt="music" />
      </TButton>
    </TBox>
  )
}
