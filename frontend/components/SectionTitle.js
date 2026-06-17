export default function SectionTitle({
  children
}) {

  return (

    <h1
      className="
      text-4xl
      font-bold
      mb-8
      bg-gradient-to-r
      from-blue-400
      to-purple-500
      bg-clip-text
      text-transparent
      "
    >
      {children}
    </h1>

  );
}