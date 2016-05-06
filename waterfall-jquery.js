$(window).on('load',function(){
	waterfall();
	var dataInt={"data":[{"src":'images/3.jpg'},{"src":'images/1.jpg'},{"src":'images/2.jpg'}]};//模拟的数据
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(index,value){
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				
				
                 $('<img>').attr('src',value.src).appendTo($(oPic));

				//$('<img>').attr('src',$(value).attr('src'));
			})
			waterfall();
		}
	})
})
function waterfall(){
	var $boxs = $('#main>div'),
	w = $boxs.eq(0).outerWidth()
	 cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr =[];
	$boxs.each(function(index,value){
		if(index < cols){
			var h=$boxs.eq(index).outerHeight();
             hArr.push(h);
		}
		else{
			var minH=Math.min.apply(null,hArr),
			 minHIndex = $.inArray(minH,hArr);
			 $(value).css({
			 	'position':'absolute',
			 	'top':minH+'px',
			 	'left':minHIndex*w+'px'
			 });
			 hArr[minHIndex]+= $boxs.eq(index).outerHeight();
		}
	})
}
function checkScrollSlide(){
	var $lastbox = $('#main>div').last();
	var H=$lastbox.offset().top+Math.floor($lastbox.outerHeight()/2);
	var scroll=$(window).scrollTop();
	var h=$(window).height;
	return (H<scrollTop+h)?true:false;
}