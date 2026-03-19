interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "default";
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button
      className={`leading-none font-semibold px-5 py-2 rounded-2xl text-xl text- cursor-pointer text-white ${variant === "primary" ? "bg-green-500" : variant === "secondary" ? "bg-blue-500" : variant === "default" ? "bg-gray-500" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
