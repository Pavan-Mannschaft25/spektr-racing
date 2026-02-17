// // // // src/components/ThreeProductViewer.jsx
// // // import React, { useEffect, useRef } from "react";
// // // import * as THREE from "three";
// // // import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// // // const ThreeProductViewer = ({
// // //   productImages,
// // //   currentImageIndex,
// // //   isAutoRotating,
// // //   rotationSpeed = 0.5,
// // // }) => {
// // //   const mountRef = useRef(null);
// // //   const sceneRef = useRef(null);
// // //   const rendererRef = useRef(null);
// // //   const frameIdRef = useRef(null);
// // //   const meshRef = useRef(null);
// // //   const materialRef = useRef(null);
// // //   const controlsRef = useRef(null);

// // //   useEffect(() => {
// // //     if (!mountRef.current) return;

// // //     // Scene Setup
// // //     const scene = new THREE.Scene();
// // //     scene.background = new THREE.Color(0x0a0a0a); // Dark background
// // //     sceneRef.current = scene;

// // //     // Camera Setup - Adjusted for better centering
// // //     const camera = new THREE.PerspectiveCamera(
// // //       50, // Reduced FOV for better product focus
// // //       mountRef.current.clientWidth / mountRef.current.clientHeight,
// // //       0.1,
// // //       1000,
// // //     );
// // //     camera.position.set(0, 0, 8); // Moved camera back for better view
// // //     scene.add(camera);

// // //     // Renderer Setup
// // //     const renderer = new THREE.WebGLRenderer({
// // //       antialias: true,
// // //       alpha: true, // Enable transparency
// // //     });
// // //     renderer.setSize(
// // //       mountRef.current.clientWidth,
// // //       mountRef.current.clientHeight,
// // //     );
// // //     renderer.setPixelRatio(window.devicePixelRatio);
// // //     renderer.shadowMap.enabled = true;
// // //     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// // //     mountRef.current.appendChild(renderer.domElement);
// // //     rendererRef.current = renderer;

// // //     // Enhanced Lighting Setup
// // //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// // //     scene.add(ambientLight);

// // //     // Main directional light
// // //     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// // //     directionalLight.position.set(5, 5, 5);
// // //     directionalLight.castShadow = true;
// // //     directionalLight.shadow.camera.near = 0.1;
// // //     directionalLight.shadow.camera.far = 50;
// // //     directionalLight.shadow.camera.left = -10;
// // //     directionalLight.shadow.camera.right = 10;
// // //     directionalLight.shadow.camera.top = 10;
// // //     directionalLight.shadow.camera.bottom = -10;
// // //     scene.add(directionalLight);

// // //     // Fill light
// // //     const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
// // //     fillLight.position.set(-5, 0, -5);
// // //     scene.add(fillLight);

// // //     // Rim light for edge definition
// // //     const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
// // //     rimLight.position.set(0, -5, -5);
// // //     scene.add(rimLight);

// // //     // Create 3D Object - Using a box instead of plane for better 3D effect
// // //     const geometry = new THREE.BoxGeometry(4, 4, 0.1); // Thin box for product display
// // //     const textureLoader = new THREE.TextureLoader();

// // //     // Load texture with error handling
// // //     const texture = textureLoader.load(
// // //       productImages[0],
// // //       (loadedTexture) => {
// // //         // Texture loaded successfully
// // //         loadedTexture.colorSpace = THREE.SRGBColorSpace;
// // //         loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
// // //         loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
// // //       },
// // //       undefined,
// // //       (error) => {
// // //         console.error("Error loading texture:", error);
// // //       },
// // //     );

// // //     const material = new THREE.MeshPhysicalMaterial({
// // //       map: texture,
// // //       metalness: 0.1,
// // //       roughness: 0.2,
// // //       clearcoat: 0.3,
// // //       clearcoatRoughness: 0.25,
// // //       side: THREE.DoubleSide,
// // //     });
// // //     materialRef.current = material;

// // //     const mesh = new THREE.Mesh(geometry, material);
// // //     mesh.castShadow = true;
// // //     mesh.receiveShadow = true;
// // //     scene.add(mesh);
// // //     meshRef.current = mesh;

