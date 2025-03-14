const {test,expect}=require('@playwright/test');

const { POManager } = require('../pageObjects/POManager');
const dataset=JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')))





test.only('Add items to cart',async({page})=>{
   
    const poManager=new POManager(page)
    const loginPage=poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(dataset.userEmail,dataset.password)
    
    const dashboardPage =poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(dataset.productName)
    await dashboardPage.navigateToCart()

    const cartPage=poManager.getCartpage()
    await cartPage.verifyProductIsDisplayed(dataset.productName)
    await cartPage.Checkout()

    const orderReviewPage=poManager.getOrderReviewPage()
    await orderReviewPage.searchCountryAndSelect("aus","Australia")
    await orderReviewPage.verifyEmailId(dataset.userEmail)
    const orderId=await orderReviewPage.SubmitAndGetOrderId()
    console.log(orderId)

    await dashboardPage.navigateToOrders()

    const orderHistoryPage=poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()
    //await page.pause()
});


