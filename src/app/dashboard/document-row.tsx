import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import {SiGooglesheets} from 'react-icons/si';
import { Building2Icon, CircleUserIcon } from "lucide-react";
import {format} from 'date-fns';
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";
interface DocumentRowProps {
document:Doc<"documents">;
}

export const DocumentRow=({document}:DocumentRowProps)=>{
   const onNewTabClick=(id:string)=>{
    window.open(`/documents/${id}`,'_blank');
}
const router=useRouter();

const onRowClick=(id:string)=>{
    router.push(`/documents/${id}`);
}
   
    return(
        <TableRow
        onClick={()=>onRowClick(document._id)}
        className="cursor-pointer">
            <TableCell className="w-[50px]">
                <SiGooglesheets className="size-6 fill-orange-300"/>
            </TableCell>
            <TableCell className="font-medium text-[#f2f2f2] md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-[#f2f2f2] hidden md:flex items-center gap-2">
                {document.organizationId?<Building2Icon className="size-4"/>:<CircleUserIcon className="size-4 "/>}
                {document.organizationId?"Shared":"Private"}

            </TableCell>
            <TableCell className="text-[#f2f2f2] md:table-cell">
            {format(new Date(document._creationTime),"MMM dd, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu
                documentId={document._id}
                title={document.title}
                onNewTab={onNewTabClick}/>
            </TableCell>
        </TableRow>
    )
}
