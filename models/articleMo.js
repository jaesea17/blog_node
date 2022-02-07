const mongoose = require('mongoose');
const { marked } = require('marked');// allows creation of markdown and turned into HTML
const slugify = require('slugify');// allows creation of slug to be used in the URL
const createDomPurify = require('dompurify');// used to prevent malicius js running in our markdown
const { JSDOM } = require('jsdom');// aids the use of dompurify
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }  
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true,
        strict: true })
    }

    if (this.markdown) {
        this.sanitizedHtml = marked.parse(this.markdown)
    }

    next();
})

module.exports = mongoose.model('Article', articleSchema)