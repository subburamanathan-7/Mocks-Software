
function Modal({isVisible, onClose, children}) {
    if(!isVisible)
        return null

    const handleClose = (e)=>{
        if(e.target.id ==='wrapper'|| e.target.id==='close' || e.target.id==='submit' || e.target.id==='cancel')
            onClose()
    }
    return (
        <div className="overflow-scroll fixed inset-5 backdrop-blur-sm flex justify-center items-center z-[100] rounded-xl"
        id="wrapper"
        onClick={handleClose}>
            <div className=" bg-white  w-[90%] h-screen flex flex-col rounded-lg">
                <i onClick={()=>onClose()} id="close" className="cursor-pointer fa-solid fa-xmark text-2xl place-self-end pr-4 pt-6 "></i>
                <div className='rounded'>{children}</div>
            </div>
        </div>
    )
}

export default Modal