// // //     // Add a subtle floor for better depth perception
// // //     const floorGeometry = new THREE.PlaneGeometry(20, 20);
// // //     const floorMaterial = new THREE.MeshStandardMaterial({
// // //       color: 0x111111,
// // //       roughness: 0.8,
// // //       metalness: 0.2,
// // //     });
// // //     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// // //     floor.rotation.x = -Math.PI / 2;
// // //     floor.position.y = -3;
// // //     floor.receiveShadow = true;
// // //     scene.add(floor);

// // //     // Controls Setup
// // //     const controls = new OrbitControls(camera, renderer.domElement);
// // //     controls.enableDamping = true;
// // //     controls.dampingFactor = 0.05;
// // //     controls.enableZoom = true;
// // //     controls.enablePan = false;
// // //     controls.minDistance = 4;
// // //     controls.maxDistance = 15;
// // //     controls.autoRotate = isAutoRotating;
// // //     controls.autoRotateSpeed = 2.0 * rotationSpeed;
// // //     controlsRef.current = controls;

// // //     // Handle Window Resize
// // //     const handleResize = () => {
// // //       if (!mountRef.current) return;
// // //       camera.aspect =
// // //         mountRef.current.clientWidth / mountRef.current.clientHeight;
// // //       camera.updateProjectionMatrix();
// // //       renderer.setSize(
// // //         mountRef.current.clientWidth,
// // //         mountRef.current.clientHeight,
// // //       );
// // //     };
// // //     window.addEventListener("resize", handleResize);

// // //     // Animation Loop
// // //     const animate = () => {
// // //       frameIdRef.current = requestAnimationFrame(animate);

// // //       // Update controls
// // //       if (controlsRef.current) {
// // //         controlsRef.current.update();
// // //       }

// // //       // Render scene
// // //       renderer.render(scene, camera);
// // //     };
// // //     animate();

// // //     // Cleanup function
// // //     return () => {
// // //       window.removeEventListener("resize", handleResize);

// // //       if (frameIdRef.current) {
// // //         cancelAnimationFrame(frameIdRef.current);
// // //       }

// // //       if (mountRef.current && renderer.domElement) {
// // //         mountRef.current.removeChild(renderer.domElement);
// // //       }

// // //       // Dispose Three.js resources
// // //       renderer.dispose();
// // //       geometry.dispose();
// // //       material.dispose();
// // //       texture.dispose();
// // //       floorGeometry.dispose();
// // //       floorMaterial.dispose();

// // //       // Dispose controls
// // //       if (controlsRef.current) {
// // //         controlsRef.current.dispose();
// // //       }
// // //     };
// // //   }, []); // Run only once on mount

// // //   // Update texture when image index changes
// // //   useEffect(() => {
// // //     if (materialRef.current && productImages[currentImageIndex]) {
// // //       const textureLoader = new THREE.TextureLoader();

// // //       // Dispose old texture if exists
// // //       if (materialRef.current.map) {
// // //         materialRef.current.map.dispose();
// // //       }

// // //       textureLoader.load(
// // //         productImages[currentImageIndex],
// // //         (texture) => {
// // //           if (materialRef.current) {
// // //             texture.colorSpace = THREE.SRGBColorSpace;
// // //             texture.wrapS = THREE.ClampToEdgeWrapping;
// // //             texture.wrapT = THREE.ClampToEdgeWrapping;
// // //             materialRef.current.map = texture;
// // //             materialRef.current.needsUpdate = true;
// // //           }
// // //         },
// // //         undefined,
// // //         (error) => {
// // //           console.error("Error loading texture:", error);
// // //         },
// // //       );
// // //     }
// // //   }, [currentImageIndex, productImages]);

// // //   // Update auto-rotate behavior
// // //   useEffect(() => {
// // //     if (controlsRef.current) {
// // //       controlsRef.current.autoRotate = isAutoRotating;
// // //       controlsRef.current.autoRotateSpeed = 3.0 * rotationSpeed;
// // //     }
// // //   }, [isAutoRotating, rotationSpeed]);

// // //   return (
// // //     <div
// // //       ref={mountRef}
// // //       className="w-full flex items-center justify-center"
// // //       style={{ minHeight: "300px" }}
// // //     />
// // //   );
// // // };

// // // export default ThreeProductViewer;

