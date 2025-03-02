const {test,expect,request}=require('@playwright/test')
const{APIUtils}=require('./utils/APIUtils')
const loginPayload={userEmail:"admin25@gmail.com",userPassword: "Admin123"}
const ordersPayload= {orders: [{country: "Australia", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]}


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
    
    await page.locator("button[routerlink*=myorders]").click()
    await page.locator("tbody").waitFor()
    const rows=await page.locator("tbody tr")
    console.log(rows)
    for (let i=0; i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(response.orderID.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click()
            console.log("clicked")
            break

        }
    }
    const orderIdDetails=await page.locator(".col-text").textContent()
    expect((response.orderID).includes(orderIdDetails)).toBeTruthy()

    //await page.pause()

});