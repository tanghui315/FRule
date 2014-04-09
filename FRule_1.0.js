(function($){
    
var FRule=(function(self){
    //检查
    self.checkFromeRule=function(){
           if($('form').attr('FromeRule'))
           return true;
           else
           return false;
    };
    var fr=this;
    //默认配置
    fr.option={
         rgArr:[{reTagName:'email',regEStr:'^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)?$',errTip:'邮箱格式不对'},
                {reTagName:'zipcode',regEStr:'^([1-9]\d{5})?$',errTip:'邮政编码格式不对'},
                {reTagName:'telphone',regEStr:'^((\d{3}(-)?|\d{4}(-)?)?(\d{8}|\d{7})?)?$',errTip:'座机号码格式不对'},
                {reTagName:'phone',regEStr:'^(((\(\d{2,3}\))|(\d{3}\-))?1\d{10})?$',errTip:'手机号码格式不对'},
                {reTagName:'url',regEStr:'^(http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)?$',errTip:'网络地址不正确'},
                {reTagName:'number',regEStr:'^\d*$',errTip:'必须为数字'},
                {reTagName:'chinese',regEStr:'^[\u0391-\uFFE5]*$',errTip:'必须为中文'},
                {reTagName:'english',regEStr:'^[a-zA-Z]*$',errTip:'必须为英文'},
                {reTagName:'string',regEStr:'^[a-zA-Z0-9_]*$',errTip:'必须为字符串'},
                {reTagName:'double',regEStr:'^([-\+]?\d+(\.\d+)?)?$',errTip:'必须为浮点数'}],
         vModel:1,   // 1表示默认模式， 0表示错误结果存到数组
         isAsterisk:true,  //true表示默认给不为空的表单加*
         isShowErrTip:true,
         isShowInfoTip:true,
         tipXOffset:-20,
         tipYOffset:20
    };
   //错误数组
   self.errArr=[];
   //获取配置
   self.getConfig=function(sl,arg){
      return $(sl).attr(arg);
   };
   
   
   //初始启动  option 配置 ，可传递修改
   self.init=function(options||{}){
      fr.option = $.extend(fr.option,options);
      
   }
   //表单验证
   self.formVerify={
         //规则是否通过
         ruleAssign:function(obj){
            var regExp=obj.attr('RegExp');
            var RETag=obj.attr('RETag');
            var t=this;
            if(regExp != undefined)
            {
                return t.validate(obj,regExp);
            }else if(RETag != undefined){
                
                var ispass=true;
                $.each( fr.option.rgArr, function(i, reObj){ 
                        if(RETag==reObj.reTagName)
                        {
                             ispass=t.validate(obj,reObj);
                             return;
                        }
                 });
                return ispass;
            }
         },
         //验证
         validate:function(obj,reObj){
            var reg = new RegExp(reObj.regEStr);
            var objValue = obj.attr("value");
            if(!reg.test(objValue)){
                if(fr.option.vModel==1)
                {
                    this.errorStyleAdd(obj);
                    this.showOneErrTipAdd(obj,reObj);
                    obj.focus();
                }else{
                    errArr[reObj.reTagName]={errStr:reObj.errTip,targetObj:obj};
                }
                return false;
            }else{
                 this.showOneErrTipRemove(obj);
                 this.errorStyleDel(obj);
                 return true;
            }
         },
         //表单悬停定提示
         inputHover:function(){
            var t=this;
            if(!fr.option.isShowInfoTip)
            return;
         
            $("input,select,textarea").hover(function(e){
                   var tip=$(this).attr('tip');
                   if(tip != undefined)
                   {
                      	var top = (e.pageY + fr.option.tipYOffset);
			           	var left = (e.pageX + fr.option.tipXOffset);
                        $('body').append( '<p id="vtip">' + tip + '</p>' );
				        $('p#vtip').css("top", top+"px").css("left", left+"px");
                   }
            },
          	function() {
			if($(this).attr('tip') != undefined){
				$("p#vtip").remove();
			 }
		    }).mousemove(
		      function(e) {
			   if($(this).attr('tip') != undefined){
				  var top = (e.pageY + fr.option.tipYOffset);
			    	var left = (e.pageX + fr.option.tipXOffset);
				   $("p#vtip").css("top", top+"px").css("left", left+"px");
		     	}
		     }
	       ).blur(function(){ 
	            
                t.ruleAssign($(this));
	       });
         },
         //控制提交处理
         controlSubmit:function(){
            
         },
         //错误样式添加处理
         errorStyleAdd:function(obj)
         {
           if(obj.get(0).tagName == "SELECT"){
             obj.css({"color":"red"});
		   }else{
		    	obj.css({"border":"1px solid #FF0000 !important"});
	       }
         },
         //错误样式删除
         errorStyleDel:function(obj)
         {
               obj.removeAttr("style");
         },
         //单显错误内容 添加
         showOneErrTipAdd:function(obj,reObj){
          if(!fr.option.isShowErrTip)
          return;
          var errTextBox=obj.nextAll('[ErrTip]');
          if(errTextBox.length>0)
          {
             errTextBox.get(0).text(reObj.errTip); 
             errTextBox.get(0).show();
          }  
         },
         //单显错误内容 移除
         showOneErrTipRemove:function(obj){
            if(!fr.option.isShowErrTip)
            return;
            var errTextBox=obj.nextAll('[ErrTip]');
            if(errTextBox.length>0)
            {
                 errTextBox.get(0).text('');
                 errTextBox.get(0).hide();
            }
         }
   };
   
  
   return self; 
     
})(FRule || {})


})(jQuery);