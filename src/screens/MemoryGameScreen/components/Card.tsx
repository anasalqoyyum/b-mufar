import { Box, Button, Center, Heading, Image } from 'native-base'
import { styled } from 'nativewind'
import { LessonType } from '../../../constants/Models/Lesson'
import FlipCard from 'react-native-flip-card'
import { useEffect, useState } from 'react'

type Props = {
  material: Partial<LessonType>
  chosenCard: string[]
  correctCard: string[]
  setChosenCard: (val: string) => void
  isChosen: boolean
  isDisabled: boolean
}

const TButton = styled(Button)
const TImage = styled(Image)
const TCenter = styled(Center)

export const MemoryCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { img, ar, id } = props.material

  const setOpenedCard = () => {
    setIsDisabled(true)
    setIsOpen(true)
    if (id) {
      props.setChosenCard(id)
    }
  }

  const checkCard = () => {
    if (props.chosenCard.length >= 2 && !props.isChosen && !isCorrect) {
      setIsDisabled(false)
      setIsOpen(false)
    } else if (isCorrect) {
      setIsDisabled(true)
      setIsOpen(true)
    }
  }

  const correct = () => {
    if (props.isChosen) {
      setIsCorrect(true)
    }
  }

  useEffect(() => {
    setTimeout(checkCard, 1000)
  }, [props.chosenCard])

  useEffect(() => {
    correct()
  }, [props.correctCard, props.chosenCard])

  return (
    <TButton bgColor={'none'} onPress={isDisabled || props.isDisabled ? null : setOpenedCard}>
      <FlipCard flip={props.isChosen || isOpen} clickable={false} flipHorizontal={true} flipVertical={false}>
        <Box width={'24'} height={'32'} rounded="lg" overflow="hidden" borderColor="white" borderWidth="3" backgroundColor="darkBlue.400" />
        <Box width={'24'} height={'32'} rounded="lg" overflow="hidden" borderColor="white" borderWidth="3" backgroundColor="coolGray.50">
          <TCenter className="mt-1">
            <TImage className="z-10" size={'16'} source={img} alt="image" />
            <Heading marginTop={'4'} size={'sm'} fontWeight={'semibold'}>
              {ar}
            </Heading>
          </TCenter>
        </Box>
      </FlipCard>
    </TButton>
  )
}
