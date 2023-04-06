import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AspectRatio, Box, Button, Flex, Image } from 'native-base'
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

const bgMain = require('../../../../assets/background/bg-materi.png')
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
      <TBox className="h-full w-full items-center justify-center pt-4">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.navigate('Main')} />
        <TBox>
          <TImage size={'sm'} source={title} width={['300', '350', '400']} height={50} alt="home" />
        </TBox>
        <TBox className="scale-[.95]">
          <Flex flexDirection={'row'} marginBottom={2}>
            <TButton
              size={['32', '32', '40']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 1 })}>
              <Image size={['32', '32', '40']} source={buttonMap['1Main']} alt="image" />
            </TButton>
            <TButton
              size={['32', '32', '40']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 2 })}>
              <Image size={['32', '32', '40']} source={buttonMap['2Main']} alt="image" />
            </TButton>
            <TButton
              size={['32', '32', '40']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 3 })}>
              <Image size={['32', '32', '40']} source={buttonMap['3Main']} alt="image" />
            </TButton>
          </Flex>
          <Flex flexDirection={'row'}>
            <TButton
              size={['32', '32', '40']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 4 })}>
              <Image size={['32', '32', '40']} source={buttonMap['4Main']} alt="image" />
            </TButton>
            <TButton
              size={['32', '32', '40']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 5 })}>
              <Image size={['32', '32', '40']} source={buttonMap['5Main']} alt="image" />
            </TButton>
            <TButton
              size={['32', '32', '40']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('MaterialSelect', { materialId: 6 })}>
              <Image size={['32', '32', '40']} source={buttonMap['6Main']} alt="image" />
            </TButton>
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
