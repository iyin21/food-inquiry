

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={
        `flex  items-center rounded-lg bg-purple-500 px-4 text-md cursor-pointer font-medium text-white transition-colors hover:bg-purrple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 active:bg-purple-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50
        ${className}`
      }
    >
      {children}
    </button>
  );
}
