import type { ReactNode } from 'react'

export function NotFoundAnimation(): ReactNode {
  return (
    <svg
      width="200"
      height="140"
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mb-8"
    >
      <style>
        {`
          @keyframes drawGrid {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeCell {
            to { opacity: 1; }
          }
          @keyframes pulseZero {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.6; }
          }
          .grid-line { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawGrid 0.8s ease-out forwards; }
          .grid-line:nth-child(2) { animation-delay: 0.1s; }
          .grid-line:nth-child(3) { animation-delay: 0.2s; }
          .grid-line:nth-child(4) { animation-delay: 0.3s; }
          .grid-line:nth-child(5) { animation-delay: 0.4s; }
          .cell-digit { opacity: 0; animation: fadeCell 0.4s ease-out forwards; }
          .cell-digit:nth-child(1) { animation-delay: 0.5s; }
          .cell-digit:nth-child(2) { animation: fadeCell 0.4s ease-out forwards, pulseZero 2.5s ease-in-out 1s infinite; }
          .cell-digit:nth-child(3) { animation-delay: 0.6s; }
        `}
      </style>

      <rect
        x="1"
        y="1"
        width="198"
        height="138"
        rx="10"
        stroke="#1E40AF"
        strokeWidth="1.5"
        className="grid-line"
      />
      <line
        x1="1"
        y1="47"
        x2="199"
        y2="47"
        stroke="#1E40AF"
        strokeWidth="1.5"
        className="grid-line"
      />
      <line
        x1="1"
        y1="93"
        x2="199"
        y2="93"
        stroke="#1E40AF"
        strokeWidth="1.5"
        className="grid-line"
      />
      <line
        x1="67"
        y1="1"
        x2="67"
        y2="139"
        stroke="#1E40AF"
        strokeWidth="1.5"
        className="grid-line"
      />
      <line
        x1="134"
        y1="1"
        x2="134"
        y2="139"
        stroke="#1E40AF"
        strokeWidth="1.5"
        className="grid-line"
      />

      <text
        x="33"
        y="112"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="38"
        fontWeight="600"
        fill="#1E40AF"
        className="cell-digit"
      >
        4
      </text>
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="38"
        fontWeight="600"
        fill="#1E40AF"
        className="cell-digit"
      >
        0
      </text>
      <text
        x="167"
        y="112"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="38"
        fontWeight="600"
        fill="#1E40AF"
        className="cell-digit"
      >
        4
      </text>
    </svg>
  )
}
