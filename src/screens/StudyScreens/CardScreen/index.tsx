import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AspectRatio, Box, Button, Heading, Image, Stack } from 'native-base'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { BackButton } from '../../../components/HomeButton/BackButton'
import { HomeButton } from '../../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { SoundButton } from '../../../components/SoundButton/SoundButton'
import { Arah } from '../../../constants/lessons/1-Perkenalan/Arah'
import { Profesi } from '../../../constants/lessons/1-Perkenalan/Profesi'
import { FasilitasSekolah } from '../../../constants/lessons/2-Fasilitas/FasilitasSekolah'
import { RuangSekolah } from '../../../constants/lessons/2-Fasilitas/RuangSekolah'
import { PeralatanSekolah } from '../../../constants/lessons/3-PeralatanSekolah/PeralatanSekolah'
import { PerangkatKelas } from '../../../constants/lessons/3-PeralatanSekolah/PerangkatKelas'
import { Warna } from '../../../constants/lessons/3-PeralatanSekolah/Warna'
import { Alamat } from '../../../constants/lessons/4-Alamat/Alamat'
import { Angka } from '../../../constants/lessons/4-Alamat/Angka'
import { IsiRuangan } from '../../../constants/lessons/5-Rumah/IsiRuangan'
import { RuanganRumah } from '../../../constants/lessons/5-Rumah/RuanganRumah'
import { AnggotaKeluarga } from '../../../constants/lessons/6-Keluarga/Anggota'
import { KegiatanHarian } from '../../../constants/lessons/6-Keluarga/KegiatanHarian'
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
  const [_playing, setPlaying] = useState(false)

  const getCurrentLesson = () => {
    const { materialTheme } = props.route.params

    switch (materialTheme) {
      case 'profesi':
        return Profesi
      case 'arah':
        return Arah
      case 'fasilitasSekolah':
        return FasilitasSekolah
      case 'ruangSekolah':
        return RuangSekolah
      case 'peralatanSekolah':
        return PeralatanSekolah
      case 'perangkatKelas':
        return PerangkatKelas
      case 'warna':
        return Warna
      case 'kosakataAlamat':
        return Alamat
      case 'angka':
        return Angka
      case 'ruangRumah':
        return RuanganRumah
      case 'isiRuang':
        return IsiRuangan
      case 'kegiatanHarian':
        return KegiatanHarian
      case 'anggotaKeluarga':
        return AnggotaKeluarga
    }
  }

  const lesson = getCurrentLesson()
  const maxCardLength = lesson.length - 1

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
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center pt-12">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        <TBox className="absolute right-8 top-4">
          <TImage size={'sm'} source={title} width={200} height={50} alt="home" />
        </TBox>
        {currentCard !== 0 && (
          <TBox className="absolute left-28 top-36 z-10">
            <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={prevCard}>
              <TImage size={'16'} className="absolute" source={prevBtn} alt="next" />
            </TButton>
          </TBox>
        )}
        <TImage key={currentCard} className="absolute top-16 z-10" size={'40'} source={lesson[currentCard].img} alt="image" />
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
