var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo nha cung cap
route.get('/',function(req,res){
    db.query('SELECT * FROM NhaCungCap', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM NhaCungCap WHERE MaNCC='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update nha cung cap
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var tenncc = req.body.TenNCC;
    var sdt = req.body.SdtNCC;
    var diachi = req.body.DiachiNCC;
    var email = req.body.EmailNCC;
    var query = "UPDATE NhaCungCap SET  TenNCC = ?, SdtNCC = ?, DiachiNCC = ?, EmailNCC = ? WHERE MaNCC = ?;";
    db.query(query,[tenncc,sdt,diachi,email,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them nha cung cap moi
route.post('/create',function(req,res){
    var mancc = req.params.MaNCC;
    var tenncc = req.body.TenNCC;
    var sdt = req.body.SdtNCC;
    var diachi = req.body.DiachiNCC;
    var email = req.body.EmailNCC;
    var query = "INSERT INTO NhaCungCap(MaNCC, TenNCC, SdtNCC, DiachiNCC, EmailNCC) VALUES ('"+mancc+"','"+tenncc+"','"+sdt+"','"+diachi+"','"+email+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 nha cung cap
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM NhaCungCap WHERE MaNCC = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;