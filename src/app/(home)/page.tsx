"use client"

import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { Card, CardHeader ,CardTitle,CardContent,CardFooter,CardDescription} from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Image from "next/image";

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
      title : "Aadi Singhal",
      description:
        "Frontend Developer and Product Manager",
        
     
    },
    {
      title: "Mohd Anas",
      description:
        "SpreadSheet Engine Developer and Backend Developer",
     
    },
    {
      title: "Shreetej Meshram",
      description:
        "SpreadSheet Engine Developer and Backend Developer",
      
    },
    {
      title: "Hamza Khan",
      description:
        "Testing And UI/UX Designer",
      
    },
    {
      title: "Piyush Jain",
      description:
        "SpreadSheet Engine Developer and Backend Developer",
     
    },
    {
      title: "Sanchit Mittal",
      description:
        "UI/UX Designer",
    
    },
    {
        title: "Anshul Gupta",
        description:
          "DevOps Engineer",
       
      },
      {
        title: "Nitin Kumar",
        description:
          "Authetication and Security",
        
      },
      {
        title: "Harshpreeet Singh Sodhi",
        description:
          "DevOps Engineer",
      
      },
  ];

const Home = () => {
    return ( 
        <>
        <div>
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
           </div>
           <div className=" bg-slate-800 overflow-hidden flex flex-col relative min-h-screen items-center justify-center"> 
           <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <div className="w-full flex flex-col gap-y-32">
              <div 
              className=" relative ml-[210px] z-50 flex   ">

              <motion.img
              initial={{ opacity: 0, x:-100 }}
              whileInView={{ opacity: 1, x: 0 }}
               transition={{
                delay: 0.3,
                duration: 1.8,
                ease: "easeInOut",
              }}
              alt="hero" src="/1.png" className="h-32 w-32" />
             
              <text className=" text-muted-foreground pl-28"><h1 className="text-2xl">Interactive UI</h1>
              Maa Chudwa Lo bahut achi se chudwa lo  <br/>
              mja aa jaega
              </text>
              
              </div>
              <div className="justify-end z-50 relative flex mr-[220px]">
              <Image alt="hero" src="/vercel.svg" width={50} height={50} />
              </div>
            </div>
           </div>
            <div className="flex pl-0  bg-slate-500 ">
                
                <div className="flex  relative border-t-5  border-t-black   p-2 w-full">
               <div className="absolute inset-0 w-full h-full border-t-5  border-t-black bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
               <LampContainer className="flex flex-col items-start pt-[200px] justify-start h-[1024px]  z-50">
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: -100 }}
        transition={{
          delay: 0.3,
          duration: 1.8,
          ease: "easeInOut",
          
        }}
        className="mt-8 bg-gradient-to-br  from-white to-white py-4 bg-clip-text text-center  font-medium tracking-tight text-transparent md:text-7xl"
      >
       <div className=" flex pt-[300px] " >
        Contributor to  Project
           
            </div>
      </motion.h1>
      <div className="flex relative  overflow-hidden" >
      <HoverEffect items={projects} />
            </div>
    </LampContainer>
            
            </div>
            </div>
            
        
        
        </>
     )
}
 
export default Home;