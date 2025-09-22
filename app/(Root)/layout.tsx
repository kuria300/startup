import { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";


export default function Layout({children,} : Readonly<{children: ReactNode}>){
 return(
    <div className="font-work-sans">
        <Navbar />
        {children}
    </div>
 );
}