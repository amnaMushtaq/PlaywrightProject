const {test,expect}=require('@playwright/test');
const {custom,expect}=require('../utils/test-base');

const { POManager } = require('../pageObjects/POManager');
const dataset=JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')))


for (const data of dataset )
    {
        test(`Add to cart for ${data.productName}`,async({page})=>{
   
    const poManager=new POManager(page)
    const loginPage=poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(data.userEmail,data.password)
    
    const dashboardPage =poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(data.productName)
    await dashboardPage.navigateToCart()

    const cartPage=poManager.getCartpage()
    await cartPage.verifyProductIsDisplayed(data.productName)
    await cartPage.Checkout()

    const orderReviewPage=poManager.getOrderReviewPage()
    await orderReviewPage.searchCountryAndSelect("aus","Australia")
    await orderReviewPage.verifyEmailId(data.userEmail)
    const orderId=await orderReviewPage.SubmitAndGetOrderId()
    console.log(orderId)

    await dashboardPage.navigateToOrders()

    const orderHistoryPage=poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()
    //await page.pause()
});

}



