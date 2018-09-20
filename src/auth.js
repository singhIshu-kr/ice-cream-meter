export const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
