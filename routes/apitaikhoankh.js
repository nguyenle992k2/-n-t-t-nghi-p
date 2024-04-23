var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo tai khoan khach hang
route.get('/',function(req,res){
    db.query('SELECT * FROM TaikhoanKH', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM TaikhoanKH WHERE MaKH='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update tai khoan khach hang
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var tentk = req.body.TenTKKH;
    var pass = req.body.Pass;
    var query = "UPDATE TaiKhoanKH SET  TenTKKH = ?, Pass = ? WHERE MaKH = ?;";
    db.query(query,[tentk, pass,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them tai khoan khach hang moi
route.post('/create',function(req,res){
    var makh = req.params.MaKH;
    var tentk = req.body.TenTKKH;
    var pass = req.body.Pass;
    var query = "INSERT INTO TaikhoanKH(MaKH, TenTKKH, Pass) VALUES ('"+makh+"','"+tentk+"','"+pass+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 tai khoan khach hang
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM TaikhoanKH WHERE MaKH = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});

