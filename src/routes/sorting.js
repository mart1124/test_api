const express = require('express');
const router = express.Router();
const db = require('../models');
const filterfiles = db.files;
const { Op, Sequelize } = require("sequelize");

// GET เอาไว้ เรียกข้อมูลไปแสดง และ ค้นหาข้อมูล
router.get('/filter', function ( req, res ) {
    const {startDate, endDate, selectInput, yearData ,monthData ,startFetch} = req.query;
    
    if(startDate || endDate || selectInput === 'Year' && yearData ||selectInput == 'Month' && monthData){
      
      
      //  ## DAY ##################################################################

      if (selectInput == 'Day' && startDate && endDate){
        let Daydate = startDate
        
        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count', 'createdAt'],
          where: {
            [Op.and]:{
              createdAt: {
                [Op.between]: [startDate ,endDate]
              },
              status: 1
            }
          },
      }).then(data => {
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where: {
                [Op.and]:{
                  createdAt: {
                    [Op.between]: [startDate ,endDate]
                  },
                  status: 1
                }
              },
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }

      //  ## Week ##################################################################

      if (selectInput == 'Week' && startDate && endDate){
        
        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count', 'createdAt'],
          where: {
            [Op.and]: {
            createdAt: {
              [Op.between]: [startDate ,endDate],
            },
            status: 1
          }
          },
      }).then(data => {
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where: {
                [Op.and]: {
                createdAt: {
                  [Op.between]: [startDate ,endDate],
                },
                status: 1
              }
    
              // order: [[Sequelize.literal("createdOn"), 'ASC']],
              // group: 'createdAt'
              },
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }
      
      //  ## Month ##################################################################

      if (selectInput == 'Month' && monthData ){
        
        var dateObj = new Date(monthData);
        const startMonth = dateObj.getFullYear() + "-" +(('0'+(dateObj.getMonth()+1)).slice(-2)) +"-"+ '01'
        const endMonth = dateObj.getFullYear()+ "-"+(('0'+((dateObj.getMonth()+1)%12 + 1)).slice(-2))+ "-" + '01'
        
        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count', 'createdAt'],
          where: {
            [Op.and]: {
              createdAt: {
                [Op.between]: [startMonth , endMonth]
              },
              status: 1
            }
          }
        }).then(data => {
          filterfiles.findAll({
            attributes:[
              [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
              [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
            ],
            where: {
              [Op.and]: {
                createdAt: {
                  [Op.between]: [startMonth , endMonth]
                },
                status: 1
              }
            }
          }).then(sumcount => {
            res.status(200).json({
              data,
              sumcount
            });
          })
        }).catch(error => {
          console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        })
      }

      //  ## Year  ##################################################################

      if (selectInput == 'Year' && yearData){

        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count', 'createdAt'],
          where:{ 
          [Op.and]:
            [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearData)],
            status: 1  
          },

        }).then(data => {
          
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where:{
                [Op.and]:
                  [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearData)],
                  status: 1  
              }
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }
      
    } else {
    filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count', 'createdAt'],
        where:{
          status: 1  
        },
    }).then(data => {
        filterfiles.findAll({
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
            [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
          ],
          where:{
            status: 1  
          },
      }).then(sumcount => {
          res.status(200).json({
            data,
            sumcount
          });
      })
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
      });
    }
    
})

// POST เอาไว้ insart ข้อมูลเพิ่ม
router.post('/filter', function ( req , res) {
  const name = req.body.test;
  const datess = req.body.startdate;
  
  if (name){
    
    filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data'],
        where: {name: name}
    }).then(data => {
        res.status(200).json({
            data
        });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
        });
  } else {
    filterfiles.findAll({
      attributes: ['id', 'type', 'name', 'data'],
      limit: 10
  }).then(data => {
      res.status(200).json({
          data
      });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error!",
          error: error
        });
      });
  }
})


/* 
    ======== Print ======== 
*/


module.exports = router;







