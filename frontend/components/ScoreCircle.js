export default function ScoreCircle({
  score,
  label = "Score"
}) {

  const radius = 70;

  const circumference =
    2 *
    Math.PI *
    radius;

  const offset =
    circumference -
    (
      score / 100
    ) *
    circumference;

  return (

    <div
      className="
      flex
      justify-center
      items-center
      "
    >

      <div
        className="
        relative
        h-44
        w-44
        "
      >

        <svg
          className="
          -rotate-90
          "
          width="176"
          height="176"
        >

          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke="#27272a"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke="#22c55e"
            strokeWidth="12"
            fill="none"
            strokeDasharray={
              circumference
            }
            strokeDashoffset={
              offset
            }
            strokeLinecap="round"
          />

        </svg>

        <div
          className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          "
        >

          <span
            className="
            text-5xl
            font-bold
            text-green-400
            "
          >
            {score}
          </span>

          <span
            className="
            text-zinc-400
            text-sm
            "
          >
            {label}
          </span>

        </div>

      </div>

    </div>

  );

}