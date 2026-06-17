export default function Textarea({
  ...props
}) {

  return (

    <textarea
      {...props}
      className="
      w-full
      bg-zinc-900
      border
      border-zinc-800
      rounded-xl
      p-4
      outline-none
      focus:border-blue-500
      transition-all
      "
    />

  );
}