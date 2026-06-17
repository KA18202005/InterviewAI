export default function Card({
  children,
  className = ""
}) {

  return (

    <div
      className={`
        bg-zinc-900/50
        backdrop-blur-xl
        border
        border-zinc-800
        rounded-3xl
        p-6
        transition-all
        duration-300
        hover:border-blue-500/40
        hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
        ${className}
      `}
    >

      {children}

    </div>

  );

}