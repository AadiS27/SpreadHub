'use client'

import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./Document-Input";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { Clipboard, FileIcon, FilePenIcon, FilePlus, Printer, Redo2Icon, Scissors, TrashIcon, Undo2Icon } from "lucide-react";
const Navbar = () => {
    
    return ( 
        <nav className="flex items-center justify-between">
         <div className="flex gap-2 items-center">
                <Link href="/dashboard">
            <Image src="/logo.svg" alt="Logo" width={36} height={36} />
            </Link>
            <div className="flex flex-col">
                    <DocumentInput/>
              <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0"> 
                    <MenubarMenu>
                        <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                            File
                        </MenubarTrigger>
                        <MenubarContent className="print:hidden">
                            <MenubarSub>
                                <MenubarSubTrigger>
                                <FileIcon className="size-4 mr-2"/>
                                Save
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                
                                    
      
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarItem>
                                <FilePlus className="size-4 mr-2"/>
                                New Document
                            </MenubarItem>
                            <MenubarSeparator/>
                            <MenubarItem>
                                <FilePenIcon className="size-4 mr-2"/>
                                Rename
                            </MenubarItem>
                            <MenubarItem>
                                <TrashIcon className="size-4 mr-2"/>
                                Remove
                            </MenubarItem>
                            <MenubarSeparator/>
                            <MenubarItem onClick={()=>window.print()}>
                                <Printer className="size-4 mr-2"/>
                                Print<MenubarShortcut>Ctrl+P</MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                            Edit
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={()=>console.log("Undo")}>
                                <Undo2Icon className="size-4 mr-2"/>
                                Undo
                                <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={()=>console.log("Redo")}>
                                <Redo2Icon className="size-4 mr-2"/>
                                Redo
                                <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                            </MenubarItem>
                            <MenubarSeparator/>
                            
                            <MenubarItem>
                                <Clipboard className="size-4 mr-2"/>
                                Copy
                            </MenubarItem>
                               
                            <MenubarItem>
                                <Scissors className="size-4 mr-2"/>
                                Cut
                            </MenubarItem>
                            <MenubarItem>
                            <TrashIcon className="size-4 mr-2"/>
                                Delete
                            </MenubarItem>
                            
                        </MenubarContent>
                    </MenubarMenu>
                   <MenubarMenu>
                   <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                          View
                        </MenubarTrigger>
                   </MenubarMenu>
                   <MenubarMenu>
                   <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                         Insert
                        </MenubarTrigger>
                   </MenubarMenu>
                   <MenubarMenu>
                   <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                         Format
                        </MenubarTrigger>
                   </MenubarMenu>

                     </Menubar>

              </div>
            </div>
            </div>
        </nav>
     );
}
 
export default Navbar;