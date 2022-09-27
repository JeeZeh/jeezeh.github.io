import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const scale = props.scale ?? 1;

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh != null) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={
        active ? [1.5 * scale, 1.5 * scale, 1.5 * scale] : [scale, scale, scale]
      }
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const Controls = ({ controls, setControls }) => {
  const changeScale = (e) => {
    console.log(e.target.valueAsNumber);
    setControls({ ...controls, scale: e.target.valueAsNumber / 10 });
  };

  return (
    <div className="controls">
      <input type="range" onChange={changeScale}></input>
    </div>
  );
};

const SetupContext = () => {
  const three = useThree();
  three.scene.background = new THREE.Color(0x2a2a2a);

  return null;
};

const App = () => {
  const [controls, setControls] = useState();

  return (
    <>
      <Controls
        className="controls"
        controls={controls}
        setControls={setControls}
      />
      <Canvas concurrent className="canvas">
        <SetupContext />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} scale={controls?.scale} />
        <Box position={[1.2, 0, 0]} scale={controls?.scale} />
      </Canvas>
    </>
  );
};

export default App;
