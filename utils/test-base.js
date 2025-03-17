const base=require('@playwright/test');

exports.customtest=base.test.extend({
    testDataForOrder:{
        userEmail:"admin25@gmail.com",
        password:"Admin123",
        productName: "ADIDAS ORIGINAL"
        
    }
}
)
