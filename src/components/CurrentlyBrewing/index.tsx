import Link from "next/link";
import Image from "next/image";
import ProgressBar from "./ProgressBar";


type Props = {};

export default function CurrentlyBrewing({ }: Props) {
      return (
            <div className="max-w-screen-xl mx-auto text-center">
                  <h2 className="text-4xl text-primary font-fatboy mb-8">Currently Brewing</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-32 bg-slate-200 border-4 border-secondary rounded-lg p-8">
                        <div className="fermenter-1">
                              <p className="text-primary font-bold text-2xl">200lt Fermenter</p>
                              <p className="text-secondary font-medium text-lg text-center">Formerly "Antonio"</p>
                              <Image className="mx-auto my-8" src="/images/200l.png" width={300} height={300} alt="fementer-1" />

                              <p>We're brewing an
                                    <Link className="ps-2 underline text-secondary" href={'/category/ipa'} >IPA</Link>
                              </p>

                              <Link className="font-extrabold text-primary underline mb-8 text-4xl" href={'/beers/ciccia-buriccia'}>Ciccia Buriccia</Link>
                <div className="mt-8">

                              <ProgressBar textColor="#FA4700" barColor="#FF850E" progressAmount={5} />
                              </div>
                        </div>
                        <div className="fermenter-2">
                              <p className="text-primary font-bold text-2xl">400lt Fermenter</p>
                              <p className="text-secondary font-medium text-lg text-center">Formerly "Peppe"</p>
                              <Image className="mx-auto my-8" src="/images/400l.png" width={300} height={300} alt="fementer-2" />

                              <p>We're brewing an
                                    <Link className="ps-2 underline text-secondary" href={'/category/golden-ale'} >Golden Ale</Link>
                              </p>

                              <Link className="font-extrabold text-primary underline mb-8 text-4xl" href={'/beers/fantastic'}>Fantastic</Link>
                                <div className="mt-8">

                              <ProgressBar textColor="#FA4700" barColor="#FF850E" progressAmount={30} />
                              </div>
                        </div>
                        <div className="fermenter-3">
                              <p className="text-primary font-bold text-2xl">400lt Fermenter</p>
                              <p className="text-secondary font-medium text-lg text-center">Formerly "Franco"</p>
                              <Image className="mx-auto my-8" src="/images/400l.png" width={300} height={300} alt="fementer-1" />

                              <p>We're brewing an
                                    <Link className="ps-2 underline text-secondary" href={'/category/hazy-ipa'} >Hazy IPA</Link>
                              </p>

                              <Link className="font-extrabold text-primary underline mb-8 text-4xl" href={'/beers/mr-magoo'}>Mr Magoo</Link>
                                 <div className="mt-8">

                              <ProgressBar textColor="#FA4700" barColor="#FF850E" progressAmount={20} />
                              </div>
                        </div>
                        <div className="fermenter-4">
                              <p className="text-primary font-bold text-2xl">200lt Fermenter</p>
                              <p className="text-secondary font-medium text-lg text-center">Formerly "Lucio"</p>
                              <Image className="mx-auto my-8" src="/images/200l.png" width={300} height={300} alt="fementer-1" />

                              <p>We're brewing an
                                    <Link className="ps-2 underline text-secondary" href={'/category/kettle-sour'} >Kettle Sour</Link>
                              </p>

                              <Link className="font-extrabold text-primary underline mb-8 text-4xl" href={'/beers/wilder'}>Wilder</Link>
                              <div className="mt-8">

                              <ProgressBar textColor="#FA4700" barColor="#FF850E" progressAmount={80} />
                              </div>
                        </div>
                  </div>
            </div>
      );
}
