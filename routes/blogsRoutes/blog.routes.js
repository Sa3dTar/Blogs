const express = require('express')
const router = express.Router()

const blogController = require('../../controller/blog/blog.controller')
const verifyToken = require('../../middleware/verifyToken')
const allowedto = require('../../middleware/allowedto')
const role = require('../../utils/roles')

router.route('/')
            .get(blogController.showBlogs)
            .post(verifyToken,blogController.addBlog)


router.route('/blogId')
            .patch(allowedto(role.ADMIN , role.JOURNALIST , role.MANAGER),verifyToken,blogController.updateBlog)
            .delete(allowedto(role.ADMIN , role.JOURNALIST , role.MANAGER),verifyToken,blogController.deletBlog)
            .get(allowedto(role.ADMIN , role.JOURNALIST , role.MANAGER),blogController.showSingleBlog)

module.exports = router