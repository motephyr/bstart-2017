import { Router } from 'express'
import { TableFields, TableField } from '../models/table_fields'
import { TableFieldXs, TableFieldX } from '../models/table_field_xs'
import { TableFieldYs, TableFieldY } from '../models/table_field_ys'
import { TableValues, TableValue } from '../models/table_values'
import _ from 'lodash'

const router = Router()


/* GET users listing. */
router.get('/table_fields/:id', async function (req, res, next) {
    try {
      // var result = await Domain.forge().query((qb) => {
      //   qb.where({id: 5});
      // }).fetch({withRelated: ['user']});
      var table_field = (await TableField.forge().query((qb) => {
        qb.where({field: req.params.id, year: req.query.year});
      }).fetch({withRelated: ['table_field_xs', 'table_field_ys',{'table_field_xs.table_values': (qb) => {
        qb.where({year_place_id: req.query.yearPlaceId})
      }}]})).toJSON();
      
      var ys = _(table_field.table_field_ys).orderBy('location')
      // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
      if (req.query.action == 'edit'){
        var xs = _(table_field.table_field_xs).orderBy('location')
      } else {
      var xs = _(table_field.table_field_xs).orderBy('location').filter((x) => {return !x.deleted_at})
      }
      // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
      var value = _(xs).map((x) => {return x.table_values[0] && x.table_values[0].value != null ? x.table_values[0].value : [null,null] }).value()

      res.status(200).json({xaxio: xs, yaxio: ys, value: value});
      
    } catch(e) {
      console.log(e)
      res.status(500).json(e);
 
    }

})

router.get('/table_fields/all/:id', async function (req, res, next) {
  try {
    // var result = await Domain.forge().query((qb) => {
    //   qb.where({id: 5});
    // }).fetch({withRelated: ['user']});
    var table_field = (await TableFields.forge().query((qb) => {
      qb.where({field: req.params.id, year: req.query.year});
    }).fetch({withRelated: ['table_field_xs', 'table_field_ys','table_field_xs.table_values']})).toJSON();
    console.log(table_field)
    console.log('==================')
    var ys = _(table_field[0].table_field_ys).orderBy('location')
    // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
    if (req.query.action == 'edit'){
      var xs = _(table_field[0].table_field_xs).orderBy('location')
    } else {
      var xs = _(table_field[0].table_field_xs).orderBy('location').filter((x) => {return !x.deleted_at}).value()
    }
    // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
    console.log(xs)
    console.log('==================')
    
    var mid_value = _(table_field).map((x) => {return _(x.table_field_xs).map((y) => {return y.table_values}).value() }).value()
    console.log(mid_value)
    
    var mid2_value = _(mid_value[0]).map((x) => {return _(x).map((y) => {return y.value}).value() }).value()
    console.log(mid2_value)
    
    
    var value = _(mid2_value).map((x) => { 
      return _(x).reduce((sum, x) => {
        var m = x[0] ? parseInt(x[0]) : 0
        var n = x[1] ? parseInt(x[1]) : 0
        
        return [sum[0]+m, sum[1]+ n]
      },[0,0])
    }).value()
    
    console.log(value)

    res.status(200).json({xaxio: xs, yaxio: ys, value: value});

  } catch(e) {
    console.log(e)
    res.status(500).json(e);

  }

})


router.post('/table_fields/getSubField/:id', async function (req, res, next) {
  try {
    // var result = await Domain.forge().query((qb) => {
    //   qb.where({id: 5});
    // }).fetch({withRelated: ['user']});

    var table_field = (await TableFields.forge().query((qb) => {
      qb.where({field: req.params.id, year: req.body.year});
    }).fetch({withRelated: ['table_field_xs', 'table_field_ys',{'table_field_xs.table_values': (qb) => {
      qb.where({year_place_id: req.body.yearPlaceId})
    }}]})).toJSON();

    var obj = [];
    console.log(table_field)
    for (var i=0;i<table_field.length; i++){
      var subField = table_field[i].sub_field
      var ys = _(table_field[i].table_field_ys).orderBy('location').value()
      // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
      var xs = _(table_field[i].table_field_xs).orderBy('location').value()

      // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
      var value = _(xs).map((x) => {return x.table_values[0] && x.table_values[0].value != null ? x.table_values[0].value : [null,null] }).value()
      obj.push({sub_field: subField, xaxio: xs, yaxio: ys, value: value})
    }
    res.status(200).json(obj);
    
  } catch(e) {
    console.log(e)
    res.status(500).json(e);

  }

})

export default router
