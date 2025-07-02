const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const axios = require("axios");


const authenticateToken = (req, res, next) => {
        const token =req.cookies.token;

    if(!token){
        return res.status(401).json({message:"토큰이 없습니다.11"})
    }
    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded;
        next()
    } catch (error) {
        
        return res.status(403).json({message:"유효하지 않은 토큰 123"})
    }
}

router.post("/",async(req, res)=>{
    try{
        const {title,content, fileUrl}=req.body
        const latestPost =await Post.findOne().sort({number:-1})
        const nextNumber =latestPost? latestPost.number+1:1

        const post = new Post({
            number:nextNumber,
            title,
            content,
            fileUrl
        })

        await post.save()
        res.status(201).json()
    }catch(error){
        return res.status(500).json({message:"서버 오류 발생"})
    }
})


module.exports=router