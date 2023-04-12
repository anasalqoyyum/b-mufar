import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Image, Text } from 'native-base'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'GameHelp'>

const TText = styled(Text)
const TImage = styled(Image)
const TBox = styled(Box)
const TButton = styled(Button)

const bgMain = require('../../../assets/background/bg-materi2.png')
const scrollHelp = require('../../../assets/icon/scroll-help.png')
const title = require('../../../assets/title/petunjukBermain.png')
const prevBtn = require('../../../assets/icon/arrow-left.png')
const nextBtn = require('../../../assets/icon/arrow-right.png')

const MemoryGameHelp = () => {
  return (
    <TBox className="ml-4 w-1/2 items-center">
      <TText className="mt-16 mb-2" bold size={'md'} height={['20', '20', '24']} fontSize={'md'}>
        <Text fontWeight={'900'}>Memory Game</Text> dimainkan dengan cara membuka kartu mufrodat yang tertutup dan memasangkannya dengan
        kartu yang sama
      </TText>
      <TText bold size={'md'} height={['8', '8', '10']} fontSize={'md'}>
        <Text fontWeight={'900'}>Teknis Penilaian</Text> (sesuai durasi waktu bermain):
      </TText>
      <TText bold size={'md'} height={['8', '8', '10']} fontSize={'md'}>
        Bintang 3 = 1 menit
      </TText>
      <TText bold size={'md'} height={['8', '8', '10']} fontSize={'md'}>
        Bintang 2 = 2 menit
      </TText>
      <TText bold size={'md'} height={['8', '8', '10']} fontSize={'md'}>
        Bintang 1 = 3 menit/lebih
      </TText>
    </TBox>
  )
}

const MatchHelp = () => {
  return (
    <TBox className="ml-4 w-1/2 items-center">
      <TText className="mt-16 mb-2" bold size={'md'} height={['20', '20', '20']} fontSize={'md'}>
        <Text fontWeight={'900'}>Match Up Game</Text> permainan mencocokkan kosakata bahasa Arab yang dimainkan dengan cara memindahkan kata
        Arab pada kolom kartu yang tersedia
      </TText>
      <TText bold size={'md'} height={['8', '8', '10']} fontSize={'md'}>
        <Text fontWeight={'900'}>Teknis Penilaian</Text> (sesuai skor benar):
      </TText>
      <TText bold size={'md'} height={['12', '12', '12']} fontSize={'md'}>
        Level 1-3: Bintang 1 (skor 1-2), Bintang 2 (skor 3-4), Bintang 3 (skor 5-6)
      </TText>
      <TText bold size={'md'} height={['12', '12', '12']} fontSize={'md'}>
        Level 4-6: Bintang 1 (skor 1-3), Bintang 2 (skor 4-7), Bintang 3 (skor 8-10)
      </TText>
    </TBox>
  )
}

export const GameHelpScreen = (props: Props) => {
  const [currentCard, setCurrentCard] = useState(0)

  const nextCard = () => {
    if (currentCard === 0) {
      setCurrentCard(currentCard + 1)
    } else {
      return null
    }
  }

  const prevCard = () => {
    if (currentCard === 1) {
      setCurrentCard(currentCard - 1)
    } else {
      return null
    }
  }

  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center pt-5">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.navigate('GameSelect')} />
        <TBox>
          <TImage size={'sm'} source={title} width={['300', '350', '400']} height={60} alt="home" />
        </TBox>
        <TBox className="absolute">
          <TImage width={'550'} className="scale-[.9]" source={scrollHelp} alt="scroll" />
        </TBox>
        {currentCard !== 0 && (
          <TBox className="absolute left-4 top-48 z-10">
            <TButton size={['12', '12', '16']} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={prevCard}>
              <TImage size={['12', '12', '16']} className="absolute" source={prevBtn} alt="next" />
            </TButton>
          </TBox>
        )}
        {currentCard !== 0 ? <MatchHelp /> : <MemoryGameHelp />}
        {currentCard !== 1 && (
          <TBox className="absolute right-16 top-48 z-10">
            <TButton size={['12', '12', '16']} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={nextCard}>
              <TImage size={['12', '12', '16']} className="absolute" source={nextBtn} alt="next" />
            </TButton>
          </TBox>
        )}
      </TBox>
    </PageWrapper>
  )
}
