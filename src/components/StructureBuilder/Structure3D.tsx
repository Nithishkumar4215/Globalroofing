import React, { useRef, useMemo } from 'react';
import { OrbitControls, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Structure3DProps {
  length: number; // ft
  width: number;  // ft
  height: number; // ft
  structureType: 'Warehouse' | 'Factory Shed' | 'Car Parking Shed' | 'Residential Roofing';
  roofType: 'Gable Roof' | 'Curved Roof' | 'Flat Roof';
  roofColor: string;
}

export default function Structure3D({
  length,
  width,
  height,
  structureType,
  roofType,
  roofColor,
}: Structure3DProps) {
  // Convert feet to Three.js units (scale down slightly to fit the view, e.g. 1 ft = 0.2 units)
  const scale = 0.25;
  const l = length * scale;
  const w = width * scale;
  const h = height * scale;

  // Steel Frame Details
  const columnRadius = 0.12;
  const columnHeight = h;
  const beamSize = 0.1;

  // Calculate Column Positions (around perimeter, spaced ~15-20ft / 4-5 units)
  const columns = useMemo(() => {
    const cols: [number, number][] = [];
    const spacing = 15 * scale; // ~15ft spacing

    const numColsX = Math.max(2, Math.ceil(l / spacing) + 1);
    const numColsZ = Math.max(2, Math.ceil(w / spacing) + 1);

    // X edges
    for (let i = 0; i < numColsX; i++) {
      const x = -l / 2 + (i * l) / (numColsX - 1);
      cols.push([x, -w / 2]);
      cols.push([x, w / 2]);
    }

    // Z edges (excluding corners already added)
    for (let j = 1; j < numColsZ - 1; j++) {
      const z = -w / 2 + (j * w) / (numColsZ - 1);
      cols.push([-l / 2, z]);
      cols.push([l / 2, z]);
    }

    return cols;
  }, [l, w, scale]);

  // Roof height calculations
  const roofHeight = useMemo(() => {
    if (roofType === 'Gable Roof') return w * 0.25; // 4:12 pitch approx
    if (roofType === 'Curved Roof') return w * 0.2;  // shallow arch
    return 0.1; // Flat roof slab thickness
  }, [roofType, w]);

  // Render Gable Roof geometry
  const gableRoofGeo = useMemo(() => {
    if (roofType !== 'Gable Roof') return null;

    const shape = new THREE.Shape();
    // Front face triangle (centered)
    shape.moveTo(-w / 2, h);
    shape.lineTo(0, h + roofHeight);
    shape.lineTo(w / 2, h);
    shape.lineTo(-w / 2, h);

    const extrudeSettings = {
      steps: 1,
      depth: l,
      bevelEnabled: false,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Rotate to align extrusion along the length (X axis)
    geo.center();
    geo.rotateY(Math.PI / 2);
    return geo;
  }, [roofType, w, h, roofHeight, l]);

  // Render Curved Roof geometry (using custom shape extrusion)
  const curvedRoofGeo = useMemo(() => {
    if (roofType !== 'Curved Roof') return null;

    const shape = new THREE.Shape();
    // Arched shape
    const segments = 20;
    shape.moveTo(-w / 2, h);
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = -w / 2 + t * w;
      // Parabolic arch formula: y = h + roofHeight * (1 - (2x/w)^2)
      const normalizedX = (t - 0.5) * 2;
      const y = h + roofHeight * (1 - normalizedX * normalizedX);
      shape.lineTo(x, y);
    }
    
    shape.lineTo(w / 2, h);
    shape.lineTo(-w / 2, h);

    const extrudeSettings = {
      steps: 1,
      depth: l,
      bevelEnabled: false,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    geo.rotateY(Math.PI / 2);
    return geo;
  }, [roofType, w, h, roofHeight, l]);

  // Colors based on material choice
  const columnColor = '#475569'; // slate-600 steel look
  const wallColor = '#f1f5f9';   // slate-100 warehouse cladding
  const groundColor = '#e2e8f0'; // concrete slab

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 15, -10]} intensity={0.4} />
      <pointLight position={[0, h / 2, 0]} intensity={0.5} />

      <Center>
        {/* Concrete Foundation / Floor */}
        <mesh position={[0, -0.05, 0]} receiveShadow>
          <boxGeometry args={[l + 1, 0.1, w + 1]} />
          <meshStandardMaterial color={groundColor} roughness={0.8} />
        </mesh>

        {/* Steel Columns */}
        {columns.map(([x, z], idx) => (
          <group key={idx}>
            {/* Column main body */}
            <mesh position={[x, h / 2, z]} castShadow>
              <cylinderGeometry args={[columnRadius, columnRadius, columnHeight, 8]} />
              <meshStandardMaterial color={columnColor} metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Footing baseplate */}
            <mesh position={[x, 0.02, z]}>
              <boxGeometry args={[columnRadius * 3, 0.04, columnRadius * 3]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Perimeter Roof Support Beams (Horizontal) */}
        {/* Length-wise beams */}
        <mesh position={[0, h, -w / 2]} castShadow>
          <boxGeometry args={[l, beamSize, beamSize]} />
          <meshStandardMaterial color={columnColor} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, h, w / 2]} castShadow>
          <boxGeometry args={[l, beamSize, beamSize]} />
          <meshStandardMaterial color={columnColor} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Width-wise beams */}
        <mesh position={[-l / 2, h, 0]} castShadow>
          <boxGeometry args={[beamSize, beamSize, w]} />
          <meshStandardMaterial color={columnColor} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[l / 2, h, 0]} castShadow>
          <boxGeometry args={[beamSize, beamSize, w]} />
          <meshStandardMaterial color={columnColor} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Structure Walls Cladding (depending on structure type) */}
        {structureType === 'Warehouse' && (
          // Add semi-transparent corrugated metal cladding to 3 sides, leaving front open
          <group>
            {/* Back wall */}
            <mesh position={[-l / 2, h / 2, 0]}>
              <boxGeometry args={[0.05, h, w]} />
              <meshStandardMaterial color={wallColor} opacity={0.65} transparent roughness={0.5} />
            </mesh>
            {/* Left Wall */}
            <mesh position={[0, h / 2, -w / 2]}>
              <boxGeometry args={[l, h, 0.05]} />
              <meshStandardMaterial color={wallColor} opacity={0.65} transparent roughness={0.5} />
            </mesh>
            {/* Right Wall */}
            <mesh position={[0, h / 2, w / 2]}>
              <boxGeometry args={[l, h, 0.05]} />
              <meshStandardMaterial color={wallColor} opacity={0.65} transparent roughness={0.5} />
            </mesh>
          </group>
        )}

        {structureType === 'Factory Shed' && (
          // Factory style: partially cladded walls at the top half, open at the bottom
          <group>
            {/* Back partial wall */}
            <mesh position={[-l / 2, (h * 3) / 4, 0]}>
              <boxGeometry args={[0.05, h / 2, w]} />
              <meshStandardMaterial color="#cbd5e1" opacity={0.8} transparent metalness={0.3} />
            </mesh>
            {/* Left partial wall */}
            <mesh position={[0, (h * 3) / 4, -w / 2]}>
              <boxGeometry args={[l, h / 2, 0.05]} />
              <meshStandardMaterial color="#cbd5e1" opacity={0.8} transparent metalness={0.3} />
            </mesh>
            {/* Right partial wall */}
            <mesh position={[0, (h * 3) / 4, w / 2]}>
              <boxGeometry args={[l, h / 2, 0.05]} />
              <meshStandardMaterial color="#cbd5e1" opacity={0.8} transparent metalness={0.3} />
            </mesh>
          </group>
        )}

        {/* Dynamic Roof Rendering */}
        {roofType === 'Gable Roof' && gableRoofGeo && (
          <mesh position={[0, h + roofHeight / 2, 0]} geometry={gableRoofGeo} castShadow receiveShadow>
            <meshStandardMaterial color={roofColor} roughness={0.5} metalness={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}

        {roofType === 'Curved Roof' && curvedRoofGeo && (
          <mesh position={[0, h + roofHeight / 2, 0]} geometry={curvedRoofGeo} castShadow receiveShadow>
            <meshStandardMaterial color={roofColor} roughness={0.5} metalness={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}

        {roofType === 'Flat Roof' && (
          <mesh position={[0, h + 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[l + 0.2, 0.1, w + 0.2]} />
            <meshStandardMaterial color={roofColor} roughness={0.6} metalness={0.4} />
          </mesh>
        )}
      </Center>

      {/* OrbitControls for Rotating, Zooming, and Panning */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={50}
        target={[0, h / 2, 0]}
      />

      {/* Ground Grid to set perspective */}
      <Grid
        position={[0, -0.1, 0]}
        args={[100, 100]}
        cellSize={1}
        cellThickness={1}
        cellColor="#94a3b8"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#64748b"
        fadeDistance={50}
        infiniteGrid
      />
    </>
  );
}
