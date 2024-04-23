var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo kho hang
route.get('/',function(req,res){
    db.query('SELECT * FROM KhoHang', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM KhoHang WHERE MaSP='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update kho hang
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var slton = req.body.SLton;
    var tinhchat = req.body.Tinhchat;
    var query = "UPDATE KhoHang SET  SLton = ?, Tinhchat = ? WHERE MaSP = ?;";
    db.query(query,[slton, tinhchat,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them kho hang moi
route.post('/create',function(req,res){
    var masp = req.params.MaSP;
    var slton = req.body.SLton;
    var tinhchat = req.body.Tinhchat;
    var query = "INSERT INTO KhoHang(MaSP, SLton, Tinhchat) VALUES ('"+masp+"','"+slton+"','"+tinhchat+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 kho hang
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM KhoHang WHERE MaSP = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;