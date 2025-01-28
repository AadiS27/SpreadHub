import Editor from "./editor";
import Navbar from "./navbar";
import {Toolbar }from "./toolbar";


interface SheetIdPageProps {
    params:Promise<{sheetId:string}>
}

const SheetIdPage = async ({params}:SheetIdPageProps) => {
    const awaitedParams=await params;
    const sheetId=awaitedParams.sheetId;
    
    return (  
        <div className=" bg-[#FAFBFD]">
            <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
            <Navbar />
            <Toolbar/>
            </div>
            <div className="pt-[110px] print:pt-0 h-full">
            <Editor/>
            </div>
        </div>
    );
}
 
export default SheetIdPage;