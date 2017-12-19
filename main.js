(function() {
    // -------------------- show exist data ------------ //
    var ordersArray = [];
    var ordersDetailsArray = [];
    
    window.custCache = "";
    var custCache = window.custCache;
    window.orderCache = "";
    var orderCache = window.orderCache;
    window.orderDetailsCache = "";
    var orderDetailsCache = window.orderDetailsCache;

    
    const customersContainer = document.getElementById('customers');

    getCustomers().
    then(buildCustomers).
    then(getOrders).
    then(buildOrders).
    then(getOrderDetails).
    then(buildOrdersDetails);
    
    function buildCustomers(response) {
        const customers = JSON.parse(response);
        for(let i=0; i < customers.length; i++) {
            let customer = new Customer(customers[i].CustomerID,
                                    customers[i].CompanyName,
                                    customers[i].ContactName,
                                    customers[i].ContactTitle,
                                    customers[i].Address,
                                    customers[i].City,
                                    customers[i].Region,
                                    customers[i].PostalCode,
                                    customers[i].Country,
                                    customers[i].Phone,
                                    customers[i].Fax);
            const $customerLI = document.createElement('li');
            $customerLI.addEventListener('click', function() {
                customerSelected(customer.CustomerID)
            });
            $customerLI.innerHTML = customer.CustomerID + " ";
            $customerLI.innerHTML += customer.CompanyName + " ";
            $customerLI.innerHTML += customer.ContactName + " ";
            $customerLI.innerHTML += customer.ContactTitle + " ";
            $customerLI.innerHTML += customer.Address + " ";
            $customerLI.innerHTML += customer.City + " ";
            $customerLI.innerHTML += customer.Region + " ";
            $customerLI.innerHTML += customer.PostalCode + " ";
            $customerLI.innerHTML += customer.Country + " ";
            $customerLI.innerHTML += customer.Phone + " ";
            $customerLI.innerHTML += customer.Fax;
            document.getElementById('customers').appendChild($customerLI);
        }
        
    }
    
    function customerSelected(customerID) {
        // alert(customerID);
        document.getElementById('orders').innerHTML = "";
        var ordersForCustomer = searchOrders(customerID);
        for(let i=0; i < ordersForCustomer.length; i++) {
            //document.getElementById('orders').appendChild($orderButton);
            
            const $orderDiv = document.createElement('div');
            const $orderDetailsButton = document.createElement('button');

            $orderDetailsButton.addEventListener('click', function() {
                orderDetails(ordersForCustomer[i].OrderID)
            });
            var $buttonText = document.createTextNode('show order details'); 
            $orderDetailsButton.appendChild($buttonText); 
            $orderDetailsButton.className = "btn btn-info"; 
            $orderDiv.appendChild($orderDetailsButton);
            let orderContent = ordersForCustomer[i].OrderID + " ";
            orderContent += ordersForCustomer[i].CustomerID + " ";
            orderContent += ordersForCustomer[i].EmployeeID + " ";
            orderContent += ordersForCustomer[i].OrderDate + " ";
            orderContent += ordersForCustomer[i].RequiredDate + " ";
            orderContent += ordersForCustomer[i].ShippedDate + " ";
            orderContent += ordersForCustomer[i].ShipVia + " ";
            orderContent += ordersForCustomer[i].Freight + " ";
            orderContent += ordersForCustomer[i].ShipName + " ";
            orderContent += ordersForCustomer[i].ShipAddress + " ";
            orderContent += ordersForCustomer[i].ShipCity + " ";
            orderContent += ordersForCustomer[i].ShipRegion + " ";
            orderContent += ordersForCustomer[i].ShipPostalCode + " ";
            orderContent += ordersForCustomer[i].ShipCountry;
            $orderDiv.appendChild(document.createTextNode(orderContent));
            document.getElementById('orders').appendChild($orderDiv);
        }
    }

    function orderDetails(orderID) {
        //alert('orderDetails(orderID): ' + orderID);
        var orderDetails = ordersDetailsArray.filter(function (orderDetails) {
            return orderDetails.OrderID === orderID;
          });

          alert("orderDetails: " + JSON.stringify(orderDetails));
    }

    function searchOrders(customerID){
        var ordersForCustomer = ordersArray.filter(function (order) {
            return order.CustomerID === customerID;
          });
        return ordersForCustomer;
    }


    function buildOrders(data) {
        const orders = JSON.parse(data);
        for(let i=0; i < orders.length; i++) {
            let order = new Order(orders[i].OrderID,
                orders[i].CustomerID,
                orders[i].EmployeeID,
                orders[i].OrderDate,
                orders[i].RequiredDate,
                orders[i].ShippedDate,
                orders[i].ShipVia,
                orders[i].Freight,
                orders[i].ShipName,
                orders[i].ShipAddress,
                orders[i].ShipCity,
                orders[i].ShipRegion,
                orders[i].ShipPostalCode,
                orders[i].ShipCountry);
                ordersArray.push(order);
        }

    }

    function buildOrdersDetails(data) {
        const ordersDetails = JSON.parse(data);
        for(let i=0; i < ordersDetails.length; i++) {
            let orderDetails = new OrderDetails(ordersDetails[i].OrderID,
                ordersDetails[i].ProductID,
                ordersDetails[i].ProductName,
                ordersDetails[i].UnitPrice,
                ordersDetails[i].Quantity,
                ordersDetails[i].Discount);
                ordersDetailsArray.push(orderDetails);
        }
    }
    // -------------------- create new data ------------ //
}());


