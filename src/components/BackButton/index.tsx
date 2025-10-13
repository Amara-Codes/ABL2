"use client"

export default function BackButton() {
    const handleSmoothBack = () => {
        // 1. Inizia lo scroll verso l'alto in modo fluido
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 2. Attendi 500ms prima di eseguire il back(),
        //    per dare il tempo all'animazione di essere visibile.
        setTimeout(() => {
            window.history.back();
        }, 500); // Puoi aggiustare questo valore se necessario
    };

    return (
        <button
            className="bg-white text-center w-16 lg:w-32 rounded-sm lg:rounded-2xl h-7 lg:h-14 relative text-black text-sm lg:text-xl font-semibold group"
            type="button"
            onClick={handleSmoothBack} // Usa la nuova funzione
        >
            <div
                className="lg:bg-primary rounded-xl h-6 lg:h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] lg:group-hover:w-[120px] z-10 duration-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="25px"
                    width="25px"
                >
                    <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#000000"
                    ></path>
                    <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                    ></path>
                </svg>
            </div>
            <p className="translate-x-2 font-fatboy">Back</p>
        </button>
    );
}