interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`border border-gray-400 rounded-lg p-1 leading-0 focus:outline-0 ${className}`}
      {...props}
    />
  );
};
export default Input;
