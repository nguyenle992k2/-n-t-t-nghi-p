var express = require('express');
var route = express();
var db = require('./dbconnect');
//lay ve toan bo san pham
route.get('/',function(req,res){
    db.query('SELECT * FROM SanPham', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//lay ve 1 san pham ->cho truong hop chi tiet san pham hoac sua san pham
route.get('/getonce/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM SanPham WHERE MaSP='"+ id +"'";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//sản phẩm được yêu thích 
route.get('/spyeuthich',function(req,res){
    var id = req.params.id;
    var query = 'SELECT * FROM SanPham s inner join KhoHang k on s.MaSP=k.MaSP where Tinhchat="sản phẩm được yêu thích"';
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//sản phẩm mới
route.get('/sanphammoi',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM SanPham group by NgayTao order by Ngaytao desc limit 7;";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//sản phẩm theo loại
route.get('/sptheoloai/:id',function(req,res){
    var id = req.params.id;
    var query = "SELECT * FROM sanpham where MaLoai = "+id+"";
    db.query(query, (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        res.json(rows);
    });
});
//update san pham
route.put('/update/:id',function(req,res){
    var id = req.params.id;
    var maloai = req.body.MaLoai;
    var mancc = req.body.MaNCC;
    var tensp = req.body.TenSP;
    var anh = req.body.Anh;
    var mota = req.body.Mota;
    var gia = req.body.Dongia;
    var ngaytao = req.params.NgayTao;
    var query = "UPDATE SanPham SET  MaLoai=?, MaNCC=?, TenSP=?, Anh=?, Mota=?, Dongia=?, NgayTao=? WHERE MaSP=?;";
    db.query(query,[maloai,mancc,tensp,anh,mota,gia,ngaytao,id], (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({message:"sua thanh cong"});
        // res.json({result: result});
    });
}); 
//them loai san pham moi
route.post('/create',function(req,res){
    var maloai = req.body.MaLoai;
    var mancc = req.body.MaNCC;
    var masp = req.params.MaSP;
    var tensp = req.body.TenSP;
    var anh = req.body.Anh;
    var mota = req.body.Mota;
    var dongia = req.body.Dongia;
    var ngaytao = req.params.NgayTao;
    var query = "INSERT INTO SanPham(MaLoai, MaNCC, MaSP, TenSP, Anh, Mota, Dongia, Ngaytao) VALUES ('"+maloai+"','"+mancc+"','"+masp+"','"+tensp+"','"+anh+"','"+mota+"','"+dongia+"','"+ngaytao+"')";
    db.query(query, (err,  result) => {
        if (err) throw err
        // console.log(result);
        res.json({mess:"Them thanh cong"});
        // console.log(maloai,tenloai,ghichu);
    });
});
//xoa 1 san pham
route.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var query = "DELETE FROM SanPham WHERE MaSP = '"+id+"'";
    db.query(query, (err,  result) => {
        if (err) throw err
        console.log(result);
        res.json({message:"Xoa thanh cong"});
    });
});
module.exports = route;