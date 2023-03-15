import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../../components/HomeButton/BackButton'
import { HomeButton } from '../../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'StudyMenu'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgMain = require('../../../../assets/background/bg-main.png')
const title = require('../../../../assets/title/temabelajar-title.png')

const buttonMap = {
  '1Main': require('../../../../assets/material/1/perkenalan.png'),
  '2Main': require('../../../../assets/material/2/fasilitassekolah.png'),
  '3Main': require('../../../../assets/material/3/peralatansekolah.png'),
  '4Main': require('../../../../assets/material/4/alamat.png'),
  '5Main': require('../../../../assets/material/5/rumah.png'),
  '6Main': require('../../../../assets/material/6/keluarga.png')
}

export const StudyMenuScreen = (props: Props) => {
  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center justify-center pt-12">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.navigate('Main')} />
        <TImage className="absolute bottom-36 scale-[.15]" source={title} alt="home" />
        <TBox className="scale-[.9]">
          <Flex width={'3/5'} flexDirection={'row'} flexWrap={'wrap'}>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 1 })}>
              <Image size={'40'} source={buttonMap['1Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 2 })}>
              <Image size={'40'} source={buttonMap['2Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 3 })}>
              <Image size={'40'} source={buttonMap['3Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 4 })}>
              <Image size={'40'} source={buttonMap['4Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 5 })}>
              <Image size={'40'} source={buttonMap['5Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 6 })}>
              <Image size={'40'} source={buttonMap['6Main']} alt="image" />
            </TButton>
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
