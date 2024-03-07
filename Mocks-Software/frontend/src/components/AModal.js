function AModal({isVisible, onClose, children}) {
    if(!isVisible)
    return null

    const handleClose=(e)=>{
        if(e.target.id ==='wrapper' || e.target.id==='submit' || e.target.id==='close' || e.target.id==='cancel' )
            onClose()
    }
    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center z-[100]'
        id = 'wrapper'
        onClick={handleClose}>
            <div className=' bg-white bg-opacity-90 w-[600px] flex flex-col rounded-lg '>
                <i onClick={()=>onClose()} id ="close" className="cursor-pointer fa-solid fa-xmark text-2xl place-self-end pr-2 " ></i>
                <div className='p-[2%] rounded'>{children}</div>

            </div>
        </div>
    
    )
}

export default AModal