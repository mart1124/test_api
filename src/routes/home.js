const router = require('express').Router();
const velifytoken = require('../middleware/verifyToken');
const db = require('../models');
const filterfiles = db.files;
const historyImage = db.history;

router.get('/auth', velifytoken, (req, res) => {
    const { authstatus } = req.query
    if (authstatus){
        return res
            .status(200)
            .json({
                status: 200,
                massage: "Is user"
            })
    } else {
        return res
            .status(400)
            .json({
                status: 400,
                massage: "Is not user"
            })
    }
   
});

router.get('/removevideo', async function(req, res, next) {
    const { id } = req.query

    const updateFile = await filterfiles.findOne({
        where: {
            id: id
        }
    })
    if (!updateFile) {
        return res.status(400).json({
            message: "Not find ID_file.",
            status: 400
        });
    }

    updateFile.update({status: 0})
    return res.status(200).json({
        massage: 'Successfully deleted the file.',
        status: 200
    })
})

router.get('/removeimage', async function(req, res, next) {
    const { id } = req.query

    const updateFile = await historyImage.findOne({
        where: {
            id: id
        }
    })
    if (!updateFile) {
        return res.status(400).json({
            message: "Not find ID_file.",
            status: 400
        });
    }

    updateFile.update({status: 0})
    return res.status(200).json({
        massage: 'Successfully deleted the file.',
        status: 200
    })
})

module.exports = router;