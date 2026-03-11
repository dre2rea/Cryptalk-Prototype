interface IconProps {
  className?: string;
  size?: number;
}

export function SearchIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MoonIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.3333 13.2035C17.2388 13.6985 16.0238 13.974 14.7446 13.974C9.92944 13.974 6.02597 10.0706 6.02597 5.25545C6.02597 3.97613 6.30151 2.76117 6.79648 1.66667C3.77147 3.03469 1.66667 6.07892 1.66667 9.61475C1.66667 14.4299 5.57012 18.3333 10.3853 18.3333C13.9211 18.3333 16.9653 16.2285 18.3333 13.2035Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 1.66667V3.33333M10 16.6667V18.3333M3.33333 10H1.66667M5.26177 5.26177L4.08325 4.08325M14.7382 5.26177L15.9168 4.08325M5.26177 14.7417L4.08325 15.9202M14.7382 14.7417L15.9168 15.9202M18.3333 10H16.6667M14.1667 10C14.1667 12.3012 12.3012 14.1667 10 14.1667C7.69882 14.1667 5.83333 12.3012 5.83333 10C5.83333 7.69882 7.69882 5.83333 10 5.83333C12.3012 5.83333 14.1667 7.69882 14.1667 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BellIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.79508 17.5C8.38254 18.0187 9.15284 18.3333 10.0001 18.3333C10.8473 18.3333 11.6176 18.0187 12.2051 17.5M15.0001 6.66667C15.0001 5.34058 14.4733 4.06881 13.5356 3.13113C12.5979 2.19345 11.3262 1.66667 10.0001 1.66667C8.67399 1.66667 7.40222 2.19345 6.46454 3.13113C5.52686 4.06881 5.00008 5.34058 5.00008 6.66667C5.00008 9.24182 4.35173 11.005 3.62442 12.1712C3.01332 13.1529 2.70777 13.6438 2.71825 13.7841C2.72987 13.9389 2.76306 13.9957 2.88775 14.0849C3.00008 14.1667 3.49726 14.1667 4.49161 14.1667H15.5086C16.5029 14.1667 17.0001 14.1667 17.1124 14.0849C17.2371 13.9957 17.2703 13.9389 17.2819 13.7841C17.2924 13.6438 16.9869 13.1529 16.3757 12.1712C15.6484 11.005 15.0001 9.24182 15.0001 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon({ className = "", size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.6666 17.5C16.6666 16.337 16.6666 15.7555 16.5232 15.2824C16.2 14.2279 15.3721 13.4001 14.3177 13.0768C13.8445 12.9334 13.263 12.9334 12.1 12.9334H7.89998C6.73696 12.9334 6.15544 12.9334 5.68235 13.0768C4.62786 13.4001 3.80004 14.2279 3.47674 15.2824C3.33331 15.7555 3.33331 16.337 3.33331 17.5M13.75 6.25C13.75 8.32107 12.0711 10 9.99998 10C7.92891 10 6.24998 8.32107 6.24998 6.25C6.24998 4.17893 7.92891 2.5 9.99998 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDownIcon({ className = "", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 8L1 2h8L5 8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowUpIcon({ className = "", size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 2L9 8H1L5 2z"
        fill="currentColor"
      />
    </svg>
  );
}
