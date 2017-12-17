// javascript filter


// $(document).off().on("click",".courses-flex #courses tr",function(e){
//     courses.courseSelected($(this));
// });

// function courseSelected(row)  {
//     var courseID = row.find("#course-id").text();
//     var courseName = row.find("#course-name").text(); 
//     var courseDescr= row.find("#course-description").text();
//     var studentCourse = row.find("#number-of-students-for-course").text();
//     var studentIDs = row.find("#student-ids").text();
//     var co = courseObject();
//     courseHandled.details = new co.Course(  parseInt(courseID), 
//                                             courseName, 
//                                             courseDescr, 
//                                             parseInt(studentCourse), 
//                                             studentIDs);
// }

(function() {
    // -------------------- show exist data ------------ //
    var ordersArray = [];

    const customersContainer = document.getElementById('customers');

    //getCustomers().then(buildCustomers);
    getCustomers().then(buildCustomers).then(getOrders).then(buildOrders);
    
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
    
    function customerSelected(custormerID) {
        console.log(custormerID);
        var ordersForCustomer = searchOrders(custormerID);
        for(let i=0; i < ordersForCustomer.length; i++) {
            const $orderDiv = document.createElement('div');
            $orderDiv.innerHTML = customer.CustomerID + " ";
            document.getElementById('orders').appendChild($orderDiv);
        }
    }

    function searchOrders(custormerID){
        var ordersForCustomer = [];
        for (var i=0; i < ordersArray.length; i++) {
            if (ordersArray[i].CustomerID === custormerID) {
                ordersForCustomer.push(ordersArray[i]);
            }
        }
        return ordersForCustomer;
    }

    function buildOrders(data) {
        const orders = JSON.parse(data);
        for(let i=0; i < orders.length; i++) {
            let order = new Order(orders[i].CustomerID,
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
            // const $addressDiv = document.createElement('p');
            // $addressDiv.className = 'drag-item';
            // $addressDiv.id = 'address' + i;
            // $addressDiv.draggable = true;
            // $addressDiv.addEventListener('dragstart', dragstart_handler);
            // $addressDiv.innerHTML = addresses[i].street + addresses[i].houseNumber + addresses[i].city ;
            // document.getElementById('addresses').appendChild($addressDiv);
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

function Order( CustomerID, 
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

//services
function getCustomers() {
    var parmSql = "Customers";
    return fetch('api.php', parmSql);
}

function getOrders() {
    // ordersCache = window.ordersCache;
    // if (!ordersCache){
    //     ordersCache = [];
    // }
    var parmSql = "Orders";
    return fetch('api.php', parmSql);
}

function fetch(url, parmSql) {
    return new Promise(function(resolve, reject) {
          var oReq = new XMLHttpRequest();
          oReq.addEventListener("load", function() {
            resolve(this.responseText);
          });
          oReq.addEventListener("error", function() {
            reject(this.responseText);
          });
          
          oReq.open("GET", url +'?op=' + parmSql);
          oReq.send();
    });
}


