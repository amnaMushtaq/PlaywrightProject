class APIUtils{
    constructor(apiContext,loginPayload){
        this.apiContext=apiContext
        this.loginPayload=loginPayload


    }

    async getToken(){
        const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
                data:this.loginPayload
            })
            //expect(loginResponse.ok()).toBeTruthy()
            const loginResponseJson=await loginResponse.json()
            const token=loginResponseJson.token;
            console.log(token)
            return token;
   }
   async createOrder(ordersPayload){
    let response={}
    response.token=await this.getToken()
    const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data:ordersPayload,
            headers:{
                'Authorization':response.token,
                'Content-Type':'application/json'
            },
        })
        
        const orderResponseJson=await orderResponse.json()
        const orderID=orderResponseJson.orders[0]
        console.log(orderID)
        //return orderID
        response.orderID=orderID
        return response

   }
    
}
module.exports={APIUtils};