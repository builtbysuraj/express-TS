// import connect from '../db'

export const logout = (req, res) => {
  try {
    // await connect()
    // res.cookies.set('token', '', {
    //   httpOnly: true,
    //   secure: true,
    //   expires: new Date(0),
    // })
    res.cookie('token', '', {
      // httpOnly: true,
      // secure: true,
      maxAge: 0,
      sameSite: 'none'
      // expires: new Date(0),
    })
    return res.json({
      message: 'Logout successfully',
      success: true,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
