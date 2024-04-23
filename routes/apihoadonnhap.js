var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan hoa don nhap
route.get('/',function(req,res){
    db.query('SELECT * FROM HoaDonNhap', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 hoa don nhap ->cho truong hop chi tiet hoa don nhap hoac sua hoa don nhap
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM HoaDonNhap WHERE MaDN='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update loai hoa don nhap
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var manv = req.body.MaNV;
    var ngaynhap = req.body.NgayNhap;
    var chietkhau = req.body.ChietKhau;
    var query = "UPDATE HoaDonNhap SET  MaNV = ?, NgayNhap = ?, ChietKhau = ? WHERE MaDN = ?;";
    db.query(query,[manv, ngaynhap,chietkhau,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them loai hoa don nhap moi
route.post('/create',function(req,res){
    var madn = req.params.MaDN;
    var manv = req.body.MaNV;
    var ngaynhap = req.body.NgayNhap;
    var chietkhau = req.body.ChietKhau;
    var query = "INSERT INTO HoaDonNhap(MaDN, MaNV, NgayNhap, ChietKhau) VALUES ('"+madn+"','"+manv+"','"+ngaynhap+"','"+chietkhau+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(MaDN,tenloai,ghichu);
    });
});
//xoa 1 loai hoa don nhap
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM HoaDonNhap WHERE MaDN = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});

module.exports = route;