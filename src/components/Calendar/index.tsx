"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Le funzioni helper rimangono invariate
function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

// 1. Definiamo i tipi per le nuove props
interface CalendarProps {
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

// 2. Usiamo le props nella firma del componente
export function Calendar28({ selectedDate, onDateChange }: CalendarProps) {
  const [open, setOpen] = React.useState(false)
  
  // --- MODIFICHE PRINCIPALI ---
  // RIMOSSO: lo stato della data non è più gestito qui
  // const [date, setDate] = React.useState<Date | undefined>(...)

  // Lo stato per il mese e il valore dell'input ora dipendono dalle props
  const [month, setMonth] = React.useState<Date | undefined>(selectedDate)
  const [value, setValue] = React.useState(formatDate(selectedDate))

  // Sincronizza il valore dell'input se la prop `selectedDate` cambia dall'esterno
  React.useEffect(() => {
    setValue(formatDate(selectedDate))
  }, [selectedDate])

  return (
    <div className="flex flex-col gap-3 w-fit">
      <Label htmlFor="date" className="px-1 text-white text-2xl">
        Visit Date:
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const dateInput = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(dateInput)) {
              // 3. Chiama la funzione del padre invece di setDate
              onDateChange(dateInput)
              setMonth(dateInput)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            {/* ... il resto del PopoverTrigger non cambia ... */}
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              // 4. Usa la prop `selectedDate` invece dello stato locale
              selected={selectedDate}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                // 5. Chiama la funzione del padre per aggiornare lo stato
                onDateChange(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}