// // // src/components/ThreeProductViewer.jsx
// // import React, { useEffect, useRef } from "react";
// // import * as THREE from "three";
// // import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// // const ThreeProductViewer = ({
// //   productImages,
// //   currentImageIndex,
// //   isAutoRotating,
// //   rotationSpeed = 0.5,
// // }) => {
// //   const mountRef = useRef(null);
// //   const rendererRef = useRef(null);
// //   const materialRef = useRef(null);
// //   const controlsRef = useRef(null);
// //   const frameIdRef = useRef(null);

// //   useEffect(() => {
// //     if (!mountRef.current) return;

// //     /* ---------------- Scene ---------------- */
// //     const scene = new THREE.Scene();
// //     scene.background = new THREE.Color(0x0a0a0a);

// //     /* ---------------- Camera ---------------- */
// //     const camera = new THREE.PerspectiveCamera(
// //       45,
// //       mountRef.current.clientWidth / mountRef.current.clientHeight,
// //       0.1,
// //       100,
// //     );
// //     camera.position.set(0, 0, 7);
// //     camera.lookAt(0, 0, 0);

// //     /* ---------------- Renderer ---------------- */
// //     const renderer = new THREE.WebGLRenderer({
// //       antialias: true,
// //       alpha: true,
// //     });
// //     renderer.setSize(
// //       mountRef.current.clientWidth,
// //       mountRef.current.clientHeight,
// //     );
// //     renderer.setPixelRatio(window.devicePixelRatio);
// //     mountRef.current.appendChild(renderer.domElement);
// //     rendererRef.current = renderer;

// //     /* ---------------- Lights ---------------- */
// //     scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// //     const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
// //     keyLight.position.set(5, 5, 5);
// //     scene.add(keyLight);

// //     const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
// //     fillLight.position.set(-5, 0, -5);
// //     scene.add(fillLight);

// //     /* ---------------- Mesh ---------------- */
// //     const geometry = new THREE.BoxGeometry(4, 4, 0.1);

// //     const textureLoader = new THREE.TextureLoader();
// //     const texture = textureLoader.load(productImages[0]);
// //     texture.colorSpace = THREE.SRGBColorSpace;

// //     const material = new THREE.MeshPhysicalMaterial({
// //       map: texture,
// //       roughness: 0.25,
// //       metalness: 0.1,
// //       clearcoat: 0.3,
// //     });
// //     materialRef.current = material;

// //     const mesh = new THREE.Mesh(geometry, material);
// //     mesh.position.set(0, 0, 0);
// //     scene.add(mesh);

// //     /* ---------------- Floor ---------------- */
// //     const floor = new THREE.Mesh(
// //       new THREE.PlaneGeometry(20, 20),
// //       new THREE.MeshStandardMaterial({ color: 0x111111 }),
// //     );
// //     floor.rotation.x = -Math.PI / 2;
// //     floor.position.y = -2.5;
// //     scene.add(floor);

// //     /* ---------------- Controls ---------------- */
// //     const controls = new OrbitControls(camera, renderer.domElement);
// //     controls.enableDamping = true;
// //     controls.enablePan = false;
// //     controls.minDistance = 4;
// //     controls.maxDistance = 12;
// //     controls.target.set(0, 0, 0);
// //     controls.autoRotate = isAutoRotating;
// //     controls.autoRotateSpeed = 2 * rotationSpeed;
// //     controls.update();
// //     controlsRef.current = controls;

// //     /* ---------------- Resize ---------------- */
// //     const handleResize = () => {
// //       camera.aspect =
// //         mountRef.current.clientWidth / mountRef.current.clientHeight;
// //       camera.updateProjectionMatrix();
// //       renderer.setSize(
// //         mountRef.current.clientWidth,
// //         mountRef.current.clientHeight,
// //       );
// //     };
// //     window.addEventListener("resize", handleResize);

// //     /* ---------------- Animate ---------------- */
// //     const animate = () => {
// //       frameIdRef.current = requestAnimationFrame(animate);
// //       controls.update();
// //       renderer.render(scene, camera);
// //     };
// //     animate();

// //     /* ---------------- Cleanup ---------------- */
// //     return () => {
// //       cancelAnimationFrame(frameIdRef.current);
// //       window.removeEventListener("resize", handleResize);
// //       controls.dispose();
// //       geometry.dispose();
// //       material.dispose();
// //       texture.dispose();
// //       renderer.dispose();
// //       mountRef.current.removeChild(renderer.domElement);
// //     };
// //   }, []);

