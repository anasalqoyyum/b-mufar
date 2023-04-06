import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Flex, Heading, Image, Text } from 'native-base'
import { styled } from 'nativewind'
import React, { useState, useEffect } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { Winning } from '../../components/Winning/Winning'
import { LessonType } from '../../constants/Models/Lesson'
import { RootStackParamList } from '../../navigation/Navigator'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { initialMemoryGame, setMemoryGameState } from '../../store/slice'
import { getCurrentBackground, getCurrentLesson, getCurrentMaterial } from '../../utils/Commons'
import { calculateCurrentGameSize } from '../../utils/Game'
import { MaterialType } from '../StudyScreens/MenuScreen/MaterialConstant'
import { MemoryCard } from './components/Card'

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>

const TBox = styled(Box)
const THeading = styled(Heading)
const TText = styled(Text)

const timer = require('../../../assets/icon/timer.png')

export const MemoryGameScreen = (props: Props) => {
  const { materialId } = props.route.params

  const GAME_SIZE = calculateCurrentGameSize('memory', materialId)
  const TOTAL_ROUND = 2
  const ROUND_BOARD_SIZE = Math.round(GAME_SIZE / TOTAL_ROUND)

  const lessons = getCurrentMaterial(materialId)
  const gameState = useAppSelector(state => state.reducer.memoryGameState)
  const dispatch = useAppDispatch()

  const [init, setInit] = useState(false)
  const [board, setBoard] = useState<LessonType[]>([])
  const [time, setTime] = useState(0)
  const [isWin, setIsWin] = useState(false)
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
      const arr = shuffleArray(material.slice(0, ROUND_BOARD_SIZE))

      board = [...arr, ...arr]
      setSelectedMaterial(material)
      setInit(true)
    }

    if (section === 1) {
      dispatch(setMemoryGameState(initialMemoryGame))
    } else if (section >= 2) {
      const nextInitialMemoryGame = {
        ...initialMemoryGame,
        point: gameState.point
      }
      // slice for the next round
      const preProcessArr = shuffleArray(selectedMaterial.slice(ROUND_BOARD_SIZE * (section - 1), ROUND_BOARD_SIZE * section))

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

  const checkSectionDone = gameState.point !== 0 && gameState.point % ROUND_BOARD_SIZE === 0 && gameState.point <= GAME_SIZE

  const goNextSection = () => {
    if (gameState.point === GAME_SIZE) {
      setIsWin(true)
    }

    if (checkSectionDone && section !== TOTAL_ROUND) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time => time + 1)
    }, 1000)

    if (isWin) {
      clearInterval(timer)
      setTime(time)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isWin])

  const formatTime = `${`${Math.floor(time / 60)}`.padStart(2, '0')}:${`${time % 60}`.padStart(2, '0')}`

  return (
    <PageWrapper image={getBg()}>
      <TBox className="h-full w-full items-center pt-5">
        <Flex flexDirection={'row'}>
          <THeading
            size={'md'}
            fontSize={['xs', 'xs', 'lg']}
            className="mx-2 mb-4 rounded-md border border-[#f6a21d] bg-[#fcbf85] py-2 px-4 text-gray-900">
            Ronde {section}
          </THeading>
          <THeading
            size={'md'}
            fontSize={['xs', 'xs', 'lg']}
            className="mx-2 mb-4 rounded-md border border-[#f6a21d] bg-[#fcbf85] py-2 px-4 text-gray-900">
            الجَوْلَةُ {section === 1 ? 'الْأُوْلَى' : 'الثَّانِيَةُ'}
          </THeading>
        </Flex>
        {isWin && <Winning navigation={props.navigation} />}
        <TBox className="absolute top-4 right-8 z-10">
          <Image zIndex={10} size={['12', '12', '16']} source={timer} alt="home" />
          <TBox className="absolute inset-0 z-10 items-center justify-center">
            <TText fontSize={['xs', 'xs', 'md']}>{formatTime}</TText>
          </TBox>
        </TBox>
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
            {board.slice(0, ROUND_BOARD_SIZE).map((val, idx) => {
              return <MemoryCard key={idx + val.id} material={val} setOpenedCard={setOpenedCard} />
            })}
          </Flex>
          <Flex height={['30%', '45%']} flexDirection={'row'}>
            {board.slice(ROUND_BOARD_SIZE).map((val, idx) => {
              return <MemoryCard key={idx + val.id} material={val} setOpenedCard={setOpenedCard} />
            })}
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
