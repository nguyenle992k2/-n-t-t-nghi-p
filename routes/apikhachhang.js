var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo khach hang
route.get('/',function(req,res){
    db.query('SELECT * FROM KhachHang', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM KhachHang WHERE MaKH='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update khach hang
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var tenkh = req.body.TenKH;
    var gioitinh = req.body.GioitinhKH;
    var sdt = req.body.SdtKH;
    var diachi = req.body.DiachiKH;
    var email = req.body.EmailKH;
    var query = "UPDATE KhachHang SET  TenKH = ?, GioitinhKH = ?, SdtKH = ?, DiachiKH = ?, EmailKH = ? WHERE MaKH = ?;";
    db.query(query,[tenkh, gioitinh, sdt, diachi, email,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them khach hang moi
route.post('/create',function(req,res){
    var makh = req.params.MaKH;
    var tenkh = req.body.TenKH;
    var gioitinh = req.body.GioitinhKH;
    var sdt = req.body.SdtKH;
    var diachi = req.body.DiachiKH;
    var email = req.body.EmailKH;
    var query = "INSERT INTO KhachHang(MaKH, TenKH, GioitinhKH, SdtKH, DiachiKH, EmailKH) VALUES ('"+makh+"','"+tenkh+"','"+gioitinh+"','"+sdt+"','"+diachi+"','"+email+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 khach hang
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM KhachHang WHERE MaKH = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;