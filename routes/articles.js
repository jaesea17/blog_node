const express = require('express');
const Article = require('../models/articleMo');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articlesfolder/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articlesfolder/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) res.redirect('/');
    res.render('articlesfolder/show', { article: article});
})

router.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'))

router.delete('/slug', async (req, res) => {
    console.log('*******', req.params.slug);
    await Article.findOneAndDelete({ slug: req.params.slug })
    res.redirect('/');
})

router.put('/:id', async (req, res) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'))



function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try{
            let savedArticle = await article.save()
            res.redirect(`/articles/${savedArticle.slug}`)
         }catch (err) {
             console.log(err);
             res.render(`articlesfolder/${path}`, { article: article });
         }
    }
}

module.exports = router