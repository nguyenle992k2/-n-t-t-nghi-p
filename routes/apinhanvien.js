var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo nhan vien
route.get('/',function(req,res){
    db.query('SELECT * FROM NhanVien', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM NhanVien WHERE MaNV='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update nhan vien
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var tennv = req.body.TenNV;
    var gioitinh = req.body.GioitinhNV;
    var ngaysinh = req.body.NgaysinhNV;
    var sdt = req.body.SdtNV;
    var que = req.body.Quequan;
    var noicutru = req.body.Noicutru;
    var email = req.body.EmailNV;
    var query = "UPDATE loaisp SET  TeNV = ?, GioitinhNV = ?, NgaysinhNV = ?, SdtNV = ?, Quequan = ?, Noicutru = ?, EmailNV = ? WHERE MaNV = ?;";
    db.query(query,[tennv,gioitinh,ngaysinh,sdt,que,noicutru,email,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them nhan vien moi
route.post('/create',function(req,res){
    var manv = req.params.MaNV;
    var tennv = req.body.TenNV;
    var gioitinh = req.body.GioitinhNV;
    var ngaysinh = req.body.NgaysinhNV;
    var sdt = req.body.SdtNV;
    var que = req.body.Quequan;
    var noicutru = req.body.Noicutru;
    var email = req.body.EmailNV;
    var query = "INSERT INTO NhanVien(MaNV,TenNV,GioitinhNV,NgaysinhNV,SdtNV,Quequan,Noicutru,EmailNV) VALUES ('"+manv+"','"+tennv+"','"+gioitinh+"','"+ngaysinh+"','"+sdt+"','"+que+"','"+noicutru+"','"+email+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 nhan vien
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM NhanVien WHERE MaNV = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;