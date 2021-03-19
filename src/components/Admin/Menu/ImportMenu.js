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
            // console.log(arrayOfFile)
            let inputFileName = e.target.files['0'].name;
            console.log(inputFileName)
            var lines=arrayOfFile.split("\n");
            console.log(lines)

            var result = [];
          
            var headers=lines[0].split(",");
          
            for(var i=1;i<lines.length;i++){
          
                var obj = {};
                var lengthOfLine = lines[i].length;
                if(lengthOfLine > 0){
                var currentline=lines[i].split(",");
                console.log(currentline)
          
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }
          
                result.push(obj);}
            }
            
            //return result; //JavaScript object
            // console.log(result);
            console.log(result['0']) //JSON
            // console.log(JSON.stringify(result))

            uploadFile(result)



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
