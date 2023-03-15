import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AspectRatio, Box, Button, Heading, Image, Stack } from 'native-base'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { BackButton } from '../../../components/HomeButton/BackButton'
import { HomeButton } from '../../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { SoundButton } from '../../../components/SoundButton/SoundButton'
import { Profesi } from '../../../constants/lessons/1-Perkenalan/Profesi'
import { RootStackParamList } from '../../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'StudyCardScreen'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgMain = require('../../../../assets/background/bg-main.png')
const title = require('../../../../assets/title/temabelajar-title.png')
const prevBtn = require('../../../../assets/icon/arrow-left.png')
const nextBtn = require('../../../../assets/icon/arrow-right.png')

export const StudyCardScreen = (props: Props) => {
  const [currentCard, setCurrentCard] = useState(0)
  const [playing, setPlaying] = useState(false)
  const maxCardLength = Profesi.length - 1

  const nextCard = () => {
    if (currentCard !== maxCardLength && !playing) {
      setCurrentCard(currentCard + 1)
    } else {
      return null
    }
  }

  const prevCard = () => {
    if (currentCard !== 0 && !playing) {
      setCurrentCard(currentCard - 1)
    } else {
      return null
    }
  }

  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center pt-12">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        <TImage className="absolute bottom-36 left-4 scale-[.15]" source={title} alt="home" />
        {currentCard !== 0 && (
          <TBox className="absolute left-44 top-36 z-10">
            <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={prevCard}>
              <TImage size={'16'} className="absolute" source={prevBtn} alt="next" />
            </TButton>
          </TBox>
        )}
        <TImage key={currentCard} className="absolute top-16 z-10" size={'40'} source={Profesi[currentCard].img} alt="image" />
        <Box>
          <Box maxW="64" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" backgroundColor="gray.50">
            <AspectRatio w="100%" />
            <Stack p="4" space={3}>
              <Heading size="md" fontWeight={'semibold'} ml="-1">
                {Profesi[currentCard].id}
              </Heading>
              <Heading size={'lg'} fontWeight={'semibold'}>
                {Profesi[currentCard].ar}
              </Heading>
            </Stack>
          </Box>
        </Box>
        <SoundButton source={Profesi[currentCard].sound} setStatus={setPlaying} />
        {currentCard !== maxCardLength && (
          <TBox className="absolute right-[250px] top-36 z-10">
            <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={nextCard}>
              <TImage size={'16'} className="absolute" source={nextBtn} alt="next" />
            </TButton>
          </TBox>
        )}
      </TBox>
    </PageWrapper>
  )
}
