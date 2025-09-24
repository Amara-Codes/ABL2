type Props = {
    textColor : string,
    barColor : string,
    progressAmount: number
};

export default function ProgressBar({ textColor, barColor, progressAmount }: Props) {
    return (
        <div>

            <div className="flex justify-between mb-1">
                <span className="text-base font-medium" style={{ color: `${textColor}` }}>Progress</span>
                <span className="text-base font-medium" style={{ color: `${textColor}` }}>{progressAmount}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ backgroundColor: `${barColor}`, width: `${progressAmount}%` }}></div>
            </div>
        </div>


    );
}
