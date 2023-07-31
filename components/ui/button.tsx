import { clsx } from "clsx";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, disabled = false, children, ...props }) => {
  return (
    <button
      type="submit"
      className={clsx(
        disabled
          ? "focus:ring-grey-900 cursor-not-allowed bg-gray-600  text-gray-300 opacity-30 hover:bg-none focus:ring-0"
          : "cursor-pointer bg-blue-600 text-white opacity-100 hover:bg-blue-300 focus:ring-blue-900 ",
        `inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium enabled:cursor-pointer enabled:bg-blue-600 enabled:text-white enabled:opacity-100 enabled:hover:bg-blue-800 enabled:focus:ring-4 enabled:focus:ring-blue-900 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 disabled:opacity-30 disabled:hover:bg-none disabled:focus:ring-0 disabled:focus:ring-gray-900`,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
