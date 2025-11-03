import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Gift Redeem",
  description: "QR Code gift redeem",
 robots: "noindex, nofollow"
};

type Props = {
  params: { countryCode: string; code: string };
};

export default async function GiftCheckPage({ params }: Props) {
  const encryptedCode = params.code;

  async function getKeyFromEnv(): Promise<CryptoKey> {
    const secretKey = process.env.NEXT_PUBLIC_GIFT_SECRET_KEY || "default_secret_key"; // Fallback se SECRET_KEY non è definito

    // Converte la chiave in Uint8Array
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);

    // Calcola l'hash SHA-256 per ottenere una chiave di 256 bit
    const hashedKey = await crypto.subtle.digest("SHA-256", keyData);

    // Importa la chiave come chiave AES
    return crypto.subtle.importKey(
      "raw", // Tipo di chiave
      hashedKey, // Usa l'hash come key data
      { name: "AES-GCM" }, // Algoritmo
      false, // Non permettere esportazione della chiave
      ["encrypt", "decrypt"] // Operazioni consentite
    );
  }

  async function decrypt(encryptedDataHex: string): Promise<{ name: string; date: string }> {
    try {
      const key = await getKeyFromEnv(); // Ottieni la chiave da process.env

      // Converte la stringa Hex in Uint8Array
      const combinedBuffer = new Uint8Array(
        encryptedDataHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
      );

      // Estrai l'IV (primi 12 byte) e i dati cifrati
      const iv = combinedBuffer.slice(0, 12); // IV è lungo 12 byte
      const encryptedData = combinedBuffer.slice(12); // Dati cifrati

      // Decifra i dati
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        encryptedData
      );

      // Converte i dati decifrati in stringa
      const decoder = new TextDecoder();
      const decryptedString = decoder.decode(decryptedBuffer);

      // Divide il contenuto decifrato in nome e data
      const [name, date] = decryptedString.split("||");
      return { name, date };
    } catch (error) {
      throw new Error("Invalid code or decryption failed.");
    }
  }

  // Variabili per gestire il risultato
  let couponDetails: { name: string; date: string } | null = null;
  let errorMessage: string | null = null;

  // Tenta di decifrare il codice
  try {
    couponDetails = await decrypt(encryptedCode);
  } catch (error) {
    errorMessage = "The code provided is invalid or decryption failed.";
  }

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container mt-32">
      <div className="w-full">
        <div className="mb-16 small:mx-12">
          <h1
            className="mb-16 font-extrabold text-4xl text-center text-primary small:text-8xl font-fatboy"
            data-testid="secret-gift-page-title"
          >
            Gift Check
          </h1>
        </div>

        <div className="flex small:mx-12 justify-center">
          <div className="w-full">
            {couponDetails ? (
              <div>
                <div className="flex gap-4 flex-col small:flex-row text-xl small:text-4xl items-center mb-8">
                  <p className="text-ui-fg-base">
                    <strong>Free tasting Coupon</strong> valid for:

                  </p>
                  <p className="text-primary font-bold">{couponDetails.name}</p>
                </div>
                <div className="flex gap-4 flex-col small:flex-row text-xl small:text-4xl items-center">
                  <p className="text-ui-fg-base">
                    Coupon generated on:

                  </p>
                  <p className="text-white">{couponDetails.date}</p>
                </div>

              </div>


            ) : (
              <p className="text-red-600 text-4xl mb-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
