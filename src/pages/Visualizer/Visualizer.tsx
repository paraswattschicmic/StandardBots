/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable spaced-comment */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useRef, useState } from 'react'
import {
  Scene,
  Engine,
  Color4,
  Color3,
  Vector3,
  Database,
  ArcRotateCamera,
  StandardMaterial,
  MeshBuilder,
  Viewport,
  HemisphericLight,
  SceneLoader,
  Texture,
  Vector4,
  ArcRotateCameraPointersInput,
  PickingInfo,
  Animation,
  CubicEase,
  EasingFunction,
  AbstractMesh,
  Quaternion
} from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials'
import '@babylonjs/loaders'

import './index.css'
let joint_1: AbstractMesh | null,
  joint_2: AbstractMesh | null,
  joint_3: AbstractMesh | null,
  joint_4: AbstractMesh | null,
  joint_5: AbstractMesh | null,
  joint_0: AbstractMesh | null,
  gripper_Joint_Inner_Left: AbstractMesh | null,
  gripper_Joint_Outer_Left: AbstractMesh | null,
  gripper_Joint_Inner_Right: AbstractMesh | null,
  gripper_Joint_Outer_Right: AbstractMesh | null,
  gripper_Tip_Left: AbstractMesh | null,
  gripper_Tip_Right: AbstractMesh | null
const C2M = 0x10000000
export const SceneComponent = (props: any) => {
  const reactCanvas = useRef<null | HTMLCanvasElement>(null)
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onSceneReady, isModalLoaded, colorValue, ...rest } = props

  const [loaded, setLoaded] = useState(false)
  const [scene, setScene] = useState<Scene | null>(null)

  useEffect(() => {
    if (window) {
      const resize = () => {
        if (scene != null) {
          scene.getEngine().resize()
        }
      }
      window.addEventListener('resize', resize)

      return () => {
        window.removeEventListener('resize', resize)
      }
    }
    return () => { }
  }, [scene])

  useEffect(() => {
    if (!loaded && reactCanvas.current) {
      setLoaded(true)
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio)

      engine.enableOfflineSupport = true
      const scene = new Scene(engine, sceneOptions)
      scene.clearColor = new Color4(255, 255, 255, 1.0)
      setScene(scene)
      if (scene.isReady()) {
        props.onSceneReady(scene)
      } else {
        scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene))
      }

      engine.runRenderLoop(() => {
        scene.render()
      })
    }

    return () => {
      if (scene !== null) {
        console.error('disposing of scene')
        scene.dispose()
        setLoaded(false)
      }
    }
  }, [])

  return (
    <div className="row">
      <div className="container-fluid">
        <canvas id="canvasId" style={{ width: '100%', height: '100%' }} ref={reactCanvas} {...rest} />
        {/* {!isModalLoaded ? (
          <div className={'loading-div'}>
            <div className="loader"></div>
          </div>
        ) : null} */}
      </div>
    </div>
  )
}

// For now I'm thinking the main way to control the VisulizerComponent will be declaratively through props.
// At some point, we may want to add a ref to an object that exposes an API.
export interface VisulizerComponentProps {
  joint0Radians: number
  joint1Radians: number
  joint2Radians: number
  joint3Radians: number
  joint4Radians: number
  joint5Radians: number
  colorValue: string
  backgroundColor: string
  gripperSize: number
}



