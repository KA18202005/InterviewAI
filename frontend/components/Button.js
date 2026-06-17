export default function Button({
  children,
  onClick,
  className = "",
  type = "button"
}) {

  return (

    <button
      type={type}
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-xl
        font-medium
        bg-gradient-to-r
        from-blue-500
        to-purple-600
        text-white
        hover:scale-105
        transition-all
        duration-300
        shadow-lg
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>

  );
}