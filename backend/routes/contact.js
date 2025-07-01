const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");


const authenticateToken =(req, res, next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"토큰이 없습니다."})
    }
    
    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET)
        req.user=decoded

        next()
    } catch (error) {
        return res.status(403).json({message:"유효하지 않은 토큰입니다."})
        
    }
}

router.post("/",async(req, res)=>{
    try {
        const {name, email,phone,message, status}=req.body

        const contact = new Contact({
            name, email,phone, message, status
        })

        await contact.save()
        res.status(201).json({message:"문의가 성공적으로 등록"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"서버에러"})
        
    }
})


module.exports=router