// //   /* -------- Update Image -------- */
// //   useEffect(() => {
// //     if (!materialRef.current) return;

// //     const loader = new THREE.TextureLoader();
// //     loader.load(productImages[currentImageIndex], (tex) => {
// //       tex.colorSpace = THREE.SRGBColorSpace;
// //       materialRef.current.map.dispose();
// //       materialRef.current.map = tex;
// //       materialRef.current.needsUpdate = true;
// //     });
// //   }, [currentImageIndex, productImages]);

// //   /* -------- Update Rotation -------- */
// //   useEffect(() => {
// //     if (!controlsRef.current) return;
// //     controlsRef.current.autoRotate = isAutoRotating;
// //     controlsRef.current.autoRotateSpeed = 2 * rotationSpeed;
// //   }, [isAutoRotating, rotationSpeed]);

// //   return <div ref={mountRef} className="w-full h-full" />;
// // };

// // export default ThreeProductViewer;

// // src/components/ThreeProductViewer.jsx
// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { motion } from "framer-motion";

// const ThreeProductViewer = ({
//   productImages,
//   currentImageIndex,
//   isAutoRotating,
//   rotationSpeed = 0.5,
// }) => {
//   const mountRef = useRef(null);
//   const rendererRef = useRef(null);
//   const materialRef = useRef(null);
//   const controlsRef = useRef(null);
//   const frameIdRef = useRef(null);
//   const meshRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     let scene, camera, renderer, controls, mesh;
//     let animationId;

//     const init = () => {
//       /* ---------------- Scene ---------------- */
//       scene = new THREE.Scene();
//       scene.background = new THREE.Color(0x0a0a0a);
//       scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

//       /* ---------------- Camera ---------------- */
//       const aspect =
//         mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
//       camera.position.set(0, 0, 7);
//       camera.lookAt(0, 0, 0);

//       /* ---------------- Renderer ---------------- */
//       renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true,
//         powerPreference: "high-performance",
//       });
//       renderer.setSize(
//         mountRef.current.clientWidth,
//         mountRef.current.clientHeight,
//       );
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       renderer.shadowMap.enabled = true;
//       renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//       renderer.outputColorSpace = THREE.SRGBColorSpace;
//       renderer.toneMapping = THREE.ACESFilmicToneMapping;
//       renderer.toneMappingExposure = 1.2;
//       mountRef.current.appendChild(renderer.domElement);
//       rendererRef.current = renderer;

//       /* ---------------- Enhanced Lighting ---------------- */
//       // Ambient light for base illumination
//       const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//       scene.add(ambientLight);

//       // Main key light with shadows
//       const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
//       keyLight.position.set(5, 5, 5);
//       keyLight.castShadow = true;
//       keyLight.shadow.mapSize.width = 2048;
//       keyLight.shadow.mapSize.height = 2048;
//       keyLight.shadow.camera.near = 0.5;
//       keyLight.shadow.camera.far = 50;
//       keyLight.shadow.camera.left = -10;
//       keyLight.shadow.camera.right = 10;
//       keyLight.shadow.camera.top = 10;
//       keyLight.shadow.camera.bottom = -10;
//       scene.add(keyLight);

//       // Fill light for softer shadows
//       const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
//       fillLight.position.set(-5, 2, -5);
//       scene.add(fillLight);

//       // Rim light for edge definition
//       const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
//       rimLight.position.set(0, -5, -5);
//       scene.add(rimLight);

//       // Point lights for more dynamic lighting
//       const pointLight1 = new THREE.PointLight(0x9333ea, 0.3, 10);
//       pointLight1.position.set(3, 3, 3);
//       scene.add(pointLight1);

//       const pointLight2 = new THREE.PointLight(0xdb2777, 0.3, 10);
//       pointLight2.position.set(-3, -3, -3);
//       scene.add(pointLight2);

//       /* ---------------- Mesh ---------------- */
//       const geometry = new THREE.BoxGeometry(4, 4, 0.1);

