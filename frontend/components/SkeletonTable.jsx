export default function SkeletonTable() {

    return (

        <div
            className="
            animate-pulse
            space-y-4
            "
        >

            {
                [...Array(5)].map(
                    (_, index) => (

                        <div
                            key={index}
                            className="
                            h-20
                            bg-zinc-900
                            rounded-2xl
                            "
                        />

                    )
                )
            }

        </div>

    );

}