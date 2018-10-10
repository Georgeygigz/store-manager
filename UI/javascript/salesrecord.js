function display() {
var sales_record = [{"CUSTOMER_NAME": "Maria Kim", "ITEM_NAME": "Bread","QUANTITY":"3","TOTAL_PRICE":"150","DATE_SOLD":"12/3/2012" }, {"CUSTOMER_NAME": "Georgey Gigz", "ITEM_NAME": "Melon","QUANTITY":"5","TOTAL_PRICE":"400","DATE_SOLD":"12/4/2018" },{"CUSTOMER_NAME": "James Kim", "ITEM_NAME": "Oranges","QUANTITY":"5","TOTAL_PRICE":"200","DATE_SOLD":"12/3/2015" },{"CUSTOMER_NAME": "James Kim", "ITEM_NAME": "Oranges","QUANTITY":"5","TOTAL_PRICE":"200","DATE_SOLD":"12/3/2015" },{"CUSTOMER_NAME": "Maria Kim", "ITEM_NAME": "Bread","QUANTITY":"3","TOTAL_PRICE":"150","DATE_SOLD":"12/3/2012" }, {"CUSTOMER_NAME": "Georgey Gigz", "ITEM_NAME": "Melon","QUANTITY":"5","TOTAL_PRICE":"400","DATE_SOLD":"12/4/2018" }];    
    var records_length = sales_record.length;
    var html_text = "";

    for (var i = 0; i < records_length; i++) {
        console.log(sales_record[i]);
        html_text += "<tr id='table"+i+"'><td>"
        +sales_record[i].CUSTOMER_NAME+
        "</td><td>"
        +sales_record[i].ITEM_NAME+
        "</td><td>"
        +sales_record[i].QUANTITY+
        "</td><td>"
        +sales_record[i].TOTAL_PRICE+
        "</td><td>"
        +sales_record[i].DATE_SOLD;
    }
    document.getElementById("tbody").innerHTML = html_text;
   
}
document.write(display());

function accept(){
alert('Accept order')
}
function decline(){
alert('decline order')
}
function complete(){
    alert('order marked as complete order')
    }
