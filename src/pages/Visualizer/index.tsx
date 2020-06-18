import React, { useState } from 'react'
import SplitPane from 'react-split-pane'
import VisulizerComponent from './Visualizer'
import ApiForm from './ApiForm'
// import Split from 'react-split'

const Visulizer = () => {
  const [joint0, setJoint0] = useState(0)
  const [joint1, setJoint1] = useState(0)
  const [joint2, setJoint2] = useState(0)
  const [joint3, setJoint3] = useState(0)
  const [joint4, setJoint4] = useState(0)
  const [joint5, setJoint5] = useState(0)
  const [joint6, setJoint6] = useState(0)
  const [joint7, setJoint7] = useState(0)
  const [joint8, setJoint8] = useState(0)

  const [colorValue, setColorValue] = useState('white')
  const [gripperSize, setGripperSize] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const changeValuesInVisulizer = (
    joint0: number,
    joint1: number,
    joint2: number,
    joint3: number,
    joint4: number,
    joint5: number,
    joint6: number,
    joint7: number,
    joint8: number,
    colorValue: string,
    gripperSize: number,
    backgroundColor: string
  ) => {
    setJoint0(joint0)
    setJoint1(joint1)
    setJoint2(joint2)
    setJoint3(joint3)
    setJoint4(joint4)
    setJoint5(joint5)
    setJoint6(joint6)
    setJoint7(joint7)
    setJoint8(joint8)
    setColorValue(colorValue)
    setGripperSize(gripperSize)
    setBackgroundColor(backgroundColor)
  }
  return (
    // <div>
    <SplitPane split="horizontal" size={'100%'} maxSize={'100%'}>
      <SplitPane size={'50%'} maxSize={'50%'} minSize={'30%'}>
        <VisulizerComponent
          joint0Radians={joint0}
          joint1Radians={joint1}
          joint2Radians={joint2}
          joint3Radians={joint3}
          joint4Radians={joint4}
          joint5Radians={joint5}
          joint6Radians={joint6}
          joint7Radians={joint7}
          joint8Radians={joint8}
          colorValue={colorValue}
          gripperSize={gripperSize}
          backgroundColor={backgroundColor}
        />
      </SplitPane>
      <SplitPane size={'50%'} maxSize={'70%'} minSize={'50%'}>
        <ApiForm
          changeValuesInVisulizer={(
            joint0: number,
            joint1: number,
            joint2: number,
            joint3: number,
            joint4: number,
            joint5: number,
            joint6: number,
            joint7: number,
            joint8: number,
            colorValue: string,
            gripperSize: number,
            backgroundColor: string
          ) =>
            changeValuesInVisulizer(
              joint0,
              joint1,
              joint2,
              joint3,
              joint4,
              joint5,
              joint6,
              joint7,
              joint8,
              colorValue,
              gripperSize,
              backgroundColor
            )
          }
        />
      </SplitPane>
    </SplitPane>
    // </div>
  )
}

export default Visulizer
