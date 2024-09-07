const std_info_ = require("../models/std_tbl");
const std_sch = require("../models/std_school_tbl");
const std_details = require("../models/std_details_tbl");
const { default: mongoose } = require("mongoose");

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

exports.get_stds = async (req, res) => {
    try {
        const data_std = await std_info_.aggregate([
            {
                $lookup: {
                    from: 'std_details_tbl',
                    localField:'std_id',
                    foreignField:'std_id',
                    as:'details'
                }
            },
            {
                $unwind:'$details'
            },
            {
                $lookup: {
                    from: 'std_school_tbl',
                    localField:'std_id',
                    foreignField:'std_id',
                    as:'school'
                }
            },{
                $unwind:'$school'
            }
        ]).exec();
        res.status(200).json(data_std);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
    
    // try {
    //     const data_stds = await std_info_.find();
    //     res.status(200).json(data_stds)
    // } catch (err) {
    //     res.status(500).json(err)
    // }
}

exports.get_std = async (req, res) => {
    try {
        const data_std = await std_info_.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'std_details_tbl',
                    localField:'std_id',
                    foreignField:'std_id',
                    as:'details'
                }
            },
            {
                $unwind:'$details'
            },
            {
                $lookup: {
                    from: 'std_school_tbl',
                    localField:'std_id',
                    foreignField:'std_id',
                    as:'school'
                }
            },{
                $unwind:'$school'
            }
        ]).exec();
        res.status(200).json(data_std);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
    // try {
    //     const { id } = req.params;
    //     const data_std = await std_info_.findById(id);
    //     res.status(200).json(data_std)
    // } catch (err) {
    //     res.status(500).json(err)
    // }
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

exports.del_std = async (req, res) => {
    try {
        const { id } = req.params;
        const data_std = await std_info_.findById(id);
        if (!data_std) return res.status(404).json({
            message: "Student not found"
        })
        const deldated = await std_info_.findByIdAndDelete(id);
        res.json(deldated);
    } catch (err) {
        res.status(500).json(err)
    }
}