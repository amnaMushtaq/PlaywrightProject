const {test,expect,request}=require('@playwright/test')
const{APIUtils}=require('../utils/APIUtils')
const loginPayload={userEmail:"admin25@gmail.com",userPassword: "Admin123"}
const ordersPayload= {orders: [{country: "Australia", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]}
const fakePayLoadOrders={data:[],message:"No Orders"}

let response

test.beforeAll(async()=>{
    const apiContext=await request.newContext()
    const apiUtils=new APIUtils(apiContext,loginPayload)
    response=await apiUtils.createOrder(ordersPayload)
})

test('client App login',async({page})=>{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);},response.token);  
    const productName= "ADIDAS ORIGINAL"
    
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
     async route => { 
        
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
            body
            }); 
            //intercepting response -> API response ->{playwright fakeresponse} -> browser -> render data on front end
    
}
)    
    await page.locator("button[routerlink*=myorders]").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  
    console.log(await page.locator(".mt-4").textContent())
        
}
)