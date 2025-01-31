"use client"

import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { Card, CardHeader ,CardTitle,CardContent,CardFooter,CardDescription} from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const words = [
    {
      text: "Welcome ",
      className: "text-white dark:text-white",
    },
    {
      text: "to",
      className: "text-white dark:text-white",
    },
    {
      text: "Spread",
      className: "text-white dark:text-white",
    },
    {
      text: "Hub",
        className: "text-green-500 dark:text-green-500",
    },
    
  ];
  export const projects = [
    {
      title: "Aadi Singhal",
      description:
        "A technology company that builds economic infrastructure for the internet.",
     
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
     
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
     
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    
    },
    {
        title: "Microsoasdft",
        description:
          "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
       
      },
      {
        title: "Micasdrosoft",
        description:
          "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        
      },
      {
        title: "Microsoksdft",
        description:
          "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      
      },
  ];

const Home = () => {
    return ( 
        <>
        <div className=" bg-slate-800 overflow-hidden flex flex-col relative min-h-screen items-center justify-center">
           <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
 
            <div className=" p-5 flex flex-col items-center justify-center gap-y-6 min-h-screen z-50 w-full ">
               <TypewriterEffectSmooth words={words} className="z-50 " />
                <Button size="lg" className="bg-green-600 border-3 border-b-4 border-b-green-700 active:border-b-0 z-50 hover:bg-green-700">
            <Link href="/dashboard" >
                Dashboard
                
            </Link>
            </Button>
            <Boxes/>
           </div>
           </div>
            <footer className="flex pl-0  bg-slate-500 ">
                
                <div className="flex  relative border-t-5  border-t-black   p-2 w-full">
               <div className="absolute inset-0 w-full h-full border-t-5  border-t-black bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
               <LampContainer className="flex flex-col items-start pt-[200px] justify-start min-h-screen z-50">
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.8,
          ease: "easeInOut",
          
        }}
        className="mt-8 bg-gradient-to-br  from-white to-white py-4 bg-clip-text text-center  font-medium tracking-tight text-transparent md:text-7xl"
      >
       <div className=" flex pt-[300px]" >
        Contributor to  Project
           
            </div>
      </motion.h1>
      <div className="flex relative  gap-x-4" >
      <HoverEffect items={projects} />
            </div>
    </LampContainer>
            
            </div>
            </footer>
            
        
        
        </>
     )
}
 
export default Home;