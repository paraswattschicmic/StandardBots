import React, { useEffect, useRef, useState } from "react";
import {
  Scene,
  Engine,
  Color4,
  Color3,
  Vector3,
  ArcRotateCamera,
  StandardMaterial,
  MeshBuilder,
  HemisphericLight,
  Texture,
  Mesh,
  FxaaPostProcess,
  DefaultRenderingPipeline, // PBRMetallicRoughnessMaterial
  // PointLight,
} from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
import "@babylonjs/loaders";

import "./index.css";

export const SceneComponent = (props: any) => {
  const reactCanvas = useRef<null | HTMLCanvasElement>(null);
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions } = props;

  const [loaded, setLoaded] = useState(false);
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    if (window) {
      const resize = () => {
        if (scene != null) {
          scene.getEngine().resize();
        }
      };
      window.addEventListener("resize", resize);

      return () => {
        window.removeEventListener("resize", resize);
      };
    }
    return () => {};
  }, [scene]);

  useEffect(() => {
    if (!loaded && reactCanvas.current) {
      setLoaded(true);
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      var postProcess = new FxaaPostProcess("fxaa", 1.0, null, 0, engine, true);
      console.log("postProcess", postProcess);
      engine.enableOfflineSupport = true;
      const scene = new Scene(engine, sceneOptions);
      scene.clearColor = new Color4(255, 255, 255, 1.0).toLinearSpace();
      setScene(scene);
      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        scene.render();
      });
    }

    return () => {
      if (scene !== null) {
        console.error("disposing of scene");
        scene.dispose();
        setLoaded(false);
      }
    };
  }, []);

  return (
    <div className="row">
      <div className="container-fluid">
        <canvas style={{ width: "100%", height: "100%" }} ref={reactCanvas} />
        {/* {!isModalLoaded ? (
          <div className={"loading-div"}>
            <div className="loader"></div>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

// For now I'm thinking the main way to control the VisulizerComponent will be declaratively through props.
// At some point, we may want to add a ref to an object that exposes an API.
export interface VisulizerComponentProps {}

const VisulizerComponent = ({}: VisulizerComponentProps) => {
  const onSceneReady = (scene: Scene) => {
    var sphere = Mesh.CreateSphere("sphere1", 16, 4, scene);
    sphere.position.y = 1;
    let material = new StandardMaterial("sphereMtl", scene);
    material.diffuseTexture = new Texture("textures/checkerBJS.png", scene);
    // material.diffuseTexture.uScale = 4;
    // material.diffuseTexture.vScale = 2;
    sphere.material = material;
    // scene.createDefaultCameraOrLight(true, true, true);
    var camera = new ArcRotateCamera(
      "Camera",
      -Math.PI * 0.5,
      1.1903662489867926,
      12,
      Vector3.Zero(),
      scene
    );

    var light2 = new HemisphericLight("light2", new Vector3(0, 1, 0), scene);
    light2.intensity = 0.5;

    var light1 = new HemisphericLight("light1", new Vector3(0, -1, 0), scene);
    light1.intensity = 0.5;
    const canvas = scene.getEngine().getRenderingCanvas();

    if (canvas) {
      camera.attachControl(canvas, true);
    }

    scene.clearColor = new Color4(1, 1, 1, 1).toLinearSpace();

    new DefaultRenderingPipeline("pipeline", true, scene, [camera]);
    // pipeline.imageProcessingEnabled = true;
    // pipeline.imageProcessing.vignetteEnabled = true;
    // pipeline.imageProcessing.vignetteWeight = 5;

    var groundMaterial = new GridMaterial("groundMaterial", scene);
    groundMaterial.majorUnitFrequency = 6;
    groundMaterial.minorUnitVisibility = 0.45;
    groundMaterial.gridRatio = 5;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = Color3.FromHexString("#6C6C6C").toLinearSpace();
    groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0).toLinearSpace();
    groundMaterial.opacity = 0.48;

    var ground = MeshBuilder.CreateGround(
      "ground",
      { width: 150, height: 150 },
      scene
    );
    ground.material = groundMaterial;
    return scene;
  };

  return <SceneComponent antialias onSceneReady={onSceneReady} />;
};

export default VisulizerComponent;
