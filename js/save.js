function triggerClick(node){
  if (document.createEvent) {
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('click', true, false);
      node.dispatchEvent(evt);
  } else if (document.createEventObject) {
      node.fireEvent('onclick') ;
  } else if (typeof node.onclick == 'function') {
      node.onclick();
  }
}
//保存为pdf格式
function pdf(target){
    target.style.background = "#FFFFFF";
    target.style.width = '592.28px';
    target.style.height = '841.89px';
    html2canvas(target,{
      onrendered:function(canvas){
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        // 页面偏移
        var position = 0;
        ////a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg',1.0);
        var pdf = new jsPDF('','pt','a4');
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if(leftHeight < pageHeight){
          pdf.addImage(pageData,'JPEG',0,0,imgWidth,imgHeight);
        }else{
          while(leftHeight > 0){
            pdf.addImage(pageData,'JPEG',0,position,imgWidth,imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if(leftHeight > 0){
              pdf.addPage();
            }
          }
        }
        pdf.save('result.pdf');
        
      }
    })
    target.style.height = '400px';
    target.style.width = '95%';
}

//select中option加事件
function save(){
  //获取当前onchange的节点
  var e = window.event;
  var which = e.target;
  console.log(which.id);
  //创建新元素<a>用来下载任务
  var a = document.createElement('a');
  //判断是三个页面中的哪个保存按钮
  var obj,
      target;
  if(which.id == 'save1'){
    obj = document.getElementById("save1");
    target = document.getElementById("result1");
  }else if(which.id == 'save2'){
    obj = document.getElementById("save2");
    target = document.getElementById("result2");
  }else if(which.id == 'save3'){
    obj = document.getElementById("save3");
    target = document.getElementById("result3");
  }
  var val = obj.options[obj.selectedIndex].value;   //获得option的值，以决定下载任务的后缀
  var csvData = target.value;   //获得textarea内的值
  csvData = 'data:application;charset=utf-8,' + csvData;
  //设置<a>的属性
  a.setAttribute('href',csvData);
  a.setAttribute('target','_blank');
  if(val == ''){
    return;
  }
  else if(val == 'txt'){
    a.setAttribute('download','result.txt');
  }else if(val == 'doc'){
    a.setAttribute('download','result.doc');
  }else if(val == 'docx'){
    a.setAttribute('download','result.docx');
  }else if(val == 'html'){
    a.setAttribute('download','result.html');
  }else if(val == 'pdf'){
    pdf(target);
    obj.options[0].selected=true;
    return;
  }
  //下载任务开始
  triggerClick(a);
  //将select初始值设为空
  obj.options[0].selected=true;
  return;
}
