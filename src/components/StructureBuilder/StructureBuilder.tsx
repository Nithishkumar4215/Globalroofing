import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { generateDesignReport } from '../../utils/pdfGenerator';
import Structure3D from './Structure3D';
import { 
  Ruler, 
  Settings, 
  RotateCcw, 
  Layers, 
  Building, 
  Info, 
  Maximize2, 
  Sigma,
  Grid as GridIcon,
  ChevronsUpDown
} from 'lucide-react';

// Preset colors for the roofing sheets
const ROOF_COLORS = [
  { name: 'Classic Blue', hex: '#1E508C' },
  { name: 'Terracotta Red', hex: '#B23B22' },
  { name: 'Emerald Green', hex: '#2A7A4E' },
  { name: 'Charcoal Gray', hex: '#374151' },
];

export default function StructureBuilder() {
  // Form input states
  const [inputs, setInputs] = useState({
    length: 60,
    width: 40,
    height: 20,
    structureType: 'Warehouse' as 'Warehouse' | 'Factory Shed' | 'Car Parking Shed' | 'Residential Roofing',
    roofType: 'Gable Roof' as 'Gable Roof' | 'Curved Roof' | 'Flat Roof',
    roofColor: '#1E508C',
  });

  // Current active configuration sent to the 3D model
  const [activeConfig, setActiveConfig] = useState({ ...inputs });

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    // Provide a brief delay to ensure WebGL frame rendering is finalized
    setTimeout(() => {
      try {
        const canvas = canvasContainerRef.current?.querySelector('canvas');
        if (!canvas) {
          alert('Error: 3D canvas viewport not found.');
          setIsDownloading(false);
          return;
        }

        // Capture WebGL frame (works since preserveDrawingBuffer is enabled)
        const screenshotUrl = canvas.toDataURL('image/png');

        // Map hex code back to plain English name
        const activeColorObj = ROOF_COLORS.find(c => c.hex === activeConfig.roofColor);
        const colorName = activeColorObj ? activeColorObj.name : activeConfig.roofColor;

        generateDesignReport({
          length: activeConfig.length,
          width: activeConfig.width,
          height: activeConfig.height,
          structureType: activeConfig.structureType,
          roofType: activeConfig.roofType,
          roofColor: colorName,
          totalArea,
          roofingArea,
          columnsCount: totalColumns,
          screenshotUrl,
        });

        setDownloadSuccess(true);
        alert('PDF downloaded successfully.');

        // Reset success state after a delay
        setTimeout(() => setDownloadSuccess(false), 5000);
      } catch (err) {
        console.error('Error generating PDF report:', err);
        alert('Failed to generate PDF design report.');
      } finally {
        setIsDownloading(false);
      }
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'length' || name === 'width' || name === 'height' ? Number(value) : value
    }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveConfig({ ...inputs });
  };

  // Perform engineering calculations based on active configuration
  const totalArea = activeConfig.length * activeConfig.width;
  
  // Roofing Area calculates the slope/curvature additions:
  // Gable: pitch is ~25% slope, hypotenuse multiplier ≈ 1.05 (plus 5% overlap allowance)
  // Curved: curved arch length is ~8% longer than flat width (plus 5% overlap allowance)
  // Flat: flat area plus 5% overlap allowance
  const roofMultiplier = activeConfig.roofType === 'Gable Roof' ? 1.10 : 
                         activeConfig.roofType === 'Curved Roof' ? 1.13 : 1.05;
  const roofingArea = Math.round(totalArea * roofMultiplier);

  // Spacing estimates
  const spacing = 15; // ft spacing
  const colsX = Math.max(2, Math.ceil(activeConfig.length / spacing) + 1);
  const colsZ = Math.max(2, Math.ceil(activeConfig.width / spacing) + 1);
  const totalColumns = (colsX * 2) + ((colsZ - 2) * 2);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8 text-left">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Controls & Configurations */}
        <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
          
          <div className="space-y-2">
            <span className="text-[#FAB319] text-xs font-black tracking-widest uppercase block">
              3D Design Studio
            </span>
            <h3 className="text-2xl font-black text-white leading-tight font-display">
              Structure Builder
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Define the dimensions and properties of your fabrication shed below to render a real-time scaled 3D model.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl space-y-5">
            
            {/* Dimensions Section */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-400 tracking-wider uppercase border-b border-slate-800/80 pb-2 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-[#FAB319]" />
                <span>Dimensions (feet)</span>
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Length (L)</label>
                  <input
                    type="number"
                    name="length"
                    value={inputs.length}
                    onChange={handleInputChange}
                    min={20}
                    max={150}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#1E508C]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Width (W)</label>
                  <input
                    type="number"
                    name="width"
                    value={inputs.width}
                    onChange={handleInputChange}
                    min={15}
                    max={100}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#1E508C]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Height (H)</label>
                  <input
                    type="number"
                    name="height"
                    value={inputs.height}
                    onChange={handleInputChange}
                    min={10}
                    max={50}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#1E508C]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Structure Type Selectors */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-400 tracking-wider uppercase border-b border-slate-800/80 pb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#FAB319]" />
                <span>Structure Specifications</span>
              </h4>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Structure Type</label>
                  <select
                    name="structureType"
                    value={inputs.structureType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E508C] appearance-none"
                  >
                    <option value="Warehouse">Warehouse (Cladded Walls)</option>
                    <option value="Factory Shed">Factory Shed (Semi-Open)</option>
                    <option value="Car Parking Shed">Car Parking Shed (Open Frame)</option>
                    <option value="Residential Roofing">Residential Roofing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Roof Profile</label>
                  <select
                    name="roofType"
                    value={inputs.roofType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#1E508C]"
                  >
                    <option value="Gable Roof">Gable Roof (Sloped)</option>
                    <option value="Curved Roof">Curved Roof (Arched)</option>
                    <option value="Flat Roof">Flat Roof (Slab)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Roofing color picker */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase block">Roof Color Theme</label>
              <div className="flex gap-2">
                {ROOF_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setInputs(prev => ({ ...prev, roofColor: color.hex }))}
                    className={`w-7 h-7 rounded-full border-2 transition ${
                      inputs.roofColor === color.hex ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              className="w-full bg-[#1E508C] hover:bg-blue-700 text-white py-3 rounded-xl font-black uppercase text-xs tracking-wider transition-all duration-150 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 shadow-md shadow-blue-950/40"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
              <span>Generate 3D Design</span>
            </button>
          </form>

          {/* Calculations Cards */}
          <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
            <h4 className="text-[11px] font-black text-slate-400 tracking-wider uppercase border-b border-slate-800/80 pb-2 flex items-center gap-1.5">
              <Sigma className="w-3.5 h-3.5 text-[#FAB319]" />
              <span>Engineering Estimates</span>
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 text-left">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block">Footprint Area</span>
                <span className="text-lg font-black text-white">{totalArea.toLocaleString()}</span>
                <span className="text-[10px] font-medium text-slate-400 ml-1">sq.ft</span>
              </div>

              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 text-left">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block">Est. Roofing Sheet</span>
                <span className="text-lg font-black text-[#FAB319]">{roofingArea.toLocaleString()}</span>
                <span className="text-[10px] font-medium text-slate-400 ml-1">sq.ft</span>
              </div>
            </div>

            <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/60 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Columns Required:</span>
                <span className="text-white font-bold">{totalColumns} cols</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Avg Column Spacing:</span>
                <span className="text-white font-bold">~15.0 ft</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Total Height (inc. roof):</span>
                <span className="text-white font-bold">
                  {Math.round(activeConfig.height + (activeConfig.roofType === 'Gable Roof' ? activeConfig.width * 0.25 : activeConfig.roofType === 'Curved Roof' ? activeConfig.width * 0.2 : 0))} ft
                </span>
              </div>
            </div>
          </div>

          {/* PDF Export Action Card */}
          <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
            <h4 className="text-[11px] font-black text-slate-400 tracking-wider uppercase border-b border-slate-800/80 pb-2 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#FAB319]" />
              <span>Export Options</span>
            </h4>
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full bg-[#FAB319] hover:bg-amber-500 text-slate-950 py-3 rounded-xl font-black uppercase text-xs tracking-wider transition-all duration-150 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isDownloading ? 'Generating PDF...' : 'Download Design Report'}
            </button>
            {downloadSuccess && (
              <div className="text-[10px] text-emerald-400 font-bold text-center mt-1.5">
                PDF downloaded successfully.
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: 3D Canvas Viewport */}
        <div className="flex-1 min-h-[400px] sm:min-h-[500px] lg:min-h-[620px] bg-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col justify-end">
          
          {/* 3D Canvas rendering */}
          <div ref={canvasContainerRef} className="absolute inset-0 z-0">
            <Canvas
              shadows
              gl={{ preserveDrawingBuffer: true }}
              camera={{ position: [activeConfig.length * 0.4, activeConfig.height * 0.5, activeConfig.width * 0.5], fov: 45 }}
            >
              <color attach="background" args={['#090d16']} />
              <Structure3D
                length={activeConfig.length}
                width={activeConfig.width}
                height={activeConfig.height}
                structureType={activeConfig.structureType}
                roofType={activeConfig.roofType}
                roofColor={activeConfig.roofColor}
              />
            </Canvas>
          </div>

          {/* Interactive Navigation Helper Overlay */}
          <div className="relative z-10 p-4 m-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl max-w-sm pointer-events-none self-start flex gap-3 items-center">
            <div className="bg-[#FAB319]/10 text-[#FAB319] p-2.5 rounded-xl flex items-center justify-center border border-[#FAB319]/20 shadow-inner">
              <Info className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h5 className="text-[11px] font-black text-white tracking-wide uppercase">3D Navigation controls</h5>
              <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                Drag left button to rotate, right button to pan. Use scroll wheel to zoom in and out.
              </p>
            </div>
          </div>

          {/* Active Config Status Tag */}
          <div className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 text-[10px] font-black text-slate-200 px-3 py-1.5 rounded-xl uppercase tracking-wider">
            Active: {activeConfig.length}'L × {activeConfig.width}'W × {activeConfig.height}'H
          </div>

        </div>

      </div>
    </div>
  );
}
