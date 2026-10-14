import React from 'react';
import { DimensionScores } from '../types';

interface RadarChartProps {
  scores: DimensionScores;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 320 }) => {
  const center = size / 2;
  const radius = size * 0.38;

  const dimensions = [
    { key: 'career' as const, label: '事业学业', value: scores.career, color: '#F59E0B' },
    { key: 'wealth' as const, label: '财富理财', value: scores.wealth, color: '#10B981' },
    { key: 'love' as const, label: '情感人际', value: scores.love, color: '#EC4899' },
    { key: 'health' as const, label: '身体精力', value: scores.health, color: '#3B82F6' },
    { key: 'serendipity' as const, label: '贵人灵感', value: scores.serendipity, color: '#8B5CF6' },
  ];

  const totalAxes = dimensions.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Calculate coordinates for a given index and value (0 - 100)
  const getCoordinates = (index: number, val: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const currentRadius = (val / 100) * radius;
    const x = center + currentRadius * Math.cos(angle);
    const y = center + currentRadius * Math.sin(angle);
    return { x, y };
  };

  // Polygon points string for the score area
  const polygonPoints = dimensions
    .map((dim, i) => {
      const { x, y } = getCoordinates(i, dim.value);
      return `${x},${y}`;
    })
    .join(' ');

  // Web rings (e.g., 20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="scorePolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Outer ambient glow circle */}
        <circle cx={center} cy={center} r={radius * 1.1} fill="url(#radarGlow)" />

        {/* Concentric grid webs */}
        {rings.map((rFactor, idx) => {
          const points = dimensions
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = radius * rFactor;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');
          return (
            <polygon
              key={`ring-${idx}`}
              points={points}
              fill="none"
              stroke="#334155"
              strokeDasharray={idx === rings.length - 1 ? 'none' : '3 3'}
              strokeWidth={idx === rings.length - 1 ? 1.5 : 1}
            />
          );
        })}

        {/* Axis Lines */}
        {dimensions.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#475569"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Score Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#scorePolyGrad)"
          stroke="#F59E0B"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
        />

        {/* Vertex Dots & Score Tags */}
        {dimensions.map((dim, i) => {
          const { x, y } = getCoordinates(i, dim.value);
          const labelCoords = getCoordinates(i, 122);

          return (
            <g key={`point-${dim.key}`}>
              {/* Point glowing circle */}
              <circle
                cx={x}
                cy={y}
                r="5"
                fill={dim.color}
                stroke="#0F172A"
                strokeWidth="2"
                className="transition-all duration-700 ease-out"
              />

              {/* Label and score text */}
              <text
                x={labelCoords.x}
                y={labelCoords.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#E2E8F0"
                fontSize="12"
                fontWeight="600"
                className="font-sans drop-shadow-md"
              >
                {dim.label}
              </text>
              <text
                x={labelCoords.x}
                y={labelCoords.y + 15}
                textAnchor="middle"
                dominantBaseline="central"
                fill={dim.color}
                fontSize="13"
                fontWeight="700"
                className="font-mono drop-shadow-md"
              >
                {dim.value}分
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
