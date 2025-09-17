import { BigTextContent } from "@/types";

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ content }: BigTextContent): JSX.Element => {
    const {
      bgColorClass, textColorClass, sentence

  } = content;
  return (
    <section 
      className={`min-h-screen w-screen overflow-hidden ${bgColorClass} ${textColorClass}`}
    >
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7] max-w-lg mx-auto">
           <div className="text-[34vw]">{sentence.split('\n')[0]}</div>
       
        {sentence.split('\n').map((word, i) => {
          if(i > 0) {

            if (i % 5 === 0 || (i % 5 === 4)) {
              return <div className={`text-[46vw] md:text-[15vw] text-left`} key={i}>{word}</div>;
            } else if (i % 5 === 1 || (i % 5 === 3)) {
              return <div className={`text-[26vw] md:text-[8vw] text-bold`} key={i}>{word}</div>;
            } else {
              return <div key={i} className="text-[18vw] md:text-[6vw] text-right">{word}</div>;
            }
          }
        })}

      </h2>
    </section>
  );
};

export default BigText;
