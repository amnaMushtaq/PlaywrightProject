const {LoginPage}=require('./LoginPage')
const {DashboardPage}=require('./DashboardPage')
const {CartPage}=require('./CartPage')
const {OrderReviewPage}=require('./OrderReviewPage')
const {OrderHistoryPage}=require('./OrderHistoryPage')

class POManager{
    constructor(page){
        if (!page) {
            throw new Error("Page instance is undefined in POManager! Check if test is passing 'page' correctly.");
        }
        this.page=page
        this.loginPage=new LoginPage(this.page)
        this.dashboardPage =new DashboardPage(this.page)
        this.cartPage=new CartPage(this.page)
        this.orderReviewPage=new OrderReviewPage(this.page)
        this.orderHistoryPage=new OrderHistoryPage(this.page)

    }
    getLoginPage(){
        return this.loginPage

    }

    getDashboardPage(){
        return this.dashboardPage
    }
    getCartpage(){
        return this.cartPage
    }
    getOrderReviewPage(){
        return this.orderReviewPage
    }
    getOrderHistoryPage(){
        return this.orderHistoryPage
    }
}
module.exports={POManager}