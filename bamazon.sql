CREATE TABLE `products` (
  `item_id` varchar(45) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `department_name` varchar(45) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`item_id`,`product_name`,`department_name`,`price`,`stock_quantity`)
) 