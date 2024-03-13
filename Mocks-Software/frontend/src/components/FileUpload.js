// import {useState} from 'react';

// import {storage} from 'firebase';
// import {ref, uploadBytes} from 'firebase/storage';
// import {v4} from 'uuid';

// function FileUpload() {
//     const [file,setFile] = useState(null)

//     // const uploadFileMutation = useMutation({
//     //     mutationFn: uploadFiles,
//     //     onSuccess:(data)=>{
//     //         console.log(data)
//     //     },
//     //     onError:(message)=>{
//     //         console.log(message)
//     //     }
//     // })
    
//     const handleChange =(e)=>{
//         setFile(e.target.files[0])
//     }

//     const handleSubmit = (e)=>{
//         e.preventDefault();

//         if(!file)
//             return;
//         const fileRef = ref(storage,`INT/${file.name + v4()}`);
//         uploadBytes(fileRef,file).then(()=>{
//             alert("file uploaded")
//         })
        
       
//     }
//     return (
//         <>
//             <form>
//                 <input type="file" accept ="application/pdf"
//                 onChange={handleChange} name='file' />

//                 <button type='submit'  onClick={handleSubmit}>submit</button>
                
//             </form>
            
//         </>
//     )
// }

// export default FileUpload