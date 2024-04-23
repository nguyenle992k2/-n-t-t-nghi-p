var express = require('express');
var route = express();
var db = require('./dbconnect');


//lay ve toan bo loai san pham
route.get('/',function(req,res){
    db.query('SELECT * FROM LoaiSP', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 loai san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
// SELECT * FROM loai_sp WHERE ID=1
    var id = req.params.id;
    var query = "SELECT * FROM LoaiSP WHERE MaLoai='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update loai san pham
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var tenloai = req.body.TenLoai;
    var ghichu = req.body.GhiChu;
    // var query = "UPDATE LoaiSP SET TenLoai = '"+tenloai+"', GhiChu = '"+ghichu+"' WHERE MaLoai = '"+id+"';";
    var query = "UPDATE loaisp SET  TenLoai = ?, GhiChu = ? WHERE MaLoai = ?;";
    db.query(query,[tenloai,ghichu, id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
});
//them loai san pham moi
route.post('/create',function(req,res){
    var maloai = req.body.MaLoai;
    var tenloai = req.body.TenLoai;
    var ghichu = req.body.GhiChu;
    var query = "INSERT INTO LoaiSP(MaLoai, TenLoai, GhiChu) VALUES ('"+maloai+"','"+tenloai+"','"+ghichu+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 loai san pham
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM LoaiSP WHERE MaLoai = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});


module.exports = route;