//       const textureLoader = new THREE.TextureLoader();
//       const texture = textureLoader.load(
//         productImages[0],
//         () => setIsLoading(false),
//         undefined,
//         (err) => {
//           setError("Failed to load texture");
//           setIsLoading(false);
//         },
//       );

//       texture.colorSpace = THREE.SRGBColorSpace;
//       texture.wrapS = THREE.ClampToEdgeWrapping;
//       texture.wrapT = THREE.ClampToEdgeWrapping;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;

//       const material = new THREE.MeshPhysicalMaterial({
//         map: texture,
//         roughness: 0.25,
//         metalness: 0.1,
//         clearcoat: 0.3,
//         clearcoatRoughness: 0.2,
//         side: THREE.DoubleSide,
//       });
//       materialRef.current = material;

//       mesh = new THREE.Mesh(geometry, material);
//       mesh.position.set(0, 0, 0);
//       mesh.castShadow = true;
//       mesh.receiveShadow = true;
//       scene.add(mesh);
//       meshRef.current = mesh;

//       /* ---------------- Environment ---------------- */
//       // Add reflective floor
//       const floorGeometry = new THREE.PlaneGeometry(20, 20);
//       const floorMaterial = new THREE.MeshPhysicalMaterial({
//         color: 0x111111,
//         roughness: 0.8,
//         metalness: 0.2,
//         envMapIntensity: 0.5,
//       });
//       const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//       floor.rotation.x = -Math.PI / 2;
//       floor.position.y = -2.5;
//       floor.receiveShadow = true;
//       scene.add(floor);

//       // Add subtle grid
//       const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
//       gridHelper.position.y = -2.49;
//       scene.add(gridHelper);

//       /* ---------------- Controls ---------------- */
//       controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.05;
//       controls.enableZoom = true;
//       controls.enablePan = false;
//       controls.minDistance = 4;
//       controls.maxDistance = 12;
//       controls.maxPolarAngle = Math.PI * 0.9;
//       controls.minPolarAngle = Math.PI * 0.1;
//       controls.target.set(0, 0, 0);
//       controls.autoRotate = isAutoRotating;
//       controls.autoRotateSpeed = 2 * rotationSpeed;
//       controls.update();
//       controlsRef.current = controls;

//       /* ---------------- Resize Handler ---------------- */
//       const handleResize = () => {
//         if (!mountRef.current) return;
//         const aspect =
//           mountRef.current.clientWidth / mountRef.current.clientHeight;
//         camera.aspect = aspect;
//         camera.updateProjectionMatrix();
//         renderer.setSize(
//           mountRef.current.clientWidth,
//           mountRef.current.clientHeight,
//         );
//       };
//       window.addEventListener("resize", handleResize);

//       /* ---------------- Animation Loop ---------------- */
//       const animate = () => {
//         animationId = requestAnimationFrame(animate);

//         if (controls) {
//           controls.update();
//         }

//         // Add subtle floating animation
//         if (mesh && !isAutoRotating) {
//           mesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
//         }

