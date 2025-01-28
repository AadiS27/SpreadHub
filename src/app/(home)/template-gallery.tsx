'use client';
import{
    Carousel,
    CarouselItem,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { templates } from '@/constant/template';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
export const TemplateGallery = () => {
    const router=useRouter();
    const isCreating=false;

    const handleClick=()=>{
        router.push('/sheet/123')

    }
    return(
        <div className="bg-[#f1f3f4]">
           <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
            <h3 className=" font-medium">
                Start a new Spreadsheet
            </h3>
            <Carousel>
                <CarouselContent className='-ml-4'>
                {templates.map((template)=>(
                    <CarouselItem key={template.id}
                    className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4'>
                   <div
                   className={cn(
                    "aspect-[16/9] flex flex-col gap-y-4",
                    isCreating&&"pointer-events-none opacity-50")}>
                        <button
                        disabled={isCreating}
                        onClick={handleClick}
                        style={{
                            backgroundImage:`url(${template.imageUrl})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center',
                            backgroundRepeat:'no-repeat',
                            height:"200px"
                        }}
                        className='size-full hover:border-blue-500 rounded-sm hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 gap-x-6 bg-white'/>
                       
                       
                        <p className='text-sm font-medium truncate'>
                            {template.label}
                        </p>
                    </div>
                    </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
           </div>
        </div>
    )
}