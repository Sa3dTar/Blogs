const blogModel = require('../../models/blogs/Blogs.model')
const httpStatusText = require('../../utils/httpStatusText')



const addBlog = async (req , res)=>{

    try{
        const {title , description , blog , blogs_type , writed_by } = req.body

        const newBlog = new blogModel({
           title,
           description,
           blog,
           blogs_type,
           writed_by
         })

         await newBlog.save()

        res.status(200).json({TextStatus : httpStatusText.SUCCESS , data: {newBlog} , status: 200})

    }catch(err){

        res.status(500).json({TextStatus : httpStatusText.ERROR , message : {err}, status: 500})

    }

}


const showBlogs = async (req , res)=>{


    try{

        let query = req.query


        let page = query.page

        let skip = (page - 1) * 6

        const blogs = await blogModel.find({} , {"_id" : "false"}).limit(6).skip(skip)

        if(blogs.length < 0){

            return res.status(200).json({TextStatus : httpStatusText.SUCCESS , message : 'theres no blogs for now' , status : 200 })
            
        }
        console.log("Request Body:", req.body);


        return res.status(200).json({TextStatus : httpStatusText.SUCCESS , data : blogs , status: 200})

    }catch(err){
         
        return res.status(500).json({TextStatus : httpStatusText.ERROR , message : err, status : 500})
    }

}


const showSingleBlog = async (req , res)=>{

    try{

        const blogId = req.params.blogId

        const singleBlog = blogModel.findById(blogId)

        return res.status(200).json({TextStatus : httpStatusText.SUCCESS , data : singleBlog , status : 200})

    }catch(err){

        return res.status(500).json({TextStatus : httpStatusText.ERROR , message : err, status: 500})

    }

}


const updateBlog = async (req , res)=>{

    try{

        const blogId = req.params.blogId

        const singleBlog = blogModel.findById(blogId)

        const updatedBlog = singleBlog.updateOne(singleBlog)

        return res.status(200).json({TextStatus : httpStatusText.SUCCESS , data : updatedBlog , status : 200})

    }catch(err){

        return res.status(500).json({TextStatus : httpStatusText.ERROR , message : err, status: 500})

    }

}
const deletBlog = async (req , res)=>{

    try{

        const blogId = req.params.blogId

        const singleBlog = blogModel.findById(blogId)

        const updatedBlog = singleBlog.deleteOne()

        return res.status(200).json({TextStatus : httpStatusText.SUCCESS , data : null , status : 200})

    }catch(err){

        return res.status(500).json({TextStatus : httpStatusText.ERROR , message : err, status: 500})

    }

}


module.exports = {
    addBlog , 
    showBlogs,
    showSingleBlog,
    updateBlog,
    deletBlog
}