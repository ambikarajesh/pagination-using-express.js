const Image = require('../models/image');
const PAGE_PER_IMAGES = 2;
exports.getImages = async(req, res, next) =>{   
    const currentPage = +req.query.page; 
    let totalImages;
    Image.find().count().then(total => {
        totalImages = total;
        return Image.find().skip((currentPage-1)*PAGE_PER_IMAGES).limit(PAGE_PER_IMAGES)
    }).then(images => {
        res.render('image-list', {
            title:'Gallery',
            images: images,
            currentPage:currentPage,
            pages:Math.ceil(totalImages/PAGE_PER_IMAGES),
            hasPrevPage:currentPage > 1,
            hasNextPage:Math.ceil(totalImages/PAGE_PER_IMAGES) > currentPage
        }) 
    }).catch(err=> console.log(err))     
}

exports.getImage = (req, res, next) =>{
    res.render('addImage', {
        title:'Gallery'
    })
}

exports.postImage = (req, res, next) =>{
    const image = new Image({name:req.body.name, image:req.body.image});
    image.save((err, result)=>{
        if(err){
            throw new Error(err);
        }
        res.redirect('/')        
    })
    
}