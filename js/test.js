function fileChange(target){
    var name = target.value;
    var filename = name.substring(name.lastIndexOf(".")+1).toLLowerCase();
    if( fileName != "txt"){
        alert("Please upload .txt file");
        target.value="";
        return
    }
}
