class TravelBookAPI {
  constructor() {
    this.LmsHost = "http://localhost:3050"

    if (typeof(window) !== "undefined" && window.location.protocol === "https:") {
      this.LmsHost = "https://5bt69x77-3050.asse.devtunnels.ms"
    } else {
      this.LmsHost = "http://localhost:3050"
    }
  }

  async PostRegister(params) {
    return this.Post(`/api/v1/u/users/register`, "", params)
  }

  async PostLogin(params) {
    return this.Post(`/api/v1/u/users/login`, "", params)
  }

  async GetProfile(authToken, params) {
    return this.Get(`/api/v1/u/users/profile`, authToken, params)
  }

  async GetCampingPackets(authToken, params) {
    return this.Get(`/api/v1/u/camping_packets`, authToken, params)
  }

  async GetCampingItems(authToken, params) {
    return this.Get(`/api/v1/u/camping_items`, authToken, params)
  }

  async GetMyBookingList(authToken, params) {
    return this.Get(`/api/v1/u/bookings`, authToken, params)
  }

  async GetAdminBookingList(authToken, params) {
    return this.Get(`/api/v1/a/bookings`, authToken, params)
  }

  async GetAdminBookingDetail(authToken, params) {
    return this.Get(`/api/v1/a/bookings/${params.booking_number}`, authToken, params)
  }

  async GetMyBookingDetail(authToken, params) {
    return this.Get(`/api/v1/u/bookings/${params.booking_number}`, authToken, params)
  }

  async PostCreateBooking(authToken, params) {
    return this.Post(`/api/v1/u/bookings/create`, authToken, params)
  }

  async PostBookingAction(authToken, params) {
    return this.Post(`/api/v1/a/bookings/${params.booking_number}/action/${params.action}`, authToken, params)
  }

  async UpdateUser(authToken, params) {
    return this.Patch(`/api/user/${params.user_id}`, authToken, params)
  }

  async DeleteUser(authToken, params) {
    return this.Delete(`/api/user/${params.user_id}`, authToken, params)
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
