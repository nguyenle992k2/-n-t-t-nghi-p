var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo tai khoan nhan vien
route.get('/',function(req,res){
    db.query('SELECT * FROM TaiKhoanNV', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 tai khoan nhan vien ->cho truong hop chi tiet tai khoan nhan vien hoac sua tai khoan nhan vien
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM TaiKhoanNV WHERE MaNV='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update tai khoan nhan vien
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var tentk = req.body.TenTKNV;
    var matkhau = req.body.Matkhau;
    var query = "UPDATE TaiKhoanNV SET  TenTKNV = ?, Matkhau = ? WHERE MaNV = ?;";
    db.query(query,[id,tentk, matkhau], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them tai khoan nhan vien moi
route.post('/create',function(req,res){
    var manv = req.params.MaNV;
    var tentk = req.body.TenTKNV;
    var matkhau = req.body.Matkhau;
    var query = "INSERT INTO TaiKhoanNV(MaNV, TenTKNV, Matkhau) VALUES ('"+manv+"','"+tentk+"','"+matkhau+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 tai khoan nhan vien
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM TaiKhoanNV WHERE MaNV = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;