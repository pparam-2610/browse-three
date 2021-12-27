import React, { Suspense, useRef } from "react";
import { MapControls, useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// const gltf = useLoader(
//   GLTFLoader,
//   "https://s3.amazonaws.com/3dlearning.io/untitled.glb"
// );

function Model({ link }) {
  console.log("The link is: ", link);

  const ref = useRef();
  const { scene } = useLoader(
    GLTFLoader,
    // "https://mythreestore.s3.ap-south-1.amazonaws.com/bulb.glb"
    link
  );
  //   const { scene } = useLoader(
  //     "https://mythreestore.s3.ap-south-1.amazonaws.com/bulb.glb"
  //   );

  useFrame(() => {
    // console.log(ref.current.);
    ref.current.rotation.y += 0.02;
  });

  return <primitive object={scene} ref={ref} />;
}

export function Canva({ modalData }) {
  return (
    <div
      style={{
        height: "100%",
        // backgroundColor: "lightpink",
        // border: "3px solid yellow",
      }}
    >
      <Canvas camera={{ position: [20, 20, 20], fov: 5 }}>
        <color attach="background" args={["#B6CBCA"]} />
        <pointLight
          position={[10, 10, 10]}
          distance={50}
          intensity={100}
          color={"#ffe692"}
        />
        <Suspense fallback={null}>
          {/* <MapControls
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={1.5}
            minPolarAngle={0.9}
            maxDistance={300}
          /> */}
          <OrbitControls />
          <Model link={modalData.link} />
        </Suspense>
      </Canvas>
    </div>
    // <></>
  );
}
