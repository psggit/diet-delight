import react from 'react';
import axios from '../../../axiosInstance';
import './importMenu.css'



export default function ImportMenu() {


    const selectedFileProcessing = (e) => {
        e.preventDefault();
        console.log(e.target.files['0'])
        const reader = new FileReader();
        reader.onload = function(){
            let arrayOfFile = reader.result;
            console.log(arrayOfFile)

        }.bind(this)
        reader.readAsText(e.target.files['0'])
        console.log(reader)
        console.log(reader.result)
    }



    return(
        <>
        <form encType="application/x-www-form-urlencoded
multipart/form-data
text/plain">
        <button type="button" className="file_container" value="Upload File" name="Upload File"><span id="button_text">Upload File</span>
            <input type="file" name="csvFile" id="csvFile" accept=".csv" onChange={selectedFileProcessing}/>
        </button>
        </form>
        </>
    )

}
