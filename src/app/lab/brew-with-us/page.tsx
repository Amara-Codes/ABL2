"use client"
import React from "react";
import { Metadata } from "next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar28 } from "@/components/Calendar";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"


export default function LabBrewWithUs() {
  const [visitDate, setVisitDate] = React.useState<Date | undefined>(
    new Date()
  );

  const [email, setEmail] = React.useState<string | "">("");
  const [phone, setPhone] = React.useState<string | "">("");
  const [preferredOption, setpreferredOption] = React.useState<string | "telephone">("telephone");
  return (
    <div className="min-h-screen mt-24 lg:mt-16">
      <div className="h-screen mt-16 flex flex-col justify-center items-center">

        <h1 className="font-fatboy text-8xl text-primary h-1/2 flex items-end">Book a visit</h1>
        <p className="text-2xl text-white">Come and visit our brewhouse, it's free. you can also join our worhshops, where you can learn how we brew our beer amd nuch more</p>
      </div>
      <div className="flex px-16">
        <div className="w-1/2">
          <h3 className="text-primary font-medium text-4xl">Our next Workshops will be:</h3>
          <ul className="list-disc text-white ps-4">
            <li>
              <p className="text-white text-lg">today</p>
            </li>
            <li>
              <p className="text-white text-lg">tomorrow</p>
            </li>
            <li>
              <p className="text-white text-lg">never</p>
            </li>
          </ul>
        </div>
        <div className="w-1/2 flex flex-col gap-y-4">
          <div className="flex flex-col gap-3">

            <Label className="text-white text-2xl" htmlFor="email">Email: </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">

            <Label className="text-white text-2xl" htmlFor="phone">Phone: </Label>
            <Input
              id="phone"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div className="flex gap-8 mt-2 items-center justify-between mb-8">

            <Calendar28
              selectedDate={visitDate}
              onDateChange={setVisitDate}
            />


            <div className="flex flex-col gap-3 w-fit">
              <Label className="text-white text-2xl" htmlFor="preferredOption">Preferred Contact: </Label>
              <RadioGroup className="h-full" id="preferredOption" defaultValue={preferredOption} value={preferredOption} onValueChange={setpreferredOption}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem className="text-orange-500 border-orange-500 [&_svg]:fill-amber-500" value="telephone" id="r1">

                  </RadioGroupItem>
                  <Label className="text-white text-xl" htmlFor="r1">Phone</Label>

                  <RadioGroupItem className="text-orange-500 border-orange-500 [&_svg]:fill-amber-500" value="email" id="r2">

                  </RadioGroupItem>
                  <Label className="text-white text-xl" htmlFor="r2">Email</Label>
                </div>

              </RadioGroup>
            </div>
          </div>

          <Button size="lg"  >Book now</Button>

          <em className="text-white text-center">If not during the workshops, the visit is free!!1</em>
        </div>
      </div>

    </div>
  );
}
