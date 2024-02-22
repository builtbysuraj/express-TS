import connect from '../db'

export const logout = async (req, res) => {
  try {
    await connect()
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    // res.cookie('token', '', {
    //   maxAge: 0,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // })
    return res.json({
      message: 'Logout successfully',
      success: true,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
