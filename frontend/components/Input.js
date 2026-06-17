export default function Input({
  ...props
}) {

  return (

    <input
      {...props}
      className="
      w-full
      bg-zinc-900
      border
      border-zinc-800
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
      transition-all
      "
    />

  );
}