"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, ScrollControls, useScroll } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";
import styles from "./style.module.scss";

export default function Index() {
  return (
    <div className={styles.main}>
      <Canvas camera={{ position: [8, 8, 8] }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 1, 1]} intensity={1.5} />
            <OrbitControls/>
            <Suspense fallback={null}>
            <Cube/>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Cube() {
  const mesh = useRef();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothedX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothedY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    function onMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const unsubX = smoothedX.onChange((v) => {
      if (mesh.current) {
        mesh.current.rotation.y = v * 0.6;
      }
    });
    const unsubY = smoothedY.onChange((v) => {
      if (mesh.current) {
        mesh.current.rotation.x = v * 0.6;
      }
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothedX, smoothedY]);

  const [
    t1,
    t2,
    t3,
    t4,
    t5,
    t6
  ] = useLoader(TextureLoader, [
    "/assets/box-1.png",
    "/assets/box-2.png",
    "/assets/box-3.png",
    "/assets/box-4.png",
    "/assets/box-5.png",
    "/assets/box-6.png"
  ]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += delta * 0.08;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={t1} attach="material-0"/>
      <meshStandardMaterial map={t2} attach="material-1"/>
      <meshStandardMaterial map={t3} attach="material-2"/>
      <meshStandardMaterial map={t4} attach="material-3"/>
      <meshStandardMaterial map={t5} attach="material-4"/>
      <meshStandardMaterial map={t6} attach="material-5"/>
    </mesh>
  );
}
