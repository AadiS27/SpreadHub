'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, ArrowDown, BoldIcon, ItalicIcon, Link, Link2Icon, LucideIcon, MessageSquare, MessageSquarePlusIcon, Printer, Redo2Icon, Strikethrough, Underline, Undo2Icon } from "lucide-react";

interface ToolbarButtonProps{
  onClick?:()=>void;
  isActive?:boolean;
  icon:LucideIcon
 }








const ToolbarButton=({
  onClick,
  isActive,
  icon:Icon,
}:ToolbarButtonProps)=>{
  return(
      <button onClick={onClick}
      className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
          isActive && "bg-neutral-200/80"
      )}>
          <Icon className="size-4"/>
      </button>
  )
}

const ZoomButton=()=>{
  const zoom=[
      {label:"50%",value:0.5},
      {label:"75%",value:0.75},
      {label:"100%",value:1},
      {label:"125%",value:1.25},
      {label:"150%",value:1.5},
      {label:"200%",value:2},
  ];
  return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <button  className="h-7  min-w-7 rounded-full shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                  <span>100%</span>
                  
                 
              </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {zoom.map(({label,value})=>(
                  <button
                  onClick={()=>console.log("Zoom",value)}
                  key={value}
                  className={cn(
                      "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80"
                  )}
                  >
                      <span className="text-sm">{label}</span>
                  </button>
              ))}
          </DropdownMenuContent>
      </DropdownMenu>
  )
}
const AlignButton=()=>{

  const alignments=[
      {label:"Left",value:"left",icon:AlignLeftIcon},
      {label:"Center",value:"center",icon:AlignCenterIcon},
      {label:"Right",value:"right",icon:AlignRightIcon},
      {label:"Justify",value:"justify",icon:AlignJustifyIcon},
  ];
  return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <button title="Align" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
             <AlignLeftIcon className="size-4" />
              </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {alignments.map(({label,value,icon:Icon})=>(
                  <button
                  onClick={()=>console.log("Align",value)}
                  key={value}
                  className={cn(
                      "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                      // editor?.isActive({textAlign:value})&&"bg-neutral-200/80"
                  )}
                  >
                      <Icon className="size-4"/>
                      <span className="text-sm">{label}</span>
                  </button>
              ))}
          </DropdownMenuContent>
      </DropdownMenu>
  )
}



export const Toolbar = () => {
  const sections:{
    label:string;
    icon:LucideIcon;
    onClick:()=>void;
    isActive?:boolean;
}[][]=[
    [
        {
            label:"Undo",
            icon:Undo2Icon,
            onClick:()=>console.log("Undo"),
        },
        {
            label:"Redo",
            icon:Redo2Icon,
            onClick:()=>console.log("Redo"),
        },
        {
          label:"Print",
          icon:Printer,
          onClick:()=>window.print(),
      },
      ],[
        {
          label:"Link",
          icon:Link2Icon,
          onClick:()=>console.log("Link"),//  Todo add link
        },
        {
          label:"Comment",
          icon:MessageSquarePlusIcon,
          onClick:()=>console.log("Link"),//Todo add comment
        }
      ],[
        {
          label:"Bold",
          icon:BoldIcon,
          onClick:()=>console.log("Bold"),//Todo add bold
        },
        {
          label:"Italic",
          icon:ItalicIcon,
          onClick:()=>console.log("Italic"),//Todo add italic
        },
        {
          label:"Strike",
          icon:Strikethrough,
          onClick:()=>console.log("Strike"),//Todo add strike
        }
      ]]
    return (
        <div className="bg-[#f1f4f9] py-0.5 min-h-[0px] flex  gap-x-1 pl-3 overflow-x-auto rounded-full">
           {sections[0].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
            
        ))}
           <ZoomButton/>
    <Separator className="h-7" orientation="vertical" />
    {sections[2].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
            
        ))}
    <Separator className="h-7" orientation="vertical" />
    {sections[1].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
            
        ))}
        <AlignButton/>
        </div>
      );
}
 
