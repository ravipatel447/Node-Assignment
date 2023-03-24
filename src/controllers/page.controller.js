module.exports = {
  getHome: (req, res) => {
    res.render('index', { isAuthenticated: req.isAuthenticated, error: false })
  },
  getAbout: (req, res) => {
    res.render('about', { isAuthenticated: req.isAuthenticated, error: false })
  },
  getService: (req, res) => {
    res.render('services', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  getCatagory: (req, res) => {
    res.render('categories', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  getLogin: (req, res) => {
    res.render('login', { isAuthenticated: req.isAuthenticated, error: false })
  },
  getRegister: (req, res) => {
    res.render('register', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  getProfile: (req, res) => {
    if (req.user && req.isAuthenticated) {
      res.render('profile', {
        data: {
          name: req.user.name,
          email: req.user.email
        },
        isAuthenticated: req.isAuthenticated,
        error: false
      })
    } else {
      res.redirect('/')
    }
  }
}
