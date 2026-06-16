type Props = { size?: number; className?: string };

export default function SabalaLogo({ size = 56, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1144.85 1144.85"
      fill="none"
      className={className}
      role="img"
      aria-label="Sabala Studios"
    >
      <defs>
        <linearGradient
          id="sabala-logo-gradient"
          x1="776.75"
          y1="927.53"
          x2="366.71"
          y2="217.32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#AD9553" />
          <stop offset="0.25" stopColor="#A38A4D" />
          <stop offset="0.53" stopColor="#9F864A" />
          <stop offset="1" stopColor="#AD9553" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        fill="url(#sabala-logo-gradient)"
        d="M572.42,162.39c226.31,0,410.03,183.73,410.03,410.03S798.73,982.46,572.42,982.46c-226.3,0-410.03-183.73-410.03-410.03S346.12,162.39,572.42,162.39L572.42,162.39z M683.51,387.94c78.8,108.1,156.41,276.57,129.49,323.49c-40.65,70.85-441.34,76.93-481.14,7.47c-9.18-16.02-5.42-47.19,6.78-85.71c70.28,26.26,349.52,66.92,348.55-60.77c-0.61-80.94-107.77-53.19-93.8-118.15C603.19,408.73,683.2,388.02,683.51,387.94L683.51,387.94z M675.39,377.01c-0.33,0.09-83.4,22.07-96.65,70.31c-21.22,77.22,85.14,65.46,92.43,113.25c18.72,122.73-259.56,84.32-327.89,58.79c45.47-129.14,172.94-324.66,232.46-325.59C601,293.39,637.92,327.66,675.39,377.01L675.39,377.01z"
      />
    </svg>
  );
}
