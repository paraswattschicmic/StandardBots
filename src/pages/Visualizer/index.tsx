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

  const changeValuesInVisulizer = (joint0: number, joint1: number, joint2: number, joint3: number, joint4: number, joint5: number) => {
    setJoint0(joint0)
    setJoint1(joint1)
    setJoint2(joint2)
    setJoint3(joint3)
    setJoint4(joint4)
    setJoint5(joint5)
  }
  return (
    // <div>
    <SplitPane split="horizontal">
      <SplitPane size={'70%'} maxSize={'70%'} minSize={'30%'}>
        <VisulizerComponent
          joint0Radians={joint0}
          joint1Radians={joint1}
          joint2Radians={joint2}
          joint3Radians={joint3}
          joint4Radians={joint4}
          joint5Radians={joint5}
          colorValue={'black'}
          gripperSize={100}
          backgroundColor={'rgba(255,255,255,1)'}
        />
      </SplitPane>
      <SplitPane size={'30%'} maxSize={'70%'} minSize={'30%'}>
        <ApiForm
          changeValuesInVisulizer={(joint0: number, joint1: number, joint2: number, joint3: number, joint4: number, joint5: number) =>
            changeValuesInVisulizer(joint0, joint1, joint2, joint3, joint4, joint5)
          }
        />
      </SplitPane>
    </SplitPane>
    // </div>
  )
}

export default Visulizer
