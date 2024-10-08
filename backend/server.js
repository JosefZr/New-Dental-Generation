import express from "express"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const __dirname = path.resolve()

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
