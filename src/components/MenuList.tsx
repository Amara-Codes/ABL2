import qs from 'qs';
import MenuCategoryTitle from '@/components/MenuCategoryTitle';
import AutoScroller from '@/components/AutoScroller';

const TARGET_CATEGORIES = ['Beer', 'Cocktail', 'Probiotic', 'Snack', 'Liquor'];
const STRAPI_URL = process.env.NEXT_PUBLIC_CASHIER_STRAPI_URL || 'http://localhost:1337';

const SCROLL_DURATION = 100;

const CategoryContent = ({
    data,
    theme = 'dark',
    titleOptions = { displayType: 'horizontal', textAlign: 'left' },
    bgColor = '',
}: {
    data: any,
    theme?: 'dark' | 'light',
    titleOptions?: { displayType?: 'horizontal' | 'vertical', textAlign?: 'left' | 'center' | 'right' },
    bgColor?: string,
}) => {
    const products = data?.products || [];

    if (!products.length && !data?.name) return <p className="opacity-50 italic">Loading...</p>;
    if (products.length === 0) return <p className="opacity-50 italic">Coming soon...</p>;

    const isVertical = titleOptions.displayType === 'vertical';

    return (
        <div className={`h-full overflow-hidden ${isVertical ? 'flex flex-row gap-6' : 'flex flex-col'}  ${bgColor}`}>
            {/* Titolo */}
            <div className={`z-10 ${isVertical ? 'flex-shrink-0 pt-2' : 'pb-2'}`}>
                <MenuCategoryTitle
                    title={data.name}
                    displayType={titleOptions.displayType}
                    textAlign={titleOptions.textAlign}
                    color={theme === 'dark' ? 'text-white' : 'text-black'}
                />
            </div>

            {/* Lista Prodotti */}
            <div className="flex-1 overflow-hidden relative mask-gradient">
                <AutoScroller duration={SCROLL_DURATION}>
                    <ul className="space-y-3 pb-3">
                        {products.map((prod: any) => (
                            <li key={prod.id} className={`border-b pb-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-baseline">
                                    <span className={`font-bold text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {prod.name}
                                    </span>
                                    {prod.price && (
                                        <span className={`font-bold text-4xl pe-4 ${theme === 'dark' ? 'text-amber-400 drop-shadow-[0px_0px_8px_rgba(254,230,133,1)]' : 'text-red-600 drop-shadow-[0px_0px_8px_rgba(254,165,213,1)]'}`}>
                                            ${prod.price}
                                        </span>
                                    )}
                                </div>
                                {prod.description && (
                                    prod.description
                                        .split('_')
                                        .filter((frag: string) => frag.trim() !== "")
                                        .map((text: string, index: number, array: string[]) => (
                                            <p
                                                key={index}
                                                className={`text-2xl mt-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                                                    } ${
                                                    index === 0 && array.length > 1
                                                        ? 'font-regular text-lg uppercase font-serif mb-4 !text-amber-400'
                                                        : ''
                                                    }`}
                                            >
                                                {text}
                                            </p>
                                        ))
                                )}
                            </li>
                        ))}
                    </ul>
                </AutoScroller>
            </div>
        </div>
    );
};

async function getCategoriesData() {
    const query = qs.stringify({
        filters: { name: { $in: TARGET_CATEGORIES } },
        populate: 'products',
    }, { encodeValuesOnly: true });

    try {
        const res = await fetch(`${STRAPI_URL}/api/categories?${query}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed');
        return res.json();
    } catch (e) {
        console.error(e);
        return { data: [] };
    }
}

export default async function MenuList() {
    const response = await getCategoriesData();
    const rawCategories = response?.data || [];

    const catMap = rawCategories.reduce((acc: any, cat: any) => {
        const name = cat.name;
        acc[name] = cat;
        return acc;
    }, {});

    return (
        // CAMBIAMENTO 1: min-h-screen su mobile, h-screen su desktop (lg)
        // overflow-y-auto su mobile (per scorrere la pagina), hidden su desktop
        <div className="min-h-screen lg:h-screen bg-cream/90 p-4 overflow-y-auto lg:overflow-hidden">

            {/* CAMBIAMENTO 2: Struttura Flex su Mobile -> Grid su Desktop
               Su mobile gli elementi stanno uno sotto l'altro (flex-col).
               Da 'lg' in su (laptop/desktop) diventano la griglia 3x5 che avevi.
            */}
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-5 h-auto lg:h-full">

                {/* 1. BEER */}
                {/* Su mobile diamo un'altezza fissa (es. h-[600px]) per permettere lo scroll interno */}
                <div className="h-[600px] lg:h-auto lg:col-span-2 lg:row-span-3 bg-gray-800 rounded-md shadow-md p-4 overflow-hidden">
                    {/* Nota: Su mobile il titolo verticale potrebbe occupare troppo spazio, potresti volerlo condizionale, ma per ora lo lasciamo così */}
                    <CategoryContent data={catMap['Beer']} theme="dark" titleOptions={{ displayType: 'vertical' }} />
                </div>

                {/* 2. LIQUORS */}
                <div className="h-[400px] lg:h-auto lg:row-span-2 bg-gray-700 rounded-md  shadow-md p-4 overflow-hidden">
                    <CategoryContent data={catMap['Liquor']} bgColor='bg-gray-700' theme="dark" titleOptions={{ displayType: 'horizontal', textAlign: 'center' }} />
                </div>

                {/* 4. SNACKS */}
                {/* Ordine: In flex mobile appare qui. In Grid desktop viene posizionato dal row-span/col-span implicito */}
                <div className="h-[500px] lg:h-auto lg:row-span-3 bg-white rounded-md shadow-md p-4 overflow-hidden">
                    <CategoryContent data={catMap['Snack']} theme="light" titleOptions={{ displayType: 'horizontal', textAlign: 'center' }} />
                </div>

                {/* 5. COCKTAILS */}
                <div className="h-[500px] lg:h-auto lg:col-span-2 lg:row-span-2 bg-gray-600  rounded-md shadow-md p-4 overflow-hidden">
                    <CategoryContent data={catMap['Cocktail']} theme="dark" bgColor='' titleOptions={{ displayType: 'horizontal', textAlign: 'left' }} />
                </div>
            </div>
        </div>
    );
}