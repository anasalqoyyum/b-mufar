import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Heading, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useState, useEffect } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { LessonType } from '../../constants/Models/Lesson'
import { RootStackParamList } from '../../navigation/Navigator'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { initialMemoryGame, setMemoryGameState } from '../../store/slice'
import { getCurrentBackground, getCurrentLesson, getCurrentMaterial } from '../../utils/Commons'
import { MaterialType } from '../StudyScreens/MenuScreen/MaterialConstant'
import { MemoryCard } from './components/Card'

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>

const TBox = styled(Box)
const THeading = styled(Heading)
const TButton = styled(Button)

const nextBtn = require('../../../assets/icon/arrow-right.png')
const menang = require('../../../assets/icon/menang.png')
const homeBtn = require('../../../assets/icon/home-btn.png')
const backBtn = require('../../../assets/icon/arrow-left.png')
const GAME_SIZE = 10

export const MemoryGameScreen = (props: Props) => {
  const { materialId } = props.route.params

  const lessons = getCurrentMaterial(materialId)
  const gameState = useAppSelector(state => state.reducer.memoryGameState)
  const dispatch = useAppDispatch()

  const [init, setInit] = useState(false)
  const [board, setBoard] = useState<LessonType[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<LessonType[]>([])
  const [section, setSection] = useState(1)

  const createGameBoard = () => {
    let board: LessonType[] = []

    if (!init) {
      let currentMaterial: LessonType[] = []

      for (const [key, _] of Object.entries(lessons)) {
        currentMaterial = [...currentMaterial, ...getCurrentLesson(key as MaterialType)]
      }

      let material = shuffleArray(currentMaterial).slice(0, GAME_SIZE)

      // Add more if it isn't enough
      if (material.length !== GAME_SIZE) {
        const minus = GAME_SIZE - material.length
        const more = shuffleArray(currentMaterial).slice(0, minus)
        material = [...material, ...more]
      }
      const arr = shuffleArray(material.slice(0, 5))

      board = [...arr, ...arr]
      setSelectedMaterial(material)
      setInit(true)
    }

    if (section === 1) {
      dispatch(setMemoryGameState(initialMemoryGame))
    } else if (section === 2) {
      const nextInitialMemoryGame = {
        ...initialMemoryGame,
        point: gameState.point
      }
      const preProcessArr = shuffleArray(selectedMaterial.slice(5, 10))

      board = [...preProcessArr, ...preProcessArr]
      dispatch(setMemoryGameState(nextInitialMemoryGame))
    }

    setBoard(shuffleArray(board))
  }

  const shuffleArray = (array: LessonType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const setOpenedCard = (val: string) => {
    const { chosenCard } = gameState

    if (chosenCard.length === 0) {
      const newVal = chosenCard.concat(val)
      const newGameState = {
        ...gameState,
        chosenCard: newVal
      }

      dispatch(setMemoryGameState(newGameState))
    } else if (chosenCard.length === 1) {
      const { chosenCard, correctCard, point } = gameState
      const newChosenCard = chosenCard.concat(val)

      if (newChosenCard[0] === newChosenCard[1]) {
        const newCorrectCard = correctCard.concat(newChosenCard[0])
        const newGameState = {
          ...gameState,
          chosenCard: newChosenCard,
          correctCard: newCorrectCard,
          point: point + 1
        }

        dispatch(setMemoryGameState(newGameState))
      } else {
        const newGameState = {
          ...gameState,
          chosenCard: newChosenCard
        }

        dispatch(setMemoryGameState(newGameState))
      }
    }
  }

  const checkSectionDone = gameState.point !== 0 && gameState.point % 5 === 0 && gameState.point <= GAME_SIZE

  const goNextSection = () => {
    if (checkSectionDone && section !== GAME_SIZE / 2) {
      setSection(section + 1)
    }
  }

  const getBg = () => {
    let materialTheme: MaterialType = 'profesi'
    for (const [key, _] of Object.entries(lessons)) {
      materialTheme = key as MaterialType
      break
    }
    return getCurrentBackground(materialTheme)
  }

  useEffect(() => {
    createGameBoard()
  }, [section])

  useEffect(() => {
    setTimeout(goNextSection, 1000)
  }, [gameState.point])

  return (
    <PageWrapper image={getBg()}>
      <TBox className="h-full w-full items-center pt-5">
        <THeading size={'md'} className="mb-4 rounded-md bg-amber-400 py-1 px-4 text-gray-100">
          Ronde {section}
        </THeading>
        {gameState.point === GAME_SIZE && (
          <TBox className="absolute top-6 z-30">
            <Image size={'md'} source={menang} width={350} height={350} alt="home" />
            <TBox className="absolute bottom-16 right-24 z-10">
              <TButton
                size={'12'}
                className="active:translate-y-1 active:opacity-90"
                bgColor={'none'}
                onPress={() => props.navigation.navigate('Main')}>
                <Image size={'12'} source={homeBtn} alt="home" />
              </TButton>
            </TBox>
            <TBox className="absolute bottom-16 left-24 z-10">
              <TButton
                size={'12'}
                className="active:translate-y-1 active:opacity-90"
                bgColor={'none'}
                onPress={() => props.navigation.goBack()}>
                <Image size={'12'} source={backBtn} alt="home" />
              </TButton>
            </TBox>
          </TBox>
        )}
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        {/* TODO: FIX THIS LATER */}
        {/* <TBox className="absolute right-8 top-4">
          <TImage size={'sm'} source={getCurrentTitle(materialTheme)} width={200} height={50} alt="home" />
        </TBox> */}
        {/* {!checkSectionDone && (
          <TBox className="absolute right-8 top-52">
            <TButton
              size={'10'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => setSection(section + 1)}>
              <Image size={'10'} source={nextBtn} alt="next" />
            </TButton>
          </TBox>
        )} */}
        <TBox>
          <Flex height={['30%', '45%']} flexDirection={'row'}>
            {board.slice(0, 5).map((val, idx) => {
              return <MemoryCard key={idx + val.id} material={val} setOpenedCard={setOpenedCard} />
            })}
          </Flex>
          <Flex height={['30%', '45%']} flexDirection={'row'}>
            {board.slice(5, 10).map((val, idx) => {
              return <MemoryCard key={idx + val.id} material={val} setOpenedCard={setOpenedCard} />
            })}
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
