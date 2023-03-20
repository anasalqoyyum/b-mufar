import { Box, Button, Center, Text, Image } from 'native-base'
import { styled } from 'nativewind'
import { LessonType } from '../../../constants/Models/Lesson'
import FlipCard from 'react-native-flip-card'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setMemoryGameState } from '../../../store/slice'

type Props = {
  material: LessonType
  setOpenedCard: (id: string) => void
}

const TButton = styled(Button)
const TImage = styled(Image)
const TCenter = styled(Center)

export const MemoryCard = (props: Props) => {
  const gameState = useAppSelector(state => state.reducer.memoryGameState)
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const { img, ar, id } = props.material

  const openCard = () => {
    if (gameState.chosenCard.length === 2) return
    setIsDisabled(true)
    setIsOpen(true)
    props.setOpenedCard(id)
  }

  const isCardCorrect = (id: string) => {
    return gameState.correctCard.includes(id)
  }

  const isCardChosen = (id: string) => {
    return gameState.chosenCard.includes(id)
  }

  const checkCard = () => {
    const isCorrect = isCardCorrect(id)
    if (!isCorrect) {
      setIsDisabled(false)
      setIsOpen(false)
    } else if (isCorrect) {
      setIsDisabled(true)
      setIsOpen(true)
    }

    const newGameState = {
      ...gameState,
      chosenCard: []
    }

    dispatch(setMemoryGameState(newGameState))
  }

  useEffect(() => {
    const isChosen = isCardChosen(id)
    if (!isChosen) return
    if (gameState.chosenCard.length < 2) return

    setTimeout(checkCard, 500)
  }, [gameState.chosenCard])

  return (
    <TButton bgColor={'none'} onPress={gameState.chosenCard.length === 2 || isDisabled ? null : openCard}>
      <FlipCard flip={isOpen} clickable={false} flipHorizontal={true} flipVertical={false}>
        <Box
          width={['16', '24']}
          height={['24', '32']}
          rounded="lg"
          overflow="hidden"
          borderColor="white"
          borderWidth="3"
          backgroundColor="darkBlue.400"
        />
        <Box
          width={['16', '24']}
          height={['24', '32']}
          rounded="lg"
          overflow="hidden"
          borderColor="white"
          borderWidth="3"
          backgroundColor="coolGray.50">
          <TCenter className="mt-1">
            <TImage className="z-10" size={['12', '16']} source={img} alt="image" />
            <Text marginTop={'2'} fontSize={['9', '11']} fontWeight={'semibold'}>
              {ar}
            </Text>
            <Text marginTop={'1'} fontSize={['8', '10']} fontWeight={'semibold'}>
              {id}
            </Text>
          </TCenter>
        </Box>
      </FlipCard>
    </TButton>
  )
}