class TravelBookAPI {
  constructor() {
    if (typeof(window) !== "undefined" && window.location.protocol === "https:") {
    } else {
    }

    this.LmsHost = "http://localhost:3050"
  }

  async Register(params) {
    return this.Post(`/api/v1/u/users/register`, "", params)
  }

  async Login(params) {
    return this.Post(`/api/v1/u/users/login`, "", params)
  }

  async GetProfile(authToken, params) {
    return this.Get(`/api/v1/u/users/profile`, authToken, params)
  }

  async GetUserDetail(authToken, params) {
    return this.Get(`/api/user/${params.user_id}`, authToken, params)
  }

  async CreateUser(authToken, params) {
    return this.Post(`/api/user`, authToken, params)
  }

  async UpdateUser(authToken, params) {
    return this.Patch(`/api/user/${params.user_id}`, authToken, params)
  }

  async DeleteUser(authToken, params) {
    return this.Delete(`/api/user/${params.user_id}`, authToken, params)
  }

  async GetBillingList(authToken, params) {
    return this.Get(`/api/billings`, authToken, params)
  }

  async GetBillingPlanList(authToken, params) {
    return this.Get(`/api/billing/${params.billing_id}/plans`, authToken, params)
  }

  async DeleteBilling(authToken, params) {
    return this.Delete(`/api/billing/${params.billing_id}`, authToken, params)
  }

  async CreateBilling(authToken, params) {
    return this.Post(`/api/billing`, authToken, params)
  }

  async UpdateBilling(authToken, params) {
    return this.Patch(`/api/billing/${params.billing_id}`, authToken, params)
  }

  async GetBillingDetail(authToken, params) {
    return this.Get(`/api/billing/${params.billing_id}`, authToken, params)
  }

  async CreateBillingPlan(authToken, params) {
    return this.Post(`/api/billing/${params.billing_id}/plan`, authToken, params)
  }

  async DeleteBillingPlan(authToken, params) {
    return this.Delete(`/api/billing_plan/${params.billing_plan_id}`, authToken, params)
  }

  async BulkAssignBilling(authToken, params) {
    return this.Post(`/api/billing/${params.billing_id}/assign`, authToken, params)
  }

  async GetMyBillings(authToken, params) {
    return this.Get(`/api/billings/me`, authToken, params)
  }

  async GetAssignedUserList(authToken, params) {
    return this.Get(`/api/billing/${params.billing_id}/users/assigned`, authToken, params)
  }

  async CreateOrder(authToken, params) {
    return this.Post(`/api/order/create`, authToken, params)
  }

  async PostSendOrderReceipt(authToken, params) {
    return this.Post(`/api/orders/me/${params.order_number}/send_payment_proof`, authToken, params)
  }

  async PostCheckMyOrder(authToken, params) {
    return this.Post(`/api/orders/me/${params.order_number}/check`, authToken, params)
  }

  async PostAnswerOrderConfirmation(authToken, params) {
    return this.Post(`/api/order/${params.order_number}/confirmation/${params.state}`, authToken, params)
  }

  async GetMyOrderList(authToken, params) {
    return this.Get(`/api/orders/me`, authToken, params)
  }

  async GetMyOrderDetail(authToken, params) {
    return this.Get(`/api/orders/me/${params.order_number}`, authToken, params)
  }

  async GetSearchOrders(authToken, params) {
    return this.Get(`/api/orders`, authToken, params)
  }

  async GetSearchContents(authToken, params) {
    return this.Get(`/api/contents`, authToken, params)
  }

  async GetContentDetail(authToken, params) {
    return this.Get(`/api/content/${params.uuid}/detail`, authToken, params)
  }

  async GetClassList(authToken, params) {
    return this.Get(`/api/classes`, authToken, params)
  }

  async Get(path, authToken, params) {
    // try {
      var uri = `${this.LmsHost}${path}?${new URLSearchParams(params)}`
      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        }
      })
      return response
    // } catch(e) { console.error(e) }
  }

  async Delete(path, authToken, params) {
    // try {
      var uri = `${this.LmsHost}${path}?${new URLSearchParams(params)}`
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
      })
      return response
    // } catch(e) { console.error(e) }
  }

  async Post(path, authToken, params) {
    // try {
      var uri = `${this.LmsHost}${path}`
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify(params),
      })
      return response
    // } catch(e) { console.error(e) }
  }

  async Patch(path, authToken, params) {
    // try {
      var uri = `${this.LmsHost}${path}`
      const response = await fetch(uri, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify(params),
      })
      return response
    // } catch(e) { console.error(e) }
  }
}

const travelBookAPI = new TravelBookAPI()

export default travelBookAPI
