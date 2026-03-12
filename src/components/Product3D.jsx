// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls, useGLTF } from "@react-three/drei";

// // function Model() {
// //   const { scene } = useGLTF("/product.glb"); // your 3D model
// //   return <primitive object={scene} scale={2} />;
// // }

// // export default function Product3D() {
// //   return (
// //     <Canvas style={{ height: "400px" }}>
// //       <ambientLight />
// //       <directionalLight position={[2, 2, 2]} />
// //       <Model />
// //       <OrbitControls />
// //     </Canvas>
// //   );
// // }

// // import { Canvas, useFrame } from "@react-three/fiber";
// // import { OrbitControls, useGLTF } from "@react-three/drei";
// // import { useRef } from "react";

// // function Model() {
// //   const { scene } = useGLTF("/product.glb");
// //   const modelRef = useRef();

// //   // automatic rotation
// //   useFrame(() => {
// //     if (modelRef.current) {
// //       modelRef.current.rotation.y += 0.01;
// //     }
// //   });

// //   return <primitive ref={modelRef} object={scene} scale={2} />;
// // }

// // export default function Product3D() {
// //   return (
// //     <Canvas camera={{ position: [0, 0, 5] }}>
// //       <ambientLight intensity={1} />
// //       <directionalLight position={[2, 2, 2]} />

// //       <Model />

// //       {/* user can still rotate with mouse */}
// //       <OrbitControls enableZoom={true} />
// //     </Canvas>
// //   );
// // }

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Center } from "@react-three/drei";
// import { useRef } from "react";

// function Model() {
//   const { scene } = useGLTF("/product.glb");
//   const modelRef = useRef();

//   // automatic rotation
//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <Center>
//       <primitive ref={modelRef} object={scene} scale={1.5} />
//     </Center>
//   );
// }

// export default function Product3D() {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5], fov: 45 }}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <ambientLight intensity={1} />
//       <directionalLight position={[2, 2, 2]} />

//       <Model />

//       {/* user can rotate */}
//       <OrbitControls enableZoom={true} />
//     </Canvas>
//   );
// }

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Center } from "@react-three/drei";
// import { useRef } from "react";

// function Model() {
//   const { scene } = useGLTF("/product.glb");
//   const modelRef = useRef();

//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <Center>
//       <primitive ref={modelRef} object={scene} scale={1.5} />
//     </Center>
//   );
// }

// export default function Product3D() {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5], fov: 45 }}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <ambientLight intensity={0.8} />
//       <directionalLight position={[3, 3, 3]} />

//       <Model />

//       <OrbitControls enableZoom={true} />
//     </Canvas>
//   );
// }

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Center } from "@react-three/drei";
// import { useRef } from "react";

// function Model({ model }) {
//   const { scene } = useGLTF(model);
//   const modelRef = useRef();

//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <Center>
//       <primitive ref={modelRef} object={scene} scale={1.5} />
//     </Center>
//   );
// }

// export default function Product3D({ model }) {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5], fov: 45 }}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <ambientLight intensity={0.8} />
//       <directionalLight position={[3, 3, 3]} />

//       <Model model={model} />

//       <OrbitControls enableZoom />
//     </Canvas>
//   );
// }

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Bounds,
  Center,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";

function Model({ model }) {
  const { scene } = useGLTF(model);

  return (
    // Center ensures the model pivot is in the middle
    <Center>
      {/* We remove fixed scale. Bounds will handle the sizing. */}
      <primitive object={scene} />
    </Center>
  );
}

export default function Product3D({ model }) {
  // Fallback if no model is provided
  const modelUrl = model || "/default-model.glb";

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting Setup for consistent look */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />

      {/* Environment adds realistic reflections and even lighting */}
      <Environment preset="city" />

      <Suspense fallback={null}>
        {/* 
           Bounds 'fit' prop automatically zooms camera to fit the model.
           'clip' adjusts the clipping plane so the model doesn't get cut off.
           'observe' updates if the model changes.
           margin={1.2} adds 20% breathing room around the model.
        */}
        <Bounds fit clip observe margin={0.8}>
          <Model model={modelUrl} />
        </Bounds>
      </Suspense>

      {/* Soft shadows below the product */}
      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} blur={2} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={5}
      />
    </Canvas>
  );
}
