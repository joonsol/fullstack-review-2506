const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")


router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      password: hashedPassword
    })

    await user.save()

    res.status(201).json({ message: "회원가입 완료!" })
  } catch (error) {
    res.status(500).json({ message: "서버 오류!" })
    console.log(error)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password")

    if (!user) {
      return res.status(401).json({ message: "사용자 없음" })

    }

    await user.save()
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." })

    console.log(error)
  }
})

module.exports = router