function Customer(  CustomerID, 
                    CompanyName,
                    ContactName,
                    ContactTitle,
                    Address,
                    City,
                    Region,
                    PostalCode,
                    Country,
                    Phone,
                    Fax) {
    this.CustomerID = CustomerID;
    this.CompanyName = CompanyName;
    this.ContactName = ContactName;
    this.ContactTitle = ContactTitle;
    this.Address = Address;
    this.City = City;
    this.Region = Region;
    this.PostalCode = PostalCode;
    this.Country = Country;
    this.Phone = Phone;
    this.Fax = Fax;
    
}

function Order( OrderID,
                CustomerID, 
                EmployeeID,
                OrderDate,
                RequiredDate,
                ShippedDate,
                ShipVia,
                Freight,
                ShipName,
                ShipAddress,
                ShipCity,
                ShipRegion,
                ShipPostalCode,
                ShipCountry) {
        this.OrderID = OrderID;
        this.CustomerID = CustomerID;
        this.EmployeeID = EmployeeID;
        this.OrderDate = OrderDate;
        this.RequiredDate = RequiredDate;
        this.ShippedDate = ShippedDate;
        this.ShipVia = ShipVia ;
        this.Freight = Freight;
        this.ShipName = ShipName;
        this.ShipAddress = ShipAddress;
        this.ShipCity = ShipCity;
        this.ShipRegion = ShipRegion;
        this.ShipPostalCode = ShipPostalCode;
        this.ShipCountry = ShipCountry;
}

function OrderDetails(  OrderID,
                        ProductID,
                        ProductName, 
                        UnitPrice,
                        Quantity,
                        Discount) {
    this.OrderID = OrderID;
    this.ProductID = ProductID;
    this.ProductName = ProductName;
    this.UnitPrice = UnitPrice;
    this.Quantity = Quantity;
    this.Discount = Discount;
}


//services
function getCustomers() {
    //alert('in getCustomers()');
    if (!custCache)
        custCache = [];
    
    return new Promise(function(resolve, error) {
       // alert("custCache.length: " + custCache.length);
        if (custCache.length > 0) {
            resolve(custCache);
            console.log('cache');
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'api.php?op=Customers');
            xhr.onload = function() {
                custCache = JSON.parse(this.responseText);
                resolve(this.responseText);
            }
            xhr.send();
        }
    });

    // var parmSql = "Customers";
    // return fetch('api.php', parmSql);
}

function getOrders() {
    //alert('in getOrders()');
    if (!orderCache)
    orderCache = [];

    return new Promise(function(resolve, error) {
        //alert("orderCache.length: " + orderCache.length);
        if (orderCache.length > 0) {
            resolve(orderCache);
            console.log('cache');
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'api.php?op=Orders');
            xhr.onload = function() {
                orderCache = JSON.parse(this.responseText);
                resolve(this.responseText);
            }
            xhr.send();
        }
});

    // var parmSql = "Orders";
    // return fetch('api.php', parmSql);
}

function getOrderDetails() {
    //alert('in getOrderDetails()');
    if (!orderDetailsCache)
    orderDetailsCache = [];

    return new Promise(function(resolve, error) {
        //alert("orderDetailsCache.length: " + orderDetailsCache.length);
        if (orderDetailsCache.length > 0) {
            resolve(orderDetailsCache);
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'api.php?op=OrderDetails');
            xhr.onload = function() {
                orderDetailsCache = JSON.parse(this.responseText);
                resolve(this.responseText);
            }
            xhr.send();
        }
});

    // var parmSql = "Orders";
    // return fetch('api.php', parmSql);
}

// function fetch(url, parmSql) {
//     return new Promise(function(resolve, reject) {
//           var oReq = new XMLHttpRequest();
//           oReq.addEventListener("load", function() {
//             resolve(this.responseText);
//           });
//           oReq.addEventListener("error", function() {
//             reject(this.responseText);
//           });
          
//           oReq.open("GET", url +'?op=' + parmSql);
//           oReq.send();
//     });
// }