//         renderer.render(scene, camera);
//       };
//       animate();

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         if (animationId) {
//           cancelAnimationFrame(animationId);
//         }
//         if (controls) {
//           controls.dispose();
//         }
//         if (mountRef.current && renderer.domElement) {
//           mountRef.current.removeChild(renderer.domElement);
//         }
//         renderer.dispose();
//       };
//     };

//     const cleanup = init();

//     return () => {
//       cleanup();
//     };
//   }, []);

//   /* -------- Update Image -------- */
//   useEffect(() => {
//     if (!materialRef.current || !productImages[currentImageIndex]) return;

//     const loader = new THREE.TextureLoader();
//     loader.load(
//       productImages[currentImageIndex],
//       (tex) => {
//         if (materialRef.current && materialRef.current.map) {
//           materialRef.current.map.dispose();
//         }
//         if (materialRef.current) {
//           tex.colorSpace = THREE.SRGBColorSpace;
//           tex.wrapS = THREE.ClampToEdgeWrapping;
//           tex.wrapT = THREE.ClampToEdgeWrapping;
//           tex.minFilter = THREE.LinearFilter;
//           tex.magFilter = THREE.LinearFilter;
//           materialRef.current.map = tex;
//           materialRef.current.needsUpdate = true;
//         }
//       },
//       undefined,
//       (err) => {
//         console.error("Texture loading error:", err);
//       },
//     );
//   }, [currentImageIndex, productImages]);

//   /* -------- Update Rotation -------- */
//   useEffect(() => {
//     if (!controlsRef.current) return;
//     controlsRef.current.autoRotate = isAutoRotating;
//     controlsRef.current.autoRotateSpeed = 2 * rotationSpeed;
//   }, [isAutoRotating, rotationSpeed]);

//   return (
//     <div className="relative w-full h-full">
//       <div ref={mountRef} className="w-full h-full" />

//       {/* Loading Overlay */}
//       {isLoading && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           animate={{ opacity: isLoading ? 1 : 0 }}
//           className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
//         >
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
//             <p className="text-gray-400">Loading 3D Model...</p>
//           </div>
//         </motion.div>
//       )}

//       {/* Error Overlay */}
//       {error && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
//         >
//           <div className="text-center">
//             <p className="text-red-400 mb-2">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ThreeProductViewer;

// // src/components/ThreeProductViewer.jsx
// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { motion } from "framer-motion";

// const ThreeProductViewer = ({
//   productImages = [],
//   currentImageIndex,
//   isAutoRotating,
//   rotationSpeed = 0.5,
// }) => {
//   const mountRef = useRef(null);
//   const rendererRef = useRef(null);
//   const sceneRef = useRef(null);
//   const cameraRef = useRef(null);
//   const materialRef = useRef(null);
//   const controlsRef = useRef(null);
//   const frameIdRef = useRef(null);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* ---------------- INIT THREE ---------------- */
//   useEffect(() => {
//     if (!mountRef.current || !productImages.length) return;

//     /* Scene */
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x0a0a0a);
//     sceneRef.current = scene;

//     /* Camera */
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       100,
//     );
//     camera.position.set(0, 0, 7);
//     camera.lookAt(0, 0, 0);
//     cameraRef.current = camera;

//     /* Renderer */
//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//     });
//     renderer.setSize(
//       mountRef.current.clientWidth,
//       mountRef.current.clientHeight,
//     );
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.outputColorSpace = THREE.SRGBColorSpace;
//     mountRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     /* Lights */
//     scene.add(new THREE.AmbientLight(0xffffff, 0.4));

//     const light = new THREE.DirectionalLight(0xffffff, 0.8);
//     light.position.set(5, 5, 5);
//     scene.add(light);

//     /* Geometry */
//     const geometry = new THREE.BoxGeometry(4, 4, 0.1);

//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(
//       productImages[0],
//       () => setIsLoading(false),
//       undefined,
//       () => {
//         setError("Texture failed to load");
//         setIsLoading(false);
//       },
//     );

//     texture.colorSpace = THREE.SRGBColorSpace;

//     const material = new THREE.MeshPhysicalMaterial({
//       map: texture,
//       roughness: 0.25,
//       metalness: 0.1,
//       clearcoat: 0.3,
//     });
//     materialRef.current = material;

//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     /* Controls */
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.enablePan = false;
//     controls.autoRotate = isAutoRotating;
//     controls.autoRotateSpeed = 2 * rotationSpeed;
//     controlsRef.current = controls;

//     /* Animate */
//     const animate = () => {
//       frameIdRef.current = requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     /* Resize */
//     const onResize = () => {
//       camera.aspect =
//         mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(
//         mountRef.current.clientWidth,
//         mountRef.current.clientHeight,
//       );
//     };
//     window.addEventListener("resize", onResize);

//     /* CLEANUP */
//     return () => {
//       window.removeEventListener("resize", onResize);
//       cancelAnimationFrame(frameIdRef.current);
//       controls.dispose();
//       geometry.dispose();
//       material.dispose();
//       texture.dispose();
//       renderer.dispose();
//       mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   /* -------- UPDATE IMAGE -------- */
//   useEffect(() => {
//     if (!materialRef.current || !productImages[currentImageIndex]) return;

//     const loader = new THREE.TextureLoader();
//     loader.load(productImages[currentImageIndex], (tex) => {
//       tex.colorSpace = THREE.SRGBColorSpace;
//       materialRef.current.map?.dispose();
//       materialRef.current.map = tex;
//       materialRef.current.needsUpdate = true;
//     });
//   }, [currentImageIndex, productImages]);

