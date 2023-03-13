import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, Text, Box, Stack, Button, Flex } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { ImageBackground } from 'react-native'
import { RootStackParamList } from '../../navigation/Navigator'
import { MusicButton } from '../../components/MusicButton/MusicButton'

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>

const TStack = styled(Stack)
const TFlex = styled(Flex)
const TText = styled(Text)
const TImage = styled(Image)
const TButton = styled(Button)
const TBox = styled(Box)

export const MainScreen = ({ navigation }: Props) => {
  const bgMain = require('../../../assets/background/bg-main.png')
  const textLogo = require('../../../assets/background/text-logo.png')
  const playBtn = require('../../../assets/icon/play-btn.png')
  const bookBtn = require('../../../assets/icon/book-btn.png')
  const settingBtn = require('../../../assets/icon/help-btn.png')
  const peopleMain = require('../../../assets/icon/people-main.png')

  return (
    <TBox>
      <ImageBackground source={bgMain}>
        <TBox className="h-3/4 w-full pt-20 items-center">
          <TBox className="items-center justify-center mb-8">
            <TImage className="absolute top-36 right-72" size={'40'} source={peopleMain} alt="people" />
            <TImage className="-rotate-6 w-80 h-auto mb-4" source={textLogo} alt="logo" />
            <TText className="text-base font-semibold text-yellow-600">Belajar Mufradat Bahasa Arab</TText>
          </TBox>
          <TStack direction={{ base: 'row' }} space={4}>
            <TBox>
              <TButton
                size={'20'}
                className="active:translate-y-1 active:opacity-90"
                bgColor={'none'}
                onPress={() => navigation.navigate('Help')}>
                <TImage className="active:bg-black active:bg-opacity-50" size={'20'} source={bookBtn} alt="learn" />
              </TButton>
            </TBox>
            <TBox>
              <TButton
                size={'20'}
                className="active:translate-y-1 active:opacity-90"
                bgColor={'none'}
                onPress={() => navigation.navigate('Help')}>
                <TImage size={'20'} source={playBtn} alt="play" />
              </TButton>
            </TBox>
          </TStack>
        </TBox>
        <TFlex className="h-1/4 w-full" justifyContent={'space-between'}>
          <TStack className="mt-8 mx-8" direction={{ base: 'row' }} space={4} justifyContent="space-between">
            <TButton
              size={'12'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => navigation.navigate('Help')}>
              <TImage size={'12'} source={settingBtn} alt="help" />
            </TButton>
            <MusicButton />
          </TStack>
        </TFlex>
      </ImageBackground>
    </TBox>
  )
}