const VisulizerComponent = ({
  joint0Radians,
  joint1Radians,
  joint2Radians,
  joint3Radians,
  joint4Radians,
  joint5Radians,
  colorValue,
  backgroundColor,
  gripperSize
}: VisulizerComponentProps) => {
  const [isModalLoaded, setIsModalLoaded] = useState(false)
  const [scene, setScene] = useState<Scene | null>(null)
  const [radianstoDegreeFactor] = useState(57.2958)

  // useEffect(() => {

  //   document.addEventListener('scroll', () => {
  //   })
  //   return () => {
  //     document.removeEventListener('scroll', () => {
  //       document.getElementById('canvasId').onwheel = (event) => {
  //         event.preventDefault()
  //       }
  //     })
  //   }
  // }, [])

  // if (document && document.getElementById('canvasId') !== null) {
  //   document.getElementById('canvasId').onwheel = (event) => {
  //     event.preventDefault()
  //   }
  // }


  // function to convert rgba values to array
  const colorValues = (color: any) => {
    if (color === '') return
    if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0]
    if (color[0] === '#') {
      if (color.length < 7) {
        // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
        color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '')
      }
      return [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
        color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1
      ]
    }
    if (color.indexOf('rgb') === -1) {
      // convert named colors
      var temp_elem = document.body.appendChild(document.createElement('fictum')) // intentionally use unknown tag to lower chances of css rule override with !important
      var flag = 'rgb(1, 2, 3)' // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
      temp_elem.style.color = flag
      if (temp_elem.style.color !== flag) return // color set failed - some monstrous css rule is probably taking over the color of our object
      temp_elem.style.color = color
      if (temp_elem.style.color === flag || temp_elem.style.color === '') return // color parse failed
      color = getComputedStyle(temp_elem).color
      document.body.removeChild(temp_elem)
    }
    if (color.indexOf('rgb') === 0) {
      if (color.indexOf('rgba') === -1) color += ',1' // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
      return color.match(/[\.\d]+/g).map(function (a: number) {
        return +a
      })
    }
  }
  const UpdateArmAngle = (joint: AbstractMesh | null, angle: number, axis: Vector3) => {
    if (joint) {
      // console.log(joint && joint.rotation, 'angle', angle)
      // angle = 1.57
      let quaternion = Quaternion.RotationAxis(axis, angle)
      joint.rotationQuaternion = quaternion
      // if (axis == 0) {
      //   joint.rotation.x = angle
      // } else if (axis == 1) {
      //   joint.rotation.y = angle
      // } else {
      //   joint.rotation.z = angle
      // }
    }
  }

  const setJointPosition = (
    joint0Radians: number,
    joint1Radians: number,
    joint2Radians: number,
    joint3Radians: number,
    joint4Radians: number,
    joint5Radians: number
  ) => {
    UpdateArmAngle(joint_0, joint0Radians, new Vector3(0, 1, 0))
    UpdateArmAngle(joint_1, joint1Radians, new Vector3(0, 0, 1))
    UpdateArmAngle(joint_2, joint2Radians, new Vector3(0, 1, 0))
    UpdateArmAngle(joint_3, joint3Radians, new Vector3(0, 0, 1))
    UpdateArmAngle(joint_4, joint4Radians, new Vector3(0, 1, 0))
    UpdateArmAngle(joint_5, joint5Radians, new Vector3(0, 0, 1))
  }

  const setGripperOpenSize = (sizeValue: number) => {
    // sizeValue = 100
    if (sizeValue < 0) {
      sizeValue = 0
    } else if (sizeValue > 100) {
      sizeValue = 100
    }
    var gripperArmAngle = sizeValue - 30.0
    var angleinradian = gripperArmAngle / radianstoDegreeFactor
    if (gripper_Joint_Inner_Left) {
      gripper_Joint_Inner_Left.rotation.z = -angleinradian
    }
    if (gripper_Joint_Outer_Left) {
      gripper_Joint_Outer_Left.rotation.z = -angleinradian
    }

    if (gripper_Joint_Inner_Right) {
      gripper_Joint_Inner_Right.rotation.z = angleinradian
    }
    if (gripper_Joint_Outer_Right) {
      gripper_Joint_Outer_Right.rotation.z = angleinradian
    }

    if (gripper_Tip_Left) {
      gripper_Tip_Left.rotation.z = angleinradian
    }
    if (gripper_Tip_Right) {
      gripper_Tip_Right.rotation.z = -angleinradian
    }
  }
  const onSceneReady = (scene: Scene) => {
    setScene(scene)

    scene.imageProcessingConfiguration.contrast = 2
    scene.imageProcessingConfiguration.exposure = 1.5
    scene.imageProcessingConfiguration.toneMappingEnabled = true
    //Initialize the first camera
    var camera = new ArcRotateCamera('Camera', -Math.PI * 0.5, 1.1903662489867926, 50, Vector3.Zero(), scene)
    SceneLoader.ImportMeshAsync('', '/', 'SampleScene2.babylon', scene)
      .then(() => {
        // console.log('result', result)
        // for (let i = 0; i < result!.meshes!.length; i++) {
        //   let meshes = result.meshes
        //   console.log('MeshName is: ', meshes[i].name)
        // }
        setIsModalLoaded(true)
        //Rotate on Z
        joint_0 = scene.getMeshByName('Joint1')
        //Rotate on Y
        joint_1 = scene.getMeshByName('Joint2')
        //Rotate on z
        joint_2 = scene.getMeshByName('Joint3')
        //Rotate on Y
        joint_3 = scene.getMeshByName('Joint4')
        //Rotate on Z
        joint_4 = scene.getMeshByName('Joint5')
        //Rotate on z
        joint_5 = scene.getMeshByName('Joint6')
        // let joint_7 = scene.getMeshByName('Joint7')
        // let joint_8 = scene.getMeshByName('Joint8')

        joint_0!.setPivotPoint(new Vector3(0, 0, 0))

        // Get Gripper Meshes
        gripper_Joint_Inner_Left = scene.getMeshByName('polySurface1')
        gripper_Joint_Outer_Left = scene.getMeshByName('polySurface2')
        gripper_Joint_Inner_Right = scene.getMeshByName('polySurface3')
        gripper_Joint_Outer_Right = scene.getMeshByName('polySurface4')
        gripper_Tip_Left = scene.getMeshByName('polySurface5')
        gripper_Tip_Right = scene.getMeshByName('polySurface6')
        setJointPosition(0, 0, 0, 0, 0, 0)
      })
      .catch(error => {
        console.log('error', error)
      })
    const canvas = scene.getEngine().getRenderingCanvas()

    // MeshBuilder.CreateBox("Box2", { size: 2 }, scene);
    if (!canvas) {
      console.warn('scene does not have canvas')
      return
    }
    if (canvas) {
      canvas.addEventListener("mouseover", function () {
        document!.getElementById("canvasId")!.onwheel = (event) => {
          event.preventDefault()
        }
      })
    }

    camera.panningSensibility = 1500
    camera.wheelPrecision = 80
    camera.angularSensibilityX = 1500
    camera.angularSensibilityY = 1500
    camera.attachControl(canvas, true)
    camera.allowUpsideDown = true // don't allow inversing camera
    camera.upperRadiusLimit = 100
    camera.minZ = 0
    scene.activeCameras.push(camera)

    //Initialize the Second camera
    var camera2 = new ArcRotateCamera('Camera2', -Math.PI * 0.5, 1.1903662489867926, 12, Vector3.Zero(), scene)
    camera2.lowerRadiusLimit = camera2.upperRadiusLimit = camera2.radius
      //Set to use only left mouse button
      ; (camera2.inputs.attached.pointers as ArcRotateCameraPointersInput).buttons = [0]

    // Observe changes in second camera alpha and beta and set alpha and beta for the first camera
    camera2.onViewMatrixChangedObservable.add(() => {
      setCameraPosition(camera2.alpha, camera2.beta, camera)
    })

    camera.onViewMatrixChangedObservable.add(() => {
      setCameraPosition(camera.alpha, camera.beta, camera2)
    })
    // Disable zoom on second camera
    camera2.inputs.attached['mousewheel'].detachControl(canvas)
    camera2.attachControl(canvas, true)
    camera2.panningSensibility = 0
    camera2.angularSensibilityX = 100
    camera2.angularSensibilityY = 100
    camera2.layerMask = C2M
    camera2.viewport = new Viewport(0.8, 0.75, 0.3, 0.3)
    camera2.alpha = camera.alpha
    camera2.beta = camera.beta
    scene.activeCameras.push(camera2)

    var groundMaterial = new GridMaterial('groundMaterial', scene)
    groundMaterial.majorUnitFrequency = 5
    groundMaterial.minorUnitVisibility = 0.45
    groundMaterial.gridRatio = 5
    groundMaterial.backFaceCulling = false
    groundMaterial.mainColor = Color3.FromHexString('#6C6C6C')
    groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0)
    groundMaterial.opacity = 0.48

    var ground = MeshBuilder.CreateGround('ground', { width: 150, height: 150 }, scene)
    ground.material = groundMaterial

    scene.cameraToUseForPointers = camera2
    /*********************Create Box***************/

    var light2 = new HemisphericLight('light2', new Vector3(0, 1, 0), scene)
    light2.intensity = 0.5

    var light1 = new HemisphericLight('light1', new Vector3(0, -1, 0), scene)
    light1.intensity = 0.5

    var mat = new StandardMaterial('mat', scene)
    var texture = new Texture('https://dl.dropbox.com/s/zlt67vh1fn5h5bh/SampleImage.png', scene)
    mat.diffuseTexture = texture

    var columns = 6 // 6 columns
    var rows = 1 // 1 row
    //alien sprite
    var faceUV = new Array(6)
    //set all faces to same
    for (var i = 0; i < 6; i++) {
      faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows)
    }
    //wrap set
    var options = {
      faceUV,
      wrap: true,
      size: 2.5
    }
    var box = MeshBuilder.CreateBox('box', options, scene)
    box.material = mat
    box.layerMask = C2M

    // Observe pointer movements to enable and disable rotation controls and change mouse cursor
    scene.onPointerMove = function (ev: PointerEvent) {
      if (ev.y >= 0 && ev.y <= 160 && ev.x <= window.innerWidth && ev.x >= window.innerWidth - 200) {
        camera2.attachControl(canvas, true)
        canvas.style.cursor = 'move'
      } else {
        canvas.style.cursor = 'default'
        camera2.detachControl(canvas)
      }
    }

    //Check click on the scene and if any box face is clicked rotate the ground to that position
    scene.onPointerUp = function (ev: PointerEvent, pickResult: PickingInfo | null) {
      ev.preventDefault()
      if (pickResult && pickResult.hit) {
        if (pickResult!.pickedMesh && pickResult!.pickedMesh!.id === 'box') {
          let face = Math.floor(pickResult.faceId / 2)
          if (face === 0) {
            spinTo('alpha', -Math.PI * 1.5, 100, camera)
            spinTo('beta', Math.PI * 0.5, 100, camera)
            spinTo('alpha', -Math.PI * 1.5, 100, camera2)
            spinTo('beta', Math.PI * 0.5, 100, camera2)
          }
          if (face === 1) {
            spinTo('alpha', -Math.PI * 0.5, 100, camera)
            spinTo('beta', Math.PI * 0.5, 100, camera)
            spinTo('alpha', -Math.PI * 0.5, 100, camera2)
            spinTo('beta', Math.PI * 0.5, 100, camera2)
          }
          if (face === 2) {
            spinTo('alpha', 0, 100, camera)
            spinTo('beta', Math.PI * 0.5, 100, camera)
            spinTo('alpha', 0, 100, camera2)
            spinTo('beta', Math.PI * 0.5, 100, camera2)
          }
          if (face === 3) {
            spinTo('alpha', -Math.PI, 100, camera)
            spinTo('beta', Math.PI * 0.5, 100, camera)
            spinTo('alpha', -Math.PI, 100, camera2)
            spinTo('beta', Math.PI * 0.5, 100, camera2)
          }
          if (face === 4) {
            spinTo('alpha', -Math.PI * 0.5, 100, camera)
            spinTo('beta', 0, 100, camera)
            spinTo('alpha', -Math.PI * 0.5, 100, camera2)
            spinTo('beta', 0, 100, camera2)
          }
          if (face === 5) {
            spinTo('alpha', -Math.PI * 0.5, 100, camera)
            spinTo('beta', Math.PI, 100, camera)
            spinTo('alpha', -Math.PI * 0.5, 100, camera2)
            spinTo('beta', Math.PI, 100, camera2)
          }
        }
      }
    }
  }
  const spinTo = (whichprop: any, targetval: any, speed: number, camera: ArcRotateCamera) => {
    // console.log('gherssss')
    var ease = new CubicEase()
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
    Animation.CreateAndStartAnimation('at4', camera, whichprop, speed, 120, camera[whichprop], targetval, 0, ease)
  }
  const setCameraPosition = (alpha: number, beta: number, camera: ArcRotateCamera) => {
    camera.alpha = alpha
    camera.beta = beta
  }

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  useEffect(() => {
    setJointPosition(joint0Radians, joint1Radians, joint2Radians, joint3Radians, joint4Radians, joint5Radians)
  }, [joint0Radians, joint1Radians, joint2Radians, joint3Radians, joint4Radians, joint5Radians])
  useEffect(() => {
    if (scene) {
      if (colorValue === 'white') {
        scene!.clearColor = new Color4(255, 255, 255, 1.0)
      } else {
        scene!.clearColor = new Color4(0, 0, 0, 1.0)
      }
    }
  }, [colorValue])

  useEffect(() => {
    if (scene) {
      let colorArray = colorValues(backgroundColor)
      scene!.clearColor = new Color4(colorArray[0] / 255, colorArray[1] / 255, colorArray[2] / 255, colorArray[3])
    }
  }, [backgroundColor])
  useEffect(() => {
    setGripperOpenSize(gripperSize)
  }, [gripperSize])

  useEffect(() => {
    Database.IDBStorageEnabled = true
  }, [])

  return <SceneComponent colorValue={colorValue} antialias onSceneReady={onSceneReady} isModalLoaded={isModalLoaded} />
}

export default VisulizerComponent