//   /* -------- ROTATION -------- */
//   useEffect(() => {
//     if (!controlsRef.current) return;
//     controlsRef.current.autoRotate = isAutoRotating;
//     controlsRef.current.autoRotateSpeed = 2 * rotationSpeed;
//   }, [isAutoRotating, rotationSpeed]);

//   return (
//     <div className="relative w-full h-full">
//       <div ref={mountRef} className="w-full h-full" />

//       {isLoading && (
//         <motion.div className="absolute inset-0 flex items-center justify-center bg-black/50">
//           <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
//         </motion.div>
//       )}

//       {error && (
//         <div className="absolute inset-0 flex items-center justify-center text-red-400">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThreeProductViewer;

// src/components/ThreeProductViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";

const ThreeProductViewer = ({
  productImages = [],
  currentImageIndex,
  isAutoRotating,
  rotationSpeed = 0.5,
}) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const controlsRef = useRef(null);
  const frameIdRef = useRef(null);
  const meshRef = useRef(null);
  const textureRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  /* ---------------- INIT THREE ---------------- */
  useEffect(() => {
    if (!mountRef.current || !productImages.length) return;

    // Prevent multiple initializations
    if (isInitialized) return;

    console.log("Initializing Three.js scene...");

    /* Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    /* Camera */
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 5, 5);
    scene.add(light);

    /* Geometry */
    const geometry = new THREE.BoxGeometry(4, 4, 0.1);

    /* Material */
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x404040, // Fallback color
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.3,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    /* Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 2 * rotationSpeed;
    controlsRef.current = controls;

    /* Animate */
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* Resize */
    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", onResize);

    setIsInitialized(true);

    /* CLEANUP */
    return () => {
      console.log("Cleaning up Three.js scene...");
      window.removeEventListener("resize", onResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (controls) {
        controls.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
      if (textureRef.current) {
        textureRef.current.dispose();
      }
      if (renderer) {
        renderer.dispose();
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      setIsInitialized(false);
    };
  }, []);

  /* -------- LOAD INITIAL TEXTURE -------- */
  useEffect(() => {
    if (!isInitialized || !productImages.length || !materialRef.current) return;

    console.log("Loading initial texture...");
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      productImages[0],
      (texture) => {
        console.log("Texture loaded successfully");
        texture.colorSpace = THREE.SRGBColorSpace;
        textureRef.current = texture;

        if (materialRef.current) {
          materialRef.current.map = texture;
          materialRef.current.needsUpdate = true;
        }
        setIsLoading(false);
      },
      (progress) => {
        console.log("Loading progress:", progress);
      },
      (error) => {
        console.error("Texture loading error:", error);
        setError("Failed to load texture");
        setIsLoading(false);
      },
    );
  }, [isInitialized, productImages]);

  /* -------- UPDATE IMAGE -------- */
  useEffect(() => {
    if (
      !isInitialized ||
      !materialRef.current ||
      !productImages[currentImageIndex]
    )
      return;

    console.log("Updating texture to index:", currentImageIndex);

    const loader = new THREE.TextureLoader();
    loader.load(
      productImages[currentImageIndex],
      (newTexture) => {
        console.log("New texture loaded");
        newTexture.colorSpace = THREE.SRGBColorSpace;

        // Dispose old texture
        if (textureRef.current) {
          textureRef.current.dispose();
        }

        textureRef.current = newTexture;

        if (materialRef.current) {
          materialRef.current.map = newTexture;
          materialRef.current.needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.error("Failed to update texture:", error);
      },
    );
  }, [currentImageIndex, isInitialized, productImages]);

  /* -------- ROTATION -------- */
  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.autoRotate = isAutoRotating;
    controlsRef.current.autoRotateSpeed = 2 * rotationSpeed;
  }, [isAutoRotating, rotationSpeed]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-white/80 text-sm">Loading 3D View...</p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400 mb-2">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                // Retry loading
                if (productImages.length && materialRef.current) {
                  const loader = new THREE.TextureLoader();
                  loader.load(productImages[0], (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    textureRef.current = texture;
                    materialRef.current.map = texture;
                    materialRef.current.needsUpdate = true;
                    setIsLoading(false);
                  });
                }
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
            >
              Retry
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ThreeProductViewer;
