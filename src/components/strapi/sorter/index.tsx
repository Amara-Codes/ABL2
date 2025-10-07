"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SorterProps = {
  onSortChange: (value: "asc" | "desc") => void;
};

export function Sorter({ onSortChange }: SorterProps) {
  const options = [
    {
      value: "desc",
      label: "Newest first",
    },
    {
      value: "asc",
      label: "Oldest first",
    },
  ];

  return (
    <div className="w-[200px] mb-8">
      <Select onValueChange={(value) => onSortChange(value as "asc" | "desc")}>

        <SelectTrigger className="focus:ring-2 focus:ring-secondary">
          Select Sorting
        </SelectTrigger>
        <SelectContent className="bg-black text-white">
          {options.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="text-white transition-all duration-300"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}