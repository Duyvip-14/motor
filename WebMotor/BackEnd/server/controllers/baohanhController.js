const Warranty = require('../model/baohanh');

exports.getAllWarranties = (req, res) => {
    Warranty.getAll((err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.getWarrantyById = (req, res) => {
    const { ma_bao_hanh } = req.params;
    Warranty.getById(ma_bao_hanh, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.getWarrantiesByCustomerId = (req, res) => {
    const { ma_khach_hang } = req.params;
    Warranty.getByCustomerId(ma_khach_hang, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.createWarranty = (req, res) => {
    Warranty.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.updateWarranty = (req, res) => {
    const { ma_bao_hanh } = req.params;
    Warranty.update(ma_bao_hanh, req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.deleteWarranty = (req, res) => {
    const { ma_bao_hanh } = req.params;
    Warranty.delete(ma_bao_hanh, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.searchWarranties = (req, res) => {
    const { searchTerm } = req.params;
    Warranty.search(searchTerm, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};
