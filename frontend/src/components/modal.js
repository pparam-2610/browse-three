import React, { Suspense } from "react";
import { MapControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// const gltf = useLoader(
//   GLTFLoader,
//   "https://s3.amazonaws.com/3dlearning.io/untitled.glb"
// );

function Model({ link }) {
  console.log("The link is: ", link);
  const { scene } = useLoader(
    GLTFLoader,
    // "https://mythreestore.s3.ap-south-1.amazonaws.com/bulb.glb"
    link
  );
  //   const { scene } = useLoader(
  //     "https://mythreestore.s3.ap-south-1.amazonaws.com/bulb.glb"
  //   );
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
}

export function Canva({ modalData }) {
  return (
    <div style={{ height: "80vh", backgroundColor: "#fde2e4" }}>
      <Canvas camera={{ position: [10, 18, 23], fov: 0.5 }}>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <Suspense fallback={null}>
          <MapControls />
          <Model link={modalData.link} />
        </Suspense>
      </Canvas>
    </div>
    // <></>
  );
}
