interface SheetLayoutProps {
    children:React.ReactNode
}

const SheetLayout=({children}:SheetLayoutProps)=>{
    return(
        <div className="flex flex-col justify-normal">
            
            {children}
        </div>
    )
}

export default SheetLayout;