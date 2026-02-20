import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";

const ThreeProductViewer = ({
  productImages,
  currentImageIndex,
  isAutoRotating,
  rotationSpeed,
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const textureRef = useRef(null);
  const materialRef = useRef(null);
  const frameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  // Initialize scene
  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a1a1a);
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(
        50,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 8);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = isAutoRotating;
      controls.autoRotateSpeed = rotationSpeed;
      controlsRef.current = controls;

      // Create plane with UV coordinates
      const geometry = new THREE.PlaneGeometry(6, 8);

      // Explicitly set UV coordinates (0,0 to 1,1)
      const uvs = new Float32Array([
        0,
        0, // bottom left
        1,
        0, // bottom right
        1,
        1, // top right
        0,
        0, // bottom left
        1,
        1, // top right
        0,
        1, // top left
      ]);
      geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

      // Create material with initial colored texture
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ff00ff";
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = "white";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.fillText("LOADING", 128, 128);

      const initialTexture = new THREE.CanvasTexture(canvas);
      initialTexture.needsUpdate = true;

      const material = new THREE.MeshBasicMaterial({
        map: initialTexture,
        side: THREE.DoubleSide,
      });
      materialRef.current = material;

      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);

      // Add lighting
      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      // Animation loop
      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      setDebugInfo("Scene initialized with magenta placeholder");
    } catch (err) {
      console.error("Scene error:", err);
      setError(`Scene error: ${err.message}`);
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isAutoRotating, rotationSpeed]);

  // Load texture - MOST IMPORTANT PART
  useEffect(() => {
    if (!productImages.length || !materialRef.current) {
      setDebugInfo("Waiting for images or material...");
      return;
    }

    const url = productImages[currentImageIndex];
    setCurrentUrl(url);
    setDebugInfo(`Starting load: ${url}`);

    // Create a loader with explicit settings
    const loader = new THREE.TextureLoader();

    // IMPORTANT: Don't set crossOrigin for local files
    // loader.setCrossOrigin("anonymous");

    // Load the texture
    const texture = loader.load(
      url,
      // onLoad - SUCCESS
      (loadedTexture) => {
        console.log("✅ Texture loaded!", loadedTexture);
        setDebugInfo("✅ Texture loaded - applying...");

        // Configure texture
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
        loadedTexture.flipY = false;
        loadedTexture.generateMipmaps = true;
        loadedTexture.needsUpdate = true;

        // Store reference
        textureRef.current = loadedTexture;

        // CRITICAL: Force material update
        if (materialRef.current) {
          // Set the map
          materialRef.current.map = loadedTexture;

          // Force all updates
          materialRef.current.needsUpdate = true;
          materialRef.current.map.needsUpdate = true;

          // Trigger a render
          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }

          setDebugInfo("✅ Texture applied successfully!");
          setTimeout(() => setIsLoading(false), 500);
        }
      },
      // onProgress
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        setDebugInfo(`Loading: ${percent.toFixed(1)}%`);
      },
      // onError - FAILURE
      (error) => {
        console.error("❌ Texture load failed:", error);
        setDebugInfo(`❌ Failed: ${error.message || "Unknown error"}`);
        setError(`Cannot load: ${url}`);

        // Create error texture
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        // Red background
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(0, 0, 512, 512);

        // White text
        ctx.fillStyle = "white";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ERROR", 256, 200);
        ctx.font = "24px Arial";
        ctx.fillText("Image not found", 256, 280);
        ctx.font = "16px Arial";
        ctx.fillText(url.substring(url.lastIndexOf("/") + 1), 256, 320);

        const errorTexture = new THREE.CanvasTexture(canvas);
        errorTexture.needsUpdate = true;

        if (materialRef.current) {
          materialRef.current.map = errorTexture;
          materialRef.current.needsUpdate = true;
          setDebugInfo("Showing error texture");
        }
      },
    );

    // Cleanup
    return () => {
      if (textureRef.current && textureRef.current !== texture) {
        textureRef.current.dispose();
      }
    };
  }, [currentImageIndex, productImages]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      <div ref={mountRef} className="w-full h-full" />

      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Loading image...</p>
          </div>
        </div>
      )}

      {/* Debug Panel - MOST IMPORTANT */}
      <div className="absolute top-4 left-4 bg-black/90 text-white p-4 rounded-lg max-w-md">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <div className="text-xs font-mono space-y-1">
          <div>
            📸 Image: {currentImageIndex + 1}/{productImages.length}
          </div>
          <div>
            🔗 URL:{" "}
            {currentUrl
              ? currentUrl.substring(currentUrl.lastIndexOf("/") + 1)
              : "None"}
          </div>
          <div>📊 Status: {debugInfo}</div>
          <div>🎨 Material: {materialRef.current ? "✓ Created" : "✗ None"}</div>
          <div>🖼️ Texture: {textureRef.current ? "✓ Loaded" : "✗ None"}</div>
          <div>🔄 Mesh: {meshRef.current ? "✓ Created" : "✗ None"}</div>
        </div>

        {/* Test button */}
        <button
          onClick={() => {
            if (materialRef.current) {
              // Create test texture
              const canvas = document.createElement("canvas");
              canvas.width = 256;
              canvas.height = 256;
              const ctx = canvas.getContext("2d");

              // Random color
              const colors = [];
              ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
              ctx.fillRect(0, 0, 256, 256);

              ctx.fillStyle = "white";
              ctx.font = "bold 32px Arial";
              ctx.textAlign = "center";
              ctx.fillText("TEST", 128, 128);

              const testTexture = new THREE.CanvasTexture(canvas);
              testTexture.needsUpdate = true;

              materialRef.current.map = testTexture;
              materialRef.current.needsUpdate = true;

              setDebugInfo("Test texture applied!");
            }
          }}
          className="mt-3 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Test Color
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center max-w-md">
            <p className="text-red-400 mb-2">{error}</p>
            <p className="text-white/60 text-sm break-all mb-4">{currentUrl}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
            >
              Reload
            </button>
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs">
        🖱️ Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ThreeProductViewer;
