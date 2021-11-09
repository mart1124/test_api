const express = require('express');
const router = express.Router();
const db = require('../models');
const filterfiles = db.files;
const historyImage = db.history;

router.get('/getdata/recovery/video', function( req, res) {
    filterfiles.findAll({
      attributes: ['id', 'type', 'name', 'data', 'createdAt'],
      where:{
        status: 0
      },
      }).then(datarecov => {
          res.status(200).json({
            datarecov
          });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
      });
  })

  router.get('/getdata/recovery/image', function( req, res) {
    historyImage.findAll({
      attributes: ['id', 'type', 'name', 'createdAt'],
      where:{
        status: 0
      },
      }).then(datarecov => {
          res.status(200).json({
            datarecov
          });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
      });
  })

router.get('/data/recovery/video', async function(req, res, next) {
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

    updateFile.update({status: 1})
    return res.status(200).json({
        massage: 'Successfully recovery the file.',
        status: 200
    })
})


router.get('/data/recovery/image', async function(req, res, next) {
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

  updateFile.update({status: 1})
  return res.status(200).json({
      massage: 'Successfully recovery the file.',
      status: 200
  })
})
  
  module.exports = router;