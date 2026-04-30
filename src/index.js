import express from "express"

const app=express()
const PORT= process.env.PORT || 3000

app.use(express.json({
  limit:"16kb"
}))
app.get("/", (req, res)=>{
  res.send("Hello world")
})

app.listen(PORT,()=>{
  console.log(`server is up at http://localhost:${PORT}`)
})