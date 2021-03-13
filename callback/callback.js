//Create an array of members objects
var team=[
    {fname:"Hajar",lname:" Alhassan"},
    {fname:"Kaleb",lname:" Hill"},
    {fname:"Deepshikha",lname:" Sharm"},
    {fname:"Sophie",lname:" Cam"},
    {fname:"Marquis",lname:"Blocker"},
     {fname:"Brice",lname:"Lewis"},
     ];


     var table=document.getElementsByTagName("table")[0];

// a function to display the members/ this is a callback function
  function display(text){
      //create a table row with cell
     let   tableRow=document.createElement("tr");
     let   cell=document.createElement("td");
     cell.setAttribute("class","cell")
    tableRow.appendChild(cell);
    table.appendChild(tableRow);
    cell.innerHTML= "★·.·´¯`·.·★"+ text;
 }

 //a function to go through the array and display the members
 //this function call the callback function ''display'
 //getTeamMembers function and the setTimeOut function are  Asynchronous
  function getTeamMembers(index,callback){
 
    if(index==0){
           // //create a table header row
        let  tableRow=document.createElement("tr");
           tableRow.setAttribute("class","header")
        let  cell=document.createElement("td");
            tableRow.appendChild(cell);
            table.appendChild(tableRow)
           cell.innerText="Our Awsome Team members:"
       }
          //set the timer to 1sec befote the display of the first member 
        setTimeout(()=>{
         if( index<team.length){
             let output= `<h3>${team[index].fname} ${team[index].lname}</h3><br>`;
             callback(output);
             //set the timer to 1sec between each didplay
            setTimeout(()=>getTeamMembers(index+1,callback),1000)}
          },1000 )
     }
  //calling the function with the index=0 to start from the first member of the aaray
  //calling the function with the display callbak function
 getTeamMembers(0,display);
