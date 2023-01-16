const fs = require('fs')

//http://localhost:3000/api/getblog?slug=how-to-learn-javaScript => use this url inthis way
export default function handler(req, res) {
  fs.readFile(`blogdata/${req.query.slug}.json`,'utf-8',(err ,data)=>{
    if (err){
        res.status(500).json({error: "Cannot find Blog"})
    }
    // console.log(req.query.slug);
    res.status(200).json(JSON.parse(data));
  })
}