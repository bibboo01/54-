const std_info_ = require("../models/std_tbl");
const std_sch = require("../models/std_school_tbl");
const std_details = require("../models/std_details_tbl");

exports.post_std = async (req,res) => {
    const {
        std_id,
        prefix,
        std_Fname,
        std_Lname,
        std_nickname,
        std_religion,
        major,
        std_tel
    } = req.body;
    const data_std = new std_info_({
        std_id,
        prefix,
        std_Fname,
        std_Lname,
        std_nickname,
        std_religion,
        major,
        std_tel
    });

    try {
        const newdata_std = await data_std.save();
        res.status(201).json(newdata_std);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

exports.post_std_sch = async (req,res) => {
    const {
        std_id,
        sch_name,
        sch_province
    } = req.body;
    const data_std = new std_sch({
        std_id,
        sch_name,
        sch_province
    });

    try {
        const newdata_std = await data_std.save();
        res.status(201).json(newdata_std);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

exports.post_std_det = async (req,res) => {
    const {
        std_id,
        std_father_name,
        std_father_tel,
        std_mother_name,
        std_mother_tel,
        std_parent_name,
        std_parent_tel,
        std_parent_rela,
        allergic_things,
        allergic_drugs,
        allergic_condition
    } = req.body;
    const data_std = new std_details({
        std_id,
        std_father_name,
        std_father_tel,
        std_mother_name,
        std_mother_tel,
        std_parent_name,
        std_parent_tel,
        std_parent_rela,
        allergic_things,
        allergic_drugs,
        allergic_condition
    });

    try {
        const newdata_std = await data_std.save();
        res.status(201).json(newdata_std);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

exports.put_std = async (req, res) => {
    try {
        const { id } = req.params;
        const data_std = await std_info_.findById(id);
        const data = {
            $set: req.body
        }
        const updated = await std_info_.findByIdAndUpdate(id, data);
        res.json(updated);
        res.status(200).json(data_std);
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.put_std_sch = async (req, res) => {
    try {
        const { id } = req.params;
        const data_std = await std_sch.findById(id);
        const data = {
            $set: req.body
        }
        const updated = await std_sch.findByIdAndUpdate(id, data);
        res.json(updated);
        res.status(200).json(data_std);
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.put_std_det = async (req, res) => {
    try {
        const { id } = req.params;
        const data_std = await std_details.findById(id);
        const data = {
            $set: req.body
        }
        const updated = await std_details.findByIdAndUpdate(id, data);
        res.json(updated);
        res.status(200).json(data_std);
    } catch (err) {
        res.status(500).json(err)
    }
}