window.onload = function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":'images/3.jpg'},{"src":'images/1.jpg'},{"src":'images/2.jpg'}]};//模拟的数据
	window.onscroll = function(){
		if(checkScrollSlide){//加载数据
			var oParent = document.getElementById('main');
           for(var i=0;i<dataInt.data.length;i++){
           	 var oImg = document.createElement('img');
           	 oImg.src = dataInt.data[i].src;
           	 var oPic = document.createElement('div');
           	 oPic.className = 'pic'; 
           	 oPic.appendChild(oImg);
           	 var oBox = document.createElement('div');
           	 oBox.className = 'box';
           	 oBox.appendChild(oPic);
           	 oParent.appendChild(oBox);
           } 
           waterfall('main','box');
		}
	}
}

function waterfall(parentid,childcls){
  var oParent = document.getElementById(parentid);
  var oBoxs = getByClass(oParent,childcls);
  //计算显示的列数
  var oBoxw = oBoxs[0].offsetWidth;
  //页面宽/盒子宽
  var cols = Math.floor((document.documentElement.clientWidth || document.body.clientWidth)/oBoxw);
  //设置main的宽以及居中
  oParent.style.cssText = 'width:'+oBoxw*cols+'px;margin:0 auto;';
  var hArr = [];
  for(var i=0;i<oBoxs.length;i++){
  	if(i<cols){
  		hArr.push(oBoxs[i].offsetHeight);//存储盒子高度
  	}
  	else{
       var minH = Math.min.apply(null,hArr);
       var index = getMinhIndex(hArr,minH);
       oBoxs[i].style.position = 'absolute';
       oBoxs[i].style.top = minH +'px';
       //oBoxs[i].style.left = oBoxw * index +'px';
       oBoxs[i].style.left = oBoxs[index].offsetLeft +'px';
       hArr[index]+=oBoxs[i].offsetHeight;
  	}
  }
}
//根据class获取元素
function getByClass(parent,clsName){
 var boxArr = [],
 oElements = parent.getElementsByTagName('*') ;
   for(var i = 0, len = oElements.length;i<len;i++){
   	   if(oElements[i].className == clsName){
   	   	  boxArr.push(oElements[i]);
   	   }
   }
   return boxArr;
}
function getMinhIndex(arr,min){
	for(var i in arr){
		if(arr[i] == min) return i;
	}
}
//检测是否具备滚动加载数据条件
function checkScrollSlide(){
  var oParent = document.getElementById('main'),
     oBoxs = getByClass(oParent,'box'),
     lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2),
     scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
     height = document.body.clientHeight || document.documentElement.clientHeight;
     return (lastBoxH<scrollTop+height)?true:false;
}