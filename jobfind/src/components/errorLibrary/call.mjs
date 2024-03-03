import { toast } from "react-toastify";
import { baoloi } from "./allError.mjs";

export function callError (msg) {
    toast.error(msg,{
        position: toast.POSITION.TOP_RIGHT
    }); 
}
export function callSuccess (msg) {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
}
export function fileLimit (selectedFile,limit) {
    if(selectedFile.size >= (1024**limit)){
        toast.error(baoloi.fileLimit+`${limit}mb`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }else if(selectedFile.type.indexOf('application/pdf')==-1){
        toast.error(baoloi.pdfLimit, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    else{
        return true;
    }
    return false;
}
// export default {filelimitError}