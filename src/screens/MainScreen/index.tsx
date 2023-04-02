import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, Text, Box, Stack, Button, Flex } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { RootStackParamList } from '../../navigation/Navigator'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>

const TStack = styled(Stack)
const TFlex = styled(Flex)
const TText = styled(Text)
const TImage = styled(Image)
const TButton = styled(Button)
const TBox = styled(Box)

const bgMain = require('../../../assets/background/bg-main.png')
const textLogo = require('../../../assets/background/text-logo.png')
const playBtn = require('../../../assets/icon/play-btn_text.png')
const bookBtn = require('../../../assets/icon/book-btn_text.png')
const settingBtn = require('../../../assets/icon/help-btn_text.png')
const peopleMain = require('../../../assets/icon/people-main.png')

export const MainScreen = ({ navigation }: Props) => {
  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-3/4 w-full items-center pt-20">
        <TBox className="mb-8 items-center justify-center">
          <TImage className="absolute top-36 right-72 animate-bounce" size={'40'} source={peopleMain} alt="people" />
          <TImage className="mb-4 h-auto w-80 -rotate-6" source={textLogo} alt="logo" />
          <TText className="text-base font-semibold text-yellow-600">Belajar Mufradat Bahasa Arab</TText>
        </TBox>
        <TStack direction={{ base: 'row' }} space={4}>
          <TBox>
            <TButton
              size={'20'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => navigation.navigate('StudyMenu')}
              height={'32'}
              width={'20'}>
              <TImage className="active:bg-black active:bg-opacity-50" height={'32'} width={'20'} source={bookBtn} alt="learn" />
            </TButton>
          </TBox>
          <TBox>
            <TButton
              size={'20'}
              height={'32'}
              width={'20'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => navigation.navigate('GameSelect')}>
              <TImage height={'32'} width={'20'} source={playBtn} alt="play" />
            </TButton>
          </TBox>
        </TStack>
      </TBox>
      <TFlex className="h-1/4 w-full" justifyContent={'space-between'}>
        <TBox className="absolute bottom-4 left-8">
          <TButton
            size={'12'}
            height={'16'}
            width={'32'}
            className="active:translate-y-1 active:opacity-90"
            bgColor={'none'}
            onPress={() => navigation.navigate('Help')}>
            <TImage size={'12'} height={'16'} width={'32'} source={settingBtn} alt="help" />
          </TButton>
        </TBox>
      </TFlex>
    </PageWrapper>
  )
}
