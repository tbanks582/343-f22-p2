// App-Id:745a521a
// App-Key:706c4c10d0dcb1d4f40d3cd705da4cbd
// sus

const stockJSON = {
    "sex": "male",
    "age": {
      "value": 30
    },
    "evidence": [
      {
        "id": "s_1193",
        "choice_id": "present",
        "source": "initial"
      },
      {
        "id": "s_488",
        "choice_id": "present"
      },
      {
        "id": "s_418",
        "choice_id": "present"
      }
    ]
  }

  const stockSymptoms = {

  }

function handleEvent(event) {
    console.log(event);
}


function getDefault(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);
    }


    var url = "https://api.infermedica.com/v3/diagnosis";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("App-Id" , "745a521a");
    xhr.setRequestHeader("App-Key" , "706c4c10d0dcb1d4f40d3cd705da4cbd");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            
        }
    }
    var data = JSON.stringify(stockJSON);
    xhr.send(data);
    // Now use it! 

}


function getSearch(evidence) {
    if(event.keyCode == 13) {
        let evidence = [
            document.getElementById('query1').value,
            document.getElementById('query2').value,
            document.getElementById('query3').value,
        ]
        let symptoms = "i feel " + evidence[0] + ", as well as " + evidence[1] + ", and probably " +evidence[2];
        console.log(symptoms);
        let text = {"text": symptoms, "age": {"value": 30}};
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            var jsonResponse = JSON.parse(xhr.responseText);
            let sympResponse = jsonResponse.mentions.map( symptom => parseInt(symptom.id.substring(2),10)%255);
            console.log(jsonResponse);
            console.log("symp numbers = " + sympResponse);
            colorSearch(sympResponse);
            
        }

        var url = "https://api.infermedica.com/v3/parse";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("App-Id" , "745a521a");
        xhr.setRequestHeader("App-Key" , "706c4c10d0dcb1d4f40d3cd705da4cbd");
        xhr.send(JSON.stringify(text));
        //console.log(text);
    }
}
    
function getInfermedica() {
    let request = new Request('https://api.infermedica.com/v3/diagnosis',
         { method: 'POST', 
           headers: new Headers({ 'Content-Type': 'application/json', 'App-Id':'745a521a', 'App-Key':'706c4c10d0dcb1d4f40d3cd705da4cbd'}) 
         });
    // Now use it! 

   fetch(request) 
   .then(resp => resp.json())
   .then (data => console.log(data))
   .catch(err => { 
         // handle errors 
         console.log("get request failed!");
    });
}

function colorSearch(arr){
    console.log(arr);
    var url = "http://colormind.io/api/";
    var data = {
	    model : "default",
	    input : [[arr[0],arr[1],arr[2]],"N","N","N"]
    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        console.log(data);
        let jason = JSON.parse(xhr.responseText);
        console.log(jason);
        colorPrinter(jason);
    }
    xhr.open("POST", url, true);
    xhr.send(JSON.stringify(data));
}
function colorPrinter(palette){
    let block = document.getElementById("colors");

    console.log('from colorPrinter');
    console.log(palette);
    

    for(i=0;i<5;i++){
        
        let element = palette.result[i];
        document.getElementById("color"+ (i+1)).style.background = ("rgb(" + element[0] + "," + element[1] + "," + element[2] + ")");
    }
    document.getElementById("mood").innerHTML="<p>here are your mood colors!</p>";
    return colors;
}

