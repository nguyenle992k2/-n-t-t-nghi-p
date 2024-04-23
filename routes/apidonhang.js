var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo don hang
route.get('/',function(req,res){
    db.query('SELECT * FROM DonHang', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 don hang ->cho truong hop chi tiet don hang hoac sua don hang
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM DonHang WHERE MaDH='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update loai don hang
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var makh = req.body.MaKH;
    var manv = req.body.MaNV;
    var ngaymua = req.body.NgayMua;
    var uudai = req.body.Uudai;
    var query = "UPDATE DonHang SET  MaKH = ?, MaNV = ?, NgayMua = ?, Uudai = ? WHERE MaDH = ?;";
    db.query(query,[makh, manv, ngaymua, uudai,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them loai don hang moi
route.post('/create',function(req,res){
    var madh = req.params.MaDH;
    var makh = req.body.MaKH;
    var manv = req.body.MaNV;
    var ngaymua = req.body.NgayMua;
    var uudai = req.body.Uudai;
    var query = "INSERT INTO DonHang(MaDH, MaKH, MaNV, NgayMua, Uudai) VALUES ('"+madh+"','"+makh+"','"+manv+"','"+ngaymua+"','"+uudai+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(MaDH,tenloai,ghichu);
    });
});
//xoa 1 loai don hang
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM DonHang WHERE MaDH = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;