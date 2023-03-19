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

const bgSekolah = require('../../../../assets/background/bg-sekolah.png')
const bgRumah = require('../../../../assets/background/bg-rumah.png')
const bgProfesi = require('../../../../assets/background/bg-profesi.png')
const bgJalan = require('../../../../assets/background/bg-jalan.png')

const title11 = require('../../../../assets/title/1-1.png')
const title12 = require('../../../../assets/title/1-2.png')
const title21 = require('../../../../assets/title/2-1.png')
const title22 = require('../../../../assets/title/2-2.png')
const title31 = require('../../../../assets/title/3-1.png')
const title32 = require('../../../../assets/title/3-2.png')
const title33 = require('../../../../assets/title/3-3.png')
const title41 = require('../../../../assets/title/4-1.png')
const title42 = require('../../../../assets/title/4-2.png')
const title51 = require('../../../../assets/title/5-1.png')
const title52 = require('../../../../assets/title/5-2.png')
const title61 = require('../../../../assets/title/6-1.png')
const title62 = require('../../../../assets/title/6-2.png')

const prevBtn = require('../../../../assets/icon/arrow-left.png')
const nextBtn = require('../../../../assets/icon/arrow-right.png')

export const StudyCardScreen = (props: Props) => {
  const [currentCard, setCurrentCard] = useState(0)
  const [_, setPlaying] = useState(false)

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

  const getCurrentTitle = () => {
    const { materialTheme } = props.route.params

    switch (materialTheme) {
      case 'profesi':
        return title11
      case 'arah':
        return title12
      case 'fasilitasSekolah':
        return title22
      case 'ruangSekolah':
        return title21
      case 'peralatanSekolah':
        return title31
      case 'perangkatKelas':
        return title32
      case 'warna':
        return title33
      case 'kosakataAlamat':
        return title41
      case 'angka':
        return title42
      case 'ruangRumah':
        return title51
      case 'isiRuang':
        return title52
      case 'kegiatanHarian':
        return title61
      case 'anggotaKeluarga':
        return title62
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
          <TImage size={'sm'} source={getCurrentTitle()} width={200} height={50} alt="home" />
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
