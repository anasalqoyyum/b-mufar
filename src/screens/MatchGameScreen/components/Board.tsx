import { Box, Center, Flex, Heading, Text, View } from 'native-base'
import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { DraxProvider, DraxView, DraxSnapbackTargetPreset } from 'react-native-drax'
import { LessonType } from '../../../constants/Models/Lesson'
import { Image } from '@rneui/themed'
import { ActivityIndicator } from 'react-native'

interface WordBlockProps {
  name: string
  currentMoving: string
  setCurrentMoving: (val: string) => void
  setPoint: (type?: 'plus' | 'minus' | 'sameMinus' | 'samePlus') => void
  setCount: (isBank?: boolean) => void
}

interface MatchUpProps {
  setIsWin: (val: boolean) => void
  setPoint: (val: number) => void
  point: number
  gameSize: number
  roundSize: number
  totalRound: number
  section: number
  board: Record<string, LessonType[]>
  goNextSection: () => void
}

const TCenter = styled(Center)
const TView = styled(View)
const TFlex = styled(Flex)
const TText = styled(Text)
const THeading = styled(Heading)

const WordBlock = ({ name, setCurrentMoving, setCount }: Omit<WordBlockProps, 'currentMoving' | 'setPoint'>) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <DraxView
      // style={[styles.wordBlock, styles.centeredContent]}
      style={[styles.wordBlock, styles.centeredContent, !isVisible && styles.invisible]}
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      onDragStart={() => {
        setCurrentMoving('fromBlock')
      }}
      onDragEnd={() => {
        setCurrentMoving('')
      }}
      onDragDrop={() => {
        setCount()
        setCurrentMoving('')
      }}
      dragPayload={{ text: name, setIsVisible }}>
      <Text fontFamily={'Traditional Arabic Bold'} numberOfLines={1} adjustsFontSizeToFit fontSize={'2xl'} textAlign={'center'}>
        {name}
      </Text>
    </DraxView>
  )
}

const WordBlockBank = ({ name, currentMoving, setPoint, setCurrentMoving }: WordBlockProps) => {
  const [isCorrect, setIsCorrect] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentName, setCurrentName] = useState('')

  return (
    <DraxView
      style={[styles.centeredContent, styles.receptive, isVisible ? styles.wordBlock : styles.wordBlockBank]}
      otherDraggingStyle={styles.receiving}
      // TODO: Debugging Purpose
      // receivingStyle={styles.receiving}
      receptive={isVisible ? currentMoving !== 'fromBlock' : true}
      onReceiveDragDrop={({ dragged: { payload } }) => {
        if (!isCorrect && name === payload.text) {
          setPoint('plus')
          setIsCorrect(true)
        }

        setCurrentName(payload.text)

        // IF BOTH OF THEM ALREADY HAS VALUE
        if (currentName && isVisible) {
          payload.setCurrentName(currentName)
          setIsVisible(true)

          if (isCorrect && payload.isCorrect) {
            setPoint('sameMinus')
            setIsCorrect(false)
            payload.setIsCorrect(false)
          } else if (!isCorrect && !payload.isCorrect && name === payload.text && payload.name === currentName) {
            setPoint('samePlus')
            setIsCorrect(true)
            payload.setIsCorrect(true)
          } else if (!isCorrect && !payload.isCorrect && name !== payload.text && payload.name === currentName) {
            setPoint('plus')
            setIsCorrect(false)
            payload.setIsCorrect(true)
          } else if (isCorrect && !payload.isCorrect) {
            setPoint('minus')
            setIsCorrect(false)
            payload.setIsCorrect(false)
          } else if (!isCorrect && payload.isCorrect && name === payload.text && payload.name === currentName) {
            setPoint('plus')
            setIsCorrect(true)
            payload.setIsCorrect(false)
          }
        } else {
          setIsVisible(true)
          payload.setIsVisible(false)
        }
        return DraxSnapbackTargetPreset.None
      }}
      dragPayload={{ text: currentName, name, isCorrect, setIsVisible, setCurrentName, setIsCorrect }}
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      onDragStart={() => {
        setCurrentMoving(currentName)
      }}
      onDragEnd={() => {
        setCurrentMoving('')
      }}
      onDragDrop={() => {
        if (isCorrect) {
          setPoint('minus')
          setIsCorrect(false)
        }
        setCurrentMoving('')
      }}>
      {/* <Text>{isCorrect ? 'true' : 'false'}</Text> */}
      <Text
        fontFamily={'Traditional Arabic Bold'}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={isVisible ? null : styles.hidden}
        fontSize={'2xl'}
        textAlign={'center'}>
        {currentName}
      </Text>
    </DraxView>
  )
}

const Card = ({ material }: { material: LessonType }) => {
  const { img, id } = material

  return (
    <View
      style={[styles.card]}
      width={['50px', '60px', '90px']}
      height={['75px', '75px', '105px']}
      rounded="lg"
      overflow="hidden"
      borderColor="white"
      borderWidth="3"
      alignContent={'center'}
      alignSelf={'center'}
      backgroundColor="coolGray.50">
      <TCenter className="mt-1">
        <Image style={[styles.image, { width: 40, height: 40 }]} PlaceholderContent={<ActivityIndicator />} source={img} alt="image" />
        <Text
          marginTop={'2'}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          fontSize={['9', '9', '12']}
          textAlign={'center'}
          fontWeight={'semibold'}>
          {id}
        </Text>
      </TCenter>
    </View>
  )
}

