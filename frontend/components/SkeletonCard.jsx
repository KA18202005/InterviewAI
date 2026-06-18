export default function SkeletonCard() {

    return (

        <div
            className="
            animate-pulse
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            h-40
            "
        >

            <div
                className="
                p-6
                "
            >

                <div
                    className="
                    h-4
                    w-24
                    bg-zinc-800
                    rounded
                    mb-6
                    "
                />

                <div
                    className="
                    h-12
                    w-20
                    bg-zinc-800
                    rounded
                    "
                />

            </div>

        </div>

    );

}