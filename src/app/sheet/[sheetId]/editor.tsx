import Grid from "@/app/basic/page";
import { Input } from "@/components/ui/input";

const Editor = () => {
    return ( 
        <div>
              <Input placeholder="Pool A" className=" bg-white rounded-md h-[30px] w-full overflow-auto  print:hidden"/>
           
           <Grid />
           </div>
     );
}
 
export default Editor;