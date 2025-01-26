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
import { FileIcon, FilePenIcon, FilePlus, Printer, TrashIcon } from "lucide-react";
const Navbar = () => {
    
    return ( 
        <nav className="flex items-center justify-between">
         <div className="flex gap-2 items-center">
                <Link href="/">
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
                            
                        </MenubarContent>
                    </MenubarMenu>
                   
                    
                     </Menubar>

              </div>
            </div>
            </div>
        </nav>
     );
}
 
export default Navbar;