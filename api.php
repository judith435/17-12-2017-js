<?php
    $con = mysqli_connect('localhost','root','','northwind');

    $queryCustomers = "SELECT `CustomerID`, `CompanyName`, `ContactName`, `ContactTitle`, `Address`, `City`, `Region`, `PostalCode`, `Country`, `Phone`, `Fax` FROM `customers`";
    $queryOrderDetails = "SELECT `OrderID`, `ProductID`, `UnitPrice`, `Quantity`, `Discount` FROM `order details`";
    $queryOrders = "SELECT `OrderID`, `CustomerID`, `EmployeeID`, `OrderDate`, `RequiredDate`, `ShippedDate`, `ShipVia`, `Freight`, `ShipName`, `ShipAddress`, `ShipCity`, `ShipRegion`, `ShipPostalCode`, `ShipCountry` FROM `orders`";
    $queryProducts = "SELECT `ProductID`, `ProductName`, `SupplierID`, `CategoryID`, `QuantityPerUnit`, `UnitPrice`, `UnitsInStock`, `UnitsOnOrder`, `ReorderLevel`, `Discontinued` FROM `products`";

    
    function utf8ize($d) {
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else if (is_string ($d)) {
            return utf8_encode($d);
        }
        return $d;
    }

    if (isset($_REQUEST['op'])) {

        $rows = array();
        
        switch (strtolower($_REQUEST['op'])) {
            case strtolower('Customers'):
                $sth = mysqli_query($con, $queryCustomers);
                while($r = mysqli_fetch_assoc($sth)) {
                    $rows[] = $r;
                }
                echo json_encode(utf8ize($rows));
                break;
            case strtolower('OrderDetails'):
                $sth = mysqli_query($con, $queryOrderDetails);
                while($r = mysqli_fetch_assoc($sth)) {
                    $rows[] = $r;
                }
                echo json_encode(utf8ize($rows));
                break;
            case strtolower('Orders'):
                $sth = mysqli_query($con, $queryOrders);
                while($r = mysqli_fetch_assoc($sth)) {
                    array_push($rows, $r);
                }
                echo json_encode(utf8ize($rows));
                break;
            case strtolower('Products'):
                $sth = mysqli_query($con, $queryProducts);
                while($r = mysqli_fetch_assoc($sth)) {
                    $rows[] = $r;
                }
                echo json_encode(utf8ize($rows));
                break;
            default:
                break;
        }
    }

?>