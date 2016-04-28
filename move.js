  function startMove(obj,json,duration,fn){
    clearInterval(obj.timer);	    
   	obj.timer = setInterval(function(){
   	  var flag = true;//设立标杆
   	  for(var attr in json){

   	   //取当前值
   	  var icurrentattr=0;
   	    if(attr == 'opacity'){
          icurrentattr=Math.round(parseFloat(getStyle(obj,attr))*100);
   	    }
   	    else{
   	      icurrentattr=parseInt(getStyle(obj,attr));
        }
        //计算速度
   	  var speed =(json[attr] - icurrentattr)/8;
      speed=speed >0 ?Math.ceil(speed):Math.floor(speed);
      //检测停止
   	  if(icurrentattr != json[attr]){
   	  	  flag = false;
   	    }
   	  if (attr == 'opacity'){
            obj.style.filter = 'alpha(opacity:'+(icurrentattr+speed)+')';//IE
            obj.style.opacity = (icurrentattr+speed)/100 ;//firefox/chrome
   	  	 }
   	  else{
   	  	    obj.style[attr]=icurrentattr+speed+'px';
   	      }
   	  
   	 }
   	 if(flag){
   	  clearInterval(obj.timer);
   	  if(fn){
   	  	fn();//链式运动
   	  	}
   	  }	
   	},duration);
   }
   function getStyle(obj,attr){  
     if(obj.currentStyle){
     	return obj.currentStyle[attr];   //IE6浏览器 不标准
     }
     else{
     	return window.getComputedStyle(obj,null)[attr]; // firefox等现代浏览器
     }
   }