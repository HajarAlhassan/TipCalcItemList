items=[{itemName:"Humos",price:4.99},{itemName:"Hummos",price:4.99},{itemName:"Tabouleh",price:5.99},{itemName:"Falafel-Platter",price:8.99},{itemName:"Falfel-Sandwish",price:6.99},{itemName:"Chicke-Kabob",price:14.99},{itemName:"Beef-Kabob",price:15.99},{itemName:"Lamb-Kabob",price:17.99}]
coupons=[{src:"https://go.harborfreight.com/wp-content/uploads/2019/08/57042673_20off_terrell_tx.jpg",disc:"0.2"},
{src:"https://i.etsystatic.com/13996512/c/1785/1419/83/0/il/3df93d/2093300057/il_340x270.2093300057_kzah.jpg",disc:"0.1"},
{src:"https://www.dontpayfull.com/at/mhprofessional.com/gallery/15-off-mhprofessional.com_discount_deal_1.jpg",disc:"0.15"}
]
document.addEventListener("load",loadList());
/////////*************Load menu*************///////
function loadList(){
    var item;
    item=items.reduce((text,value)=> text+=`<option value=${value.itemName}>`)
    document.getElementById("itemList").innerHTML=item;
    item=items.reduce((text,value)=> text+=`<option value=${value.price}>`);
    document.getElementById("priceList").innerHTML=item;  

}

function uploadImg(selc){

  var selected=selc.value;
  if(selected==="none")
  document.getElementById("couponImg").src="https://i2.wp.com/printmediacentr.com/wp-content/uploads/2017/12/printable-coupons.jpg?resize=700%2C412&ssl=1"
    coupon=coupons.find(value=> value.disc==selected)
  document.getElementById("couponImg").src=coupon.src
}


//////*************Create a table **********/////
var myTable = document.createElement("TABLE");
myTable.setAttribute("id", "myTable");
document.getElementById("list").appendChild(myTable);





//////*************Push Items **********/////
function pushItem() {
var itemInput = document.getElementById('item').value;
var priceInput = document.getElementById('price').value;
var countInput=document.getElementById('count').value
    if(itemInput!=="" && priceInput!=="" && Number(priceInput))
{ 
    var newRow = document.createElement("TR");
    document.getElementById("myTable").appendChild(newRow);
    var itemCol = document.createElement("TD");
    itemCol.innerHTML="<i class='fa fa-trash-o fa-lg'></i>"+itemInput;
    newRow.appendChild(itemCol);
    var countCol = document.createElement("TD");
    countCol.innerHTML=countInput;
    countCol.style.textAlign="right",
    newRow.appendChild(countCol);
    var priceCol = document.createElement("TD");
    priceCol.innerHTML=priceInput+" $";
    priceCol.style.textAlign="right";
    newRow.appendChild(priceCol);
    
  
}
else
   alert("Enter A valid To-Do List Item")
   document.getElementById('item').value="";
   document.getElementById('price').value="";

} 

//////*************Generate an invoice **********/////
function generate(){
    document.getElementById("resturantName").innerHTML=document.getElementById("resturant").value;
    document.getElementById("date").innerHTML=getTodayDate();
    document.getElementById("time").innerHTML=getNowTime();
    document.getElementById("amountSum").innerHTML=getSum().toFixed(2)+" $";
    document.getElementById("tip").innerHTML=calcTip().toFixed(2)+" $";
    document.getElementById("cop").innerHTML="";
    document.getElementById("total").innerHTML=calcBill().toFixed(2)+" $";

}

////******************Date and time Format*******************/////
function getTodayDate(){
    var d = new Date();
    var todayDate = (d.getMonth()+1) + "-"+ d.getDate()  + "-"  + d.getFullYear();
   return todayDate;
}

function getNowTime(){
    var d = new Date();
    var time = d.getHours() + ":" + d.getMinutes();
   return time;
}

////******************get the sum of the invoice items*******************/////
function getSum(){
    var bilAmount=0;
    var count=1;
    var rows=document.getElementById("myTable").children;
    for(let i=0;i<rows.length;i++){
         count=rows[i].children[1].innerHTML;
        
         bilAmount+=Number(rows[i].children[2].innerHTML.slice(0,rows[i].children[2].innerHTML.length-1))*count;
         
    }
    return bilAmount;
  
}

////******************Calculate the tip depend on the guest number*******************/////
//fixed tip when guests ar more than 10
function tip(){
    var guest=document.getElementById("guest").value;
    if(Number(guest)>=10)
       document.getElementById("tipPre").value=document.getElementById("tipPre").children[3].value;
       
}
//////////////////////////////////////
function calcTip(){
    var tip=0;
    if(document.getElementById("tipPre").value=="none")
       
           if( document.getElementById("tipAmount").value!=="")
            tip=Number(document.getElementById("tipAmount").value);
            // else
            //   alert("Enter Tip amount or choose Tip Percentage!!")
            //  }
           
    else
    {
    var guest=document.getElementById("guest").value;
 
    if(Number(guest)>=10)
    {  
        document.getElementById("tipPre").value=document.getElementById("tipPre").children[2].value;
        tip=0.2*getSum();;

    }
    else 
        {tip=Number(document.getElementById("tipPre").value.substr(0,3))/100;
        tip=tip*getSum();}
     

    }
    
   if(tip===0)
        tip=0.10*getSum();
    return tip;
}

////******************Calculate Total bill amount*******************/////
function calcBill(){
    
   return Number(calcTip())+Number(getSum());
    
}

////******************Reset button*******************/////
 function resetForm(){
 
    document.getElementById("resturantName").innerText="Resturant Name";
    document.getElementById("guest").value="";
    document.getElementById("item").value="";
    document.getElementById("price").value="";
    document.getElementById("tipAmount").innerHTML="";
    document.getElementById("amountSum").innerHTML="";
    document.getElementById("tipPre").value="none";
    document.getElementById("amountSum").innerHTML="";
    document.getElementById("tip").innerHTML="";
    document.getElementById("total").innerHTML="";
    document.getElementById("date").innerHTML="";
    document.getElementById("time").innerHTML="";
    document.getElementById("couponList").value="none";
    document.getElementById("cop").innerHTML="";
    document.getElementById("couponImg").src="https://i2.wp.com/printmediacentr.com/wp-content/uploads/2017/12/printable-coupons.jpg?resize=700%2C412&ssl=1"
    
    
    myTable.innerHTML=""
   
 }

////******************remove item*******************/////
document.getElementById("myTable").addEventListener('click', function (e) {
    var clickeTarget = e.target;
    
    if (clickeTarget && clickeTarget.nodeName === "I")
    {   
        clickeTarget.parentElement.parentElement.className="remove";
         alert("You are about to delete this item");
         setTimeout(() => {
            clickeTarget.parentElement.parentElement.remove();
           
          }, 1000); 
        
         
    }
    
    alert(clickeTarget.parentElement.parentElement.parentElement.rows.length==1)//check if there is non more item to reset the invoice
      resetForm();
  
})


////******************Attach coupon*******************/////
function attachCoupn(){
   let total= calcBill();
   if(total>0)
   {let coupon=document.getElementById("couponList").value;
   if(coupon==="none")
        { total=total}
    else
 { total-=coupon*total;
  document.getElementById("cop").style.color="red"
  document.getElementById("cop").innerHTML="-"+(document.getElementById("couponList").value*total).toFixed(2)+" $";
  document.getElementById("total").innerHTML=total.toFixed(2)+" $";}
   }
 
}