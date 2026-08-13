import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants = "primary" | "outline" | "secondary" | "success" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: ButtonVariants;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariants, string> = {
    primary: "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:translate-y-0",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    success: "bg-green-500 text-[#051626] hover:brightness-90",
    danger: "bg-red-500 text-white hover:brightness-90",
  };

 const renderLoading = () => (
  <div className="flex items-center justify-center gap-2">
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <title>Carregando...</title>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset="12"
        fill="none"
      />
    </svg>
    {children}
  </div>
);
  return (
    <button
      type="button"
      className={`cursor-pointer px-5 py-2.5 rounded-xl font-mediun transition-all flex items-center justify-center
        ${variantClasses[variant]}
        ${isLoading || disabled ? "opacity-70 curso-not-allowed" : ""}
        ${className}
        ${fullWidth ? "w-full" : ""} `}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? renderLoading() : children}
    </button>
  );
};

export default Button;
