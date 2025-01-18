import { Editor } from "./editor";
import { Navbar } from "./navbar";

import { Toolbar } from "./toolbar";

interface DocumentIdProps {
    params:Promise<{documentId:string}>//newer next uses promise to resolve the params object
}

const DocumentId =  async ({params}:DocumentIdProps) => {
    const awaitedparams = await params;
    const documentId= awaitedparams.documentId;

    return (
        <div className="m-h-screen bg-[#FAFBFD]">
            <Navbar/>
            <Toolbar />
            <Editor/>
        </div>
      );
}
 
export default DocumentId;