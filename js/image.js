//本地选择图片，并显示在页面上
function showPreview(source,imgId){
    var file = source.files[0]; //获取图片资源
    if(window.FileReader){// 只选择图片文件
      if (!file.type.match('image.*')) {
        return alert("上传文件格式不是图片！请重新选择！");
      }
      var reader = new FileReader();
      reader.onloadend = function(e){
      document.getElementById(imgId).src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
}
//上传图片URL，并显示在页面上
function getValue(imgId){
    var input=document.getElementById("img_url");//通过id获取文本框对象
    var url = input.value;
    if(/.(png|jpg|jpeg|gif)$/g.test(url)){
        document.getElementById(imgId).src = url;
    }else{
        alert("输入的URL不是图片路径");//通过文本框对象获取value值
    }
}

