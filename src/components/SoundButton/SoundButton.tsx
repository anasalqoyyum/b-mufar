import { Audio } from 'expo-av'
import { Box, Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'

type Props = {
  source: any
}

const TButton = styled(Button)
const TBox = styled(Box)

const soundBtn = require('../../../assets/icon/sound-start.png')

export const SoundButton = (props: Props) => {
  const [sound, setSound] = useState<any>(null)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(props.source)
    setSound(sound)

    await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <TBox className="absolute bottom-8">
      <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={playSound}>
        <Image size={'16'} source={soundBtn} alt="music" />
      </TButton>
    </TBox>
  )
}
