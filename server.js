const express = require('express');
const Article = require('./models/articleMo');
const articleRouter = require('./routes/articles');
const db = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const axios = require('axios');
const app = express();

//set the view to be 'ejs' while 'view engine' convert the ejs to html
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use('/articles', articleRouter);
app.use(methodOverride('_method')); 

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    }); 
    res.render('articlesfolder/index', { articles: articles, deleteArticle: deleteArticle});
})


function deleteArticle() {
    console.log("it worked")
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})