export const MatchUpBoard = (props: MatchUpProps) => {
  const { setIsWin, setPoint, point, gameSize, board, goNextSection, roundSize, totalRound, section } = props
  // No need currentMoving
  const [currentMoving, setCurrentMoving] = useState('')
  const [count, setCount] = useState(0)
  // const [point, setPoint] = useState(0)

  if (count === gameSize) {
    setIsWin(true)
  }

  const checkSectionDone = count !== 0 && count % roundSize === 0 && count <= gameSize

  const nextSection = () => {
    if (checkSectionDone && section !== totalRound) {
      goNextSection()
    }
  }

  const updatePoint = (type: 'plus' | 'minus' | 'samePlus' | 'sameMinus' = 'plus') => {
    let newPoint = point
    if (type === 'plus') {
      newPoint = newPoint + 1
    } else if (type === 'samePlus') {
      newPoint = newPoint + 2
    } else if (type === 'sameMinus') {
      newPoint = newPoint - 2
    } else {
      newPoint = newPoint - 1
    }

    setPoint(newPoint)
  }

  const updateCounter = (isBank?: boolean) => {
    if (isBank) return
    const newCount = count + 1
    setCount(newCount)
  }

  const updateWin = () => {
    if (count === gameSize) {
      setIsWin(true)
    }
  }

  useEffect(() => {
    setTimeout(nextSection, 1000)
  }, [count])

  const cardNumber = Math.round(roundSize / 2)

  return (
    <DraxProvider>
      <View style={styles.container}>
        {totalRound !== 1 && (
          <TFlex height={'9%'} flexDirection={'row'}>
            <THeading
              size={'sm'}
              fontSize={['2xs', '2xs', 'sm']}
              className="mx-2 rounded-md border border-[#f6a21d] bg-[#fcbf85] py-2 px-4 text-gray-900">
              Ronde {section}
            </THeading>
            <TText
              fontSize={['xs', 'xs', 'sm']}
              fontFamily={'Traditional Arabic Bold'}
              className="mx-2 rounded-md border border-[#f6a21d] bg-[#fcbf85] py-2 px-4 text-gray-900">
              الجَوْلَةُ {section === 1 ? 'الْأُوْلَى' : 'الثَّانِيَةُ'}
            </TText>
            {/* <Text>{point}</Text>
        <Text>{count}</Text> */}
          </TFlex>
        )}
        <View height={'80%'} style={styles.paletteRow}>
          <View style={styles.paletteCol}>
            {board.answer.slice(0, cardNumber).map(val => {
              return <WordBlock key={`c${val.id}`} name={val.ar} setCurrentMoving={setCurrentMoving} setCount={updateCounter} />
            })}
          </View>
          <View style={styles.palette}>
            <View style={styles.paletteRow}>
              {board.question.slice(0, cardNumber).map(val => {
                return (
                  <TView key={`a${val.id}`} className="mx-2">
                    <Card material={val} />
                    <WordBlockBank
                      name={val.ar}
                      currentMoving={currentMoving}
                      setCurrentMoving={setCurrentMoving}
                      setPoint={updatePoint}
                      setCount={updateCounter}
                    />
                  </TView>
                )
              })}
            </View>
            <View style={styles.paletteRow}>
              {board.question.slice(cardNumber).map(val => {
                return (
                  <TView key={`b${val.id}`} className="mx-2">
                    <Card material={val} />
                    <WordBlockBank
                      name={val.ar}
                      currentMoving={currentMoving}
                      setCurrentMoving={setCurrentMoving}
                      setPoint={updatePoint}
                      setCount={updateCounter}
                    />
                  </TView>
                )
              })}
            </View>
          </View>
          <TView style={styles.paletteCol}>
            {board.answer.slice(3).map(val => {
              return <WordBlock key={`c${val.id}`} name={val.ar} setCurrentMoving={setCurrentMoving} setCount={updateCounter} />
            })}
          </TView>
        </View>
      </View>
    </DraxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  receptive: {
    borderColor: '#f6a21d',
    borderWidth: 1
  },
  receiving: {
    borderColor: '#e99126',
    borderWidth: 2
  },
  dragging: {
    opacity: 0
  },
  centeredContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wordBlock: {
    width: 75,
    height: 40,
    borderRadius: 6,
    borderColor: '#f6a21d',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: '#fcbf85'
  },
  wordBlockBank: {
    width: 75,
    height: 40,
    borderRadius: 6,
    borderColor: '#f6a21d',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: '#efefef'
  },
  card: {
    marginBottom: 15
  },
  palette: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 4
  },
  paletteRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8
  },
  paletteCol: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginVertical: 20
  },
  hidden: {
    display: 'none'
  },
  marginTop: {
    marginTop: 2
  },
  invisible: {
    opacity: 0
  },
  image: {
    zIndex: 10
  }
})
