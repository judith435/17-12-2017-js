
function getCustomers() {

    custCache = window.custCache;
    if (!custCache)
        custCache = [];
    
    return new Promise(function(resolve, error) {
        if (custCache.length > 0) {
            resolve(custCache);
            console.log('cache');
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'customers.json');
            xhr.onload = function() {
                custCache = JSON.parse(this.responseText);
                resolve(this.responseText);
            }
            xhr.send();
        }
    });
}


function addCustomer(c) {
    window.custCache = null;
}
