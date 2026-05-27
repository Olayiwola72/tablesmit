import type { ReactNode } from 'react'
import './not-found-animation.styles.css'

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
