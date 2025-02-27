const {test,expect,request}=require('@playwright/test')
const loginPayload={userEmail:"admin25@gmail.com",userPassword: "Admin123"}
const ordersPayload= {orders: [{country: "Australia", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]}


let token;
let orderID;

test.beforeAll(async()=>{
    const apiContext=await request.newContext()
   const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data:loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson=await loginResponse.json()
    token=loginResponseJson.token;
    console.log(token)
    const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:ordersPayload,
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        },
    });
    
    const orderResponseJson=await orderResponse.json()
     orderID=orderResponseJson.orders[0]
    console.log(orderID)

})

test.only('client App login',async({page})=>{
    const email=""

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);},token);
    
    
    const productName= "ADIDAS ORIGINAL"
    await page.goto("https://rahulshettyacademy.com/client/")
    
    await page.locator("button[routerlink*=myorders]").click()
    await page.locator("tbody").waitFor()
    const rows=await page.locator("tbody tr")
    console.log(rows)
    for (let i=0; i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(orderID.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click()
            console.log("clicked")
            break

        }
    }
    const orderIdDetails=await page.locator(".col-text").textContent()
    expect((orderID).includes(orderIdDetails)).toBeTruthy()

    await page.pause()

});