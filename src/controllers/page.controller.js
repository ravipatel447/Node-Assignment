module.exports = {
  getHome: (req, res) => {
    res
      .status(200)
      .render('index', { isAuthenticated: req.isAuthenticated, error: false })
  },
  getAbout: (req, res) => {
    res
      .status(200)
      .render('about', { isAuthenticated: req.isAuthenticated, error: false })
  },
  getService: (req, res) => {
    res.status(200).render('services', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  getCatagory: (req, res) => {
    res.status(200).render('categories', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  getLogin: (req, res) => {
    res
      .status(200)
      .render('login', { isAuthenticated: req.isAuthenticated, error: false })
  },
  getRegister: (req, res) => {
    res.status(200).render('register', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  get404: (req, res) => {
    res.status(200).render('404', {
      isAuthenticated: req.isAuthenticated,
      error: false
    })
  },
  getProfile: (req, res) => {
    if (req.user && req.isAuthenticated) {
      res.status(200).render('profile', {
        data: {
          name: req.user.name,
          email: req.user.email
        },
        isAuthenticated: req.isAuthenticated,
        error: false
      })
    } else {
      res.status(300).redirect('/')
    }
  }
}
