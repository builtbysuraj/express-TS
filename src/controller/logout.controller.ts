export const logout = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 })
    return res.json({
      message: 'Logout successfully',
      success: true,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
