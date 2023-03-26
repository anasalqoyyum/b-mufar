import { Box, Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'

type Props = {
  navigation: any
  time?: number
}

const TBox = styled(Box)
const TButton = styled(Button)

const oneStar = require('../../../assets/icon/1star.png')
const twoStar = require('../../../assets/icon/2star.png')
const threeStar = require('../../../assets/icon/3star.png')
const homeBtn = require('../../../assets/icon/home-btn.png')
const backBtn = require('../../../assets/icon/arrow-left.png')

export const Winning = (props: Props) => {
  const { time = 0 } = props

  const getImage = () => {
    if (time <= 60) {
      return threeStar
    } else if (time > 60 && time <= 120) {
      return twoStar
    } else {
      return oneStar
    }
  }

  return (
    <TBox className="absolute top-6 z-30">
      <Image size={'md'} source={getImage()} width={350} height={350} alt="home" />
      <TBox className="z-100 absolute bottom-16 right-24">
        <TButton
          size={'12'}
          className="active:translate-y-1 active:opacity-90"
          bgColor={'none'}
          onPress={() => props.navigation.navigate('Main')}>
          <Image size={'12'} source={homeBtn} alt="home" />
        </TButton>
      </TBox>
      <TBox className="absolute bottom-16 left-24 z-10">
        <TButton size={'12'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={() => props.navigation.goBack()}>
          <Image size={'12'} source={backBtn} alt="home" />
        </TButton>
      </TBox>
    </TBox>
  )
}
