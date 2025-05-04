const express = require('express')

const router = express.Router()

const PremiumBlogController = require('../../controller/premiumBlogController/premiumBlogController')
const { model } = require('mongoose')

router.route('/')
            .get(PremiumBlogController.addPremiumBlog)
            .post(PremiumBlogController.addPremiumBlog)


router.route('/BlogId')
            .get(PremiumBlogController.showSinglePrmiumBlog)
            .patch(PremiumBlogController.updatePremiumBlog)
            .delete(PremiumBlogController.deletPremiumBlog)

module.exports = router