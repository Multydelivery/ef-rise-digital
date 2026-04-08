export default function USFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7410 3900"
      className={`pointer-events-none ${className}`}
    >
      <rect width="7410" height="3900" fill="#b22234" />
      <path
        d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0"
        stroke="#fff"
        strokeWidth="300"
      />
      <rect width="2964" height="2100" fill="#3c3b6e" />
      <g fill="#fff">
        {[...Array(9)].map((_, i) =>
          [...Array(11)].map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={247 + j * 494}
              cy={247 + i * 420}
              r="90"
            />
          ))
        )}
        {[...Array(8)].map((_, i) =>
          [...Array(10)].map((_, j) => (
            <circle
              key={`${i}-${j}-offset`}
              cx={494 + j * 494}
              cy={457 + i * 420}
              r="90"
            />
          ))
        )}
      </g>
    </svg>
  );
}
