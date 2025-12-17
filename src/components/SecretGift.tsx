"use client";

import { useQRCode } from "next-qrcode";
import { useState } from "react";
import Link from "next/link";

const SecretGiftClient = () => {
    const { Canvas } = useQRCode();
    const [name, setName] = useState<string>("");
    const [qrText, setQrText] = useState<string>("");

    const getKeyFromEnv = (): Promise<CryptoKey> => {
        return new Promise((resolve, reject) => {
            const secretKey = process.env.NEXT_PUBLIC_GIFT_SECRET_KEY || "default_secret_key";
            const encoder = new TextEncoder();
            const keyData = encoder.encode(secretKey);
            crypto.subtle.digest("SHA-256", keyData).then((hashedKey) => {
                crypto.subtle
                    .importKey("raw", hashedKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
                    .then(resolve)
                    .catch(reject);
            }).catch(reject);
        });
    };

    const encrypt = (data: string): Promise<string> => {
        return getKeyFromEnv().then((key) => {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encoder = new TextEncoder();

            return crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(data)).then((encryptedData) => {
                const combinedBuffer = new Uint8Array(iv.length + encryptedData.byteLength);
                combinedBuffer.set(iv, 0);
                combinedBuffer.set(new Uint8Array(encryptedData), iv.length);

                return Array.from(combinedBuffer)
                    .map((byte) => byte.toString(16).padStart(2, "0"))
                    .join("");
            });
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const currentDate = new Date().toLocaleString();
        const dataToEncrypt = `${name}||${currentDate}`;
        encrypt(dataToEncrypt).then((hashed) => {
            setQrText(`https://amarabeerlab.com/gift-check/${hashed}`);
        });
    };

    const handleDownload = (): void => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "gift-qr-code.png";
            link.click();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-start py-6 content-container mt-32">
            <div className="w-full max-w-6xl mx-auto px-4 lg:px-0">
                <div className="mb-16 lg:mx-12 w-fit mx-auto">
                    <h1 className="mb-8 lg:mb-16 font-extrabold text-4xl text-center text-primary lg:text-8xl font-fatboy" data-testid="secret-gift-page-title">
                        Secret Gift
                    </h1>
                    <div>
                        <p className="text-white text-xl lg:text-2xl mb-4 lg:mb-0">
                            Congratulations! You&apos;ve just won a free tasting of all the beers we&apos;ll have on tap when you visit our taproom! <br />
                            To claim your prize, follow these simple steps:
                        </p>
                        <ol className="list-decimal text-secondary font-bold ml-6 my-3">
                            <li>
                                <p className="text-lg font-bold pb-4 lg:pb-0 text-white">Enter your name and surname in the form below</p>
                            </li>
                            <li>
                                <p className="text-lg font-bold pb-4 lg:pb-0 text-white">Generate your personalized QR code</p>
                            </li>
                            <li>
                                <p className="text-lg font-bold pb-4 lg:pb-0 text-white">Download the QR code and save it to your gallery</p>
                            </li>
                            <li>
                                <p className="text-lg font-bold pb-4 lg:pb-0 text-white">Show it to our staff at the taproom to redeem your free tasting</p>
                            </li>
                        </ol>
                        <p className="text-white text-xl lg:text-2xl">
                            The promotion is valid for one month starting from the opening party. <br />
                            <Link href="/contacts" data-testid="contacts-link" className="underline hover:text-secondary transition duration-500">Stay connected</Link> for updates on the opening party and more!
                        </p>
                        <div className="mt-4 text-ui-fg-muted text-lg lg:text-xl">
                            <p>
                                Please note: Make sure to use your real name, as we will ask you to confirm your identity in the Taproom.
                            </p>
                            <p>
                                <strong>
                                    No data is saved to our database during this process. Your privacy is safe with us. :)
                                </strong>
                            </p>
                        </div>
                    </div>
                    <div className="flex lg:mx-12 justify-center">
                        <div className="w-full">
                            <p className="text-secondary text-2xl lg:text-4xl mt-8 mb-4"> Generate your QR Code </p>
                            <form onSubmit={handleSubmit} className="flex items-center w-full gap-x-4">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="GiftOwnerName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-full w-full p-3  text-black border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button type="submit" className={`py-2 px-4 rounded text-white font-bold border-2 transition ${name.trim() ? "bg-primary hover:bg-secondary cursor-pointer border-primary hover:border-secondary" : "bg-gray-300 cursor-not-allowed opacity-50 border-gray-500"}`} disabled={!name.trim()}>
                                    Generate
                                </button>
                            </form>
                         
                            {qrText && (
                                <div className="w-full mt-8 flex flex-col items-center">
                                    <div className="border-4 border-secondary rounded-lg">
                                        <Canvas text={qrText} options={{ errorCorrectionLevel: "M", margin: 3, scale: 4, width: 200, color: { dark: "#FF850E", light: "#000000" } }} />
                                    </div>
                                    <button onClick={handleDownload} className="mt-4 text-white py-2 px-4 rounded bg-primary hover:bg-secondary transition font-bold">
                                        Download QR Code
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SecretGiftClient;
