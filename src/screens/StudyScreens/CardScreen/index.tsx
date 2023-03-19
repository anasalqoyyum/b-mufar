import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AspectRatio, Box, Button, Heading, Image, Stack } from 'native-base'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { BackButton } from '../../../components/HomeButton/BackButton'
import { HomeButton } from '../../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { SoundButton } from '../../../components/SoundButton/SoundButton'
import { RootStackParamList } from '../../../navigation/Navigator'
import { getCurrentLesson, getCurrentTitle } from '../../../utils/Commons'

type Props = NativeStackScreenProps<RootStackParamList, 'StudyCardScreen'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgSekolah = require('../../../../assets/background/bg-sekolah.png')
const bgRumah = require('../../../../assets/background/bg-rumah.png')
const bgProfesi = require('../../../../assets/background/bg-profesi.png')
const bgJalan = require('../../../../assets/background/bg-jalan.png')

const prevBtn = require('../../../../assets/icon/arrow-left.png')
const nextBtn = require('../../../../assets/icon/arrow-right.png')

export const StudyCardScreen = (props: Props) => {
  const { materialTheme } = props.route.params
  const [currentCard, setCurrentCard] = useState(0)
  const [_, setPlaying] = useState(false)

  const lesson = getCurrentLesson(materialTheme)
  const maxCardLength = lesson.length - 1

  const getCurrentBackground = () => {
    const { materialTheme } = props.route.params

    switch (materialTheme) {
      case 'profesi':
      case 'arah':
        return bgProfesi
      case 'fasilitasSekolah':
      case 'ruangSekolah':
      case 'peralatanSekolah':
      case 'perangkatKelas':
      case 'warna':
        return bgSekolah
      case 'kosakataAlamat':
      case 'angka':
        return bgJalan
      case 'ruangRumah':
      case 'isiRuang':
      case 'kegiatanHarian':
      case 'anggotaKeluarga':
        return bgRumah
    }
  }

  const nextCard = () => {
    if (currentCard !== maxCardLength) {
      setCurrentCard(currentCard + 1)
    } else {
      return null
    }
  }

  const prevCard = () => {
    if (currentCard !== 0) {
      setCurrentCard(currentCard - 1)
    } else {
      return null
    }
  }

  return (
    <PageWrapper image={getCurrentBackground()}>
      <TBox className="h-full w-full items-center pt-12">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        <TBox className="absolute right-8 top-4">
          <TImage size={'sm'} source={getCurrentTitle(materialTheme)} width={200} height={50} alt="home" />
        </TBox>
        {currentCard !== 0 && (
          <TBox className="absolute left-28 top-36 z-10">
            <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={prevCard}>
              <TImage size={'16'} className="absolute" source={prevBtn} alt="next" />
            </TButton>
          </TBox>
        )}
        <TImage
          key={`${currentCard} ${lesson[currentCard].id}`}
          className="absolute top-16 z-10"
          size={'40'}
          source={lesson[currentCard].img}
          alt="image"
        />
        <Box>
          <Box maxW="64" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" backgroundColor="gray.50">
            <AspectRatio w="100%" />
            <Stack p="4" space={3}>
              <Heading size="md" fontWeight={'semibold'} ml="-1">
                {lesson[currentCard].id}
              </Heading>
              <Heading size={'lg'} fontWeight={'semibold'}>
                {lesson[currentCard].ar}
              </Heading>
            </Stack>
          </Box>
        </Box>
        <SoundButton source={lesson[currentCard].sound} setStatus={setPlaying} />
        {currentCard !== maxCardLength && (
          <TBox className="absolute right-44 top-36 z-10">
            <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={nextCard}>
              <TImage size={'16'} className="absolute" source={nextBtn} alt="next" />
            </TButton>
          </TBox>
        )}
      </TBox>
    </PageWrapper>
  )
}
