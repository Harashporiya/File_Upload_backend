const express = require("express")
const path = require("path")
const multer = require("multer")


const PORT = 3001;
const app = express();

const storage = multer.diskStorage({
    destination: function (req,file, cb){
        return cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

// const upload = multer({ dest: "uploads/"})

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"))

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    return res.render("home")
})

app.post("/upload", upload.single("profileImage"), (req, res)=>{
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
  })
  

app.listen(PORT,()=>console.log(`Server Started At PORT: ${PORT}`))