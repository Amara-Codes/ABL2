import { Metadata } from "next";
import { div } from "three/webgpu";

import Button from "@/components/Button";

export default function Contacts() {
    return (
        <div>
            <div className="h-screen mt-16 flex justify-center">

                <h1 className="font-fatboy text-8xl text-primary h-1/2 flex items-end">Contacts</h1>
            </div>
            <div className="flex w-full justify-between px-16 gap-8 mb-16">
                <div className="w-1/2 h-[500px] border-0 rounded-lg overflow-hidden">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.8937814439364!2d103.8549970747992!3d13.356880306314844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110173824530e15%3A0x58989ffc8660d3b!2sAmara%20Beer%20Lab!5e0!3m2!1sit!2skh!4v1758276000174!5m2!1sit!2skh"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="w-1/2 h-[500px] bg-slate-800 p-8 rounded-lg">
                    <h3 className="text-white text-4xl font-extrabold mb-8">Siem Reap's Taproom</h3>
                    <div className="text-white text-xl mb-2">
                        <span className="font-bold me-4">Phone: </span>

                        <a href="tel:+855977754816" className="underline">+855 977 754 816</a>
                    </div>
                    <div className="text-white text-xl mb-2">
                        <span className="font-bold me-4">Email: </span>
                        <a href="mailto:amarabeerlab@gmail.com" className="underline">amarabeerlab@gmail.com</a>
                    </div>
                    <p className="text-white text-xl">
                        <span className="font-bold me-4">Address: </span>
                        <span>629 Central Market Street, Kandal Village - Siem Reap</span>
                    </p>
                    <div>
                        <p className="text-white text-xl mb-2 mt-8">
                            <span className="font-bold me-4">Opening Hours: </span>
                            <span>Monday - Saturday: 8:00 AM - 11:00 PM</span>
                        </p>
                        <p className="text-white text-xl">  
                            <span className="font-bold me-4">Kitchen Hours: </span>
                            <span>Monday - Saturday: 8 AM - 10:15 PM</span>
                        </p>
                    </div>

                    <div className="text-white mt-8 text-center flex flex-col items-center">

                        <em>Discover the Menu of our Taproom, and much more...</em>
                        <Button
                            buttonLink="https://amara.pub/en/menu"
                            buttonText="Our Menu"
                            className="mt-4"
                            type="ext"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
