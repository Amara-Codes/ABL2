import Link from "next/link";
import clsx from "clsx";
import internal from "stream";

type Props = {
  buttonLink: string | null;
  buttonText: string | null;
  className?: string;
  type: "ext" | "int";
};

export default function Button({ buttonLink, buttonText, className, type = "int" }: Props) {
  return (
    <Link
      className={clsx(
        "rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl",
        className,
      )}
      href={buttonLink ?? "#"}
      target={type === "ext" ? "_blank" : "_self"}
      rel={type === "ext" ? "noopener noreferrer" : undefined}
    >
      {buttonText}
    </Link>
  );
}
