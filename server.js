const express = require('express');
const Article = require('./models/articleMo');
const articleRouter = require('./routes/articles');
const db = require('./config/db');
const methodOverride = require('method-override');
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
    res.render('articlesfolder/index', { articles: articles});
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})