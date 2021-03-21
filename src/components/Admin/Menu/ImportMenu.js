import react from 'react';
import axios from '../../../axiosInstance';
import './importMenu.css'




export default function ImportMenu() {

    

    var csvjson = require('csvjson');
    







    const selectedFileProcessing = (e) => {
        e.preventDefault();
        console.log(e.target.files['0'])
        const reader = new FileReader();
        reader.onload = function(){
            let arrayOfFile = reader.result;
            // console.log(arrayOfFile)
            let inputFileName = e.target.files['0'].name;
            console.log(inputFileName)
          
            var data = arrayOfFile;

            var options = {
                delimiter : ',', // optional
                quote     : '"' // optional
              };



             var convertedForm = csvjson.toSchemaObject(data, options)

             console.log(convertedForm);
            uploadFile(convertedForm)




        }.bind(this)
        reader.readAsText(e.target.files['0'])
        console.log(reader)
        console.log(reader.result)
    }


    const uploadFile = (menuItems) => {
        console.log(menuItems)

        axios.post('bulk-menu-items',menuItems).then((res) => console.log(res)).catch((err) => console.log(err))

    }



    return(
        <>

        <button type="button" className="file_container" value="Upload File" name="Upload File"><span id="button_text">Upload File</span>
            <input type="file" name="csvFile" id="csvFile" accept=".csv" onChange={selectedFileProcessing}/>
        </button>
        </>
    )

}
