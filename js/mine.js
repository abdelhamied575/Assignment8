var siteName=document.getElementById("siteName");
var urlSite=document.getElementById("url");
var dataOfInputs;
var dataContainer=[];



if(localStorage.getItem("Sites")!=null){
    dataContainer=JSON.parse(localStorage.getItem("Sites"));
    displayData(dataContainer);
}

function isValidURL(url)
{
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}

function setData() {
    const enteredURL = urlSite.value.trim();
    const hasProtocol = enteredURL.startsWith("http://") || enteredURL.startsWith("https://");

    if (!isValidURL(enteredURL)) {
        alert("Please enter a valid URL");
        return;
    }

    dataOfInputs = {
        name: siteName.value,
        url: hasProtocol ? enteredURL : "http://" + enteredURL
    }

    dataContainer.push(dataOfInputs);
    localStorage.setItem("Sites", JSON.stringify(dataContainer));
    displayData(dataContainer);
    clearData();
}






function displayData(arr){
    var cartoona='';

    

    for(var i=0;i<arr.length;i++){
        cartoona+=`
        <tr>
        <td>${i+1}</td>
        <td>${arr[i].name}</td>
        <td><button class="btn btn-success" onclick="openLink(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
    }
    console.log(arr)
    document.getElementById("tableBody").innerHTML=cartoona;
}

function openLink(index) {
    window.open(decodeURIComponent(dataContainer[index].url), '_blank');
}



function clearData(){
    siteName.value="";
    urlSite.value="";
}

function deleteSite(index){
    dataContainer.splice(index,1);
    localStorage.setItem("Sites",JSON.stringify(dataContainer));
    displayData(dataContainer);
}
