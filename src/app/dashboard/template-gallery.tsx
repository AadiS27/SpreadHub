'use client';

import{
    Carousel,
    CarouselItem,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { templates } from '@/constants/templates';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../../convex/_generated/api';
import { useState } from 'react';


export const TemplateGallery = () => {
    const [isCreating,setIsCreating]=useState(false);
    const router=useRouter();
    const create=useMutation(api.documents.create);

    const onTemplateClick=(title:string,initialContent:string)=>{
        setIsCreating(true);
        create({title,initialContent}).then((documentId)=>{
            router.push(`/documents/${documentId}`);
        }).finally(()=>{
            setIsCreating(false);
        });
    }

    return(
        <div className="bg-[#1f1f1f]">
           <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
            <h3 className=" font-medium text-orange-300">
                Start a New Sheet
            </h3>
            <Carousel>
                <CarouselContent className='-ml-4'>
                {templates.map((template)=>(
                    <CarouselItem key={template.id}
                    className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4'>
                   <div
                   className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating&&"pointer-events-none opacity-50")}>
                        <button
                        disabled={isCreating}
                        
                        onClick={() => {
                            if (template.label && template.initialContent) {
                                onTemplateClick(template.label, template.initialContent);
                            }
                        }}
                        style={{
                            backgroundImage:`url(${template.imageUrl})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center',
                            backgroundRepeat:'no-repeat'
                        }}
                        className='size-full hover:border-blue-500 rounded-sm hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white'/>
                       
                       
                        <p className='text-sm text-orange-300 font-medium truncate'>
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