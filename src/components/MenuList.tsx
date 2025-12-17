import qs from 'qs';
import MenuCategoryTitle from '@/components/MenuCategoryTitle';
import AutoScroller from '@/components/AutoScroller'; // Assicurati di importarlo

const TARGET_CATEGORIES = ['Beer', 'Cocktail', 'Probiotic', 'Snack', 'Liquor'];
const STRAPI_URL = process.env.NEXT_PUBLIC_CASHIER_STRAPI_URL || 'http://localhost:1337';

// --- CONFIGURAZIONE VELOCITÀ ---
// Secondi per completare un giro. 
// Aumenta questo numero per rallentare, diminuisci per velocizzare.
const SCROLL_DURATION = 100;

// --- Helper Component Aggiornato ---
const CategoryContent = ({
    data,
    theme = 'dark',
    titleOptions = { displayType: 'horizontal', textAlign: 'left' }
}: {
    data: any,
    theme?: 'dark' | 'light',
    titleOptions?: { displayType?: 'horizontal' | 'vertical', textAlign?: 'left' | 'center' | 'right' }
}) => {
    const products = data?.products || [];

    if (!products.length && !data?.name) return <p className="opacity-50 italic">Loading...</p>;
    if (products.length === 0) return <p className="opacity-50 italic">Coming soon...</p>;

    const isVertical = titleOptions.displayType === 'vertical';

    return (
        <div className={`h-full overflow-hidden ${isVertical ? 'flex flex-row gap-6' : 'flex flex-col'}`}>

            {/* Titolo (Fisso, non scrolla) */}
            <div className={`z-10 bg-inherit ${isVertical ? 'flex-shrink-0 pt-2' : 'pb-2'}`}>
                <MenuCategoryTitle
                    title={data.name}
                    displayType={titleOptions.displayType}
                    textAlign={titleOptions.textAlign}
                    color={theme === 'dark' ? 'text-white' : 'text-black'}
                />
            </div>

            {/* Lista Prodotti con AUTO-SCROLL */}
            {/* Il div flex-1 occupa tutto lo spazio rimanente, e AutoScroller gestisce il movimento interno */}
            <div className="flex-1 overflow-hidden relative mask-gradient">
                <AutoScroller duration={SCROLL_DURATION}>
                    <ul className="space-y-3 pb-3"> {/* Aggiunto padding bottom per staccare la copia duplicata */}
                        {products.map((prod: any) => (
                            <li key={prod.id} className={`border-b pb-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-baseline">
                                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {prod.name}
                                    </span>
                                    {prod.price && (
                                        <span className={`font-bold text-xl ${theme === 'dark' ? 'text-amber-400' : 'text-red-600'}`}>
                                            ${prod.price}
                                        </span>
                                    )}
                                </div>
                                {prod.description && (
                                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {prod.description}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </AutoScroller>
            </div>
        </div>
    );
};

// ... (Il resto del file: getCategoriesData e MenuList rimangono INVARIATI) ...
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
        <div className="h-screen bg-cream p-4">
            <div className="grid grid-cols-3 grid-rows-5 gap-4 h-full">
                {/* 1. BEER */}
                <div className="col-span-2 row-span-3 bg-white rounded-lg shadow-md p-6 overflow-hidden">
                    <CategoryContent data={catMap['Beer']} theme="light" titleOptions={{ displayType: 'vertical' }} />
                </div>
                {/* 2. LIQUORS */}
                <div className="bg-gray-800 row-span-2 rounded-lg shadow-md p-4 overflow-hidden">
                    <CategoryContent data={catMap['Liquor']} theme="dark" titleOptions={{ displayType: 'horizontal', textAlign: 'center' }} />
                </div>

                {/* 4. SNACKS */}
                <div className="bg-white row-span-3 rounded-lg shadow-md p-4 overflow-hidden">
                    <CategoryContent data={catMap['Snack']} theme="light" titleOptions={{ displayType: 'horizontal', textAlign: 'center' }} />
                </div>
                {/* 5. COCKTAILS */}
                <div className="bg-gray-600 col-span-2 row-span-2 rounded-lg shadow-md p-4 overflow-hidden">
                    <CategoryContent data={catMap['Cocktail']} theme="dark" titleOptions={{ displayType: 'horizontal', textAlign: 'left' }} />
                </div>
            </div>
        </div>
    );
}