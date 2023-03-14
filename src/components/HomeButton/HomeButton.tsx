import { Box, Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'

type Props = {
  onPress: () => void
}

const TButton = styled(Button)
const TBox = styled(Box)

const homeBtn = require('../../../assets/icon/home-btn.png')

export const HomeButton = (props: Props) => {
  return (
    <TBox className="absolute top-4 left-8 z-10">
      <TButton size={'12'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={props.onPress}>
        <Image size={'12'} source={homeBtn} alt="home" />
      </TButton>
    </TBox>
  )
}
