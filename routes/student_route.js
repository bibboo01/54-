const express = require('express');
const {
    post_std,
    put_std,
    post_std_sch,
    put_std_sch,
    put_std_det,
    post_std_det,
} = require("../controllers/student_controller");

const route = express.Router();

route.post('/fill_info',post_std);
route.post('/fill_info/std_sch',post_std_sch);
route.post('/fill_info/std_detail',post_std_det);
route.put('/fill_info/:id',put_std);
route.put('/fill_info/std_sch/:id',put_std_sch);
route.put('/fill_info/std_detail/:id',put_std_det);

module.exports = route;
