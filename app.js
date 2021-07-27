const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let dataJson = fs.readFileSync("model/data.json")
    const data = JSON.parse(dataJson);
    let containerJson = fs.readFileSync("model/container.json")
    const container = JSON.parse(containerJson);
    let portfolioJson = fs.readFileSync("model/portfolio.json")
    const portfolio = JSON.parse(portfolioJson);
    let servicesJson = fs.readFileSync("model/services.json")
    const services = JSON.parse(servicesJson);
    res.render('index', {
        data: data[0],
        portfolios: portfolio,
        services: services,
        containers: container
    });
});

app.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const my_data = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message
    };
    let messages = [];
    const path = 'model/messages.json';
    fs.readFile(path, (err, fileContent) => {
        if (!err) {
           const  messages = JSON.parse(fileContent);
        }
        messages.push(my_data);
        // res.redirect("/");
        fs.writeFile(path, JSON.stringify(messages),(err)=>{
            if(err){
                console.log("Got an error"+ err);
               
            }
        });
    });
})
app.listen(3000);