var domain = location.host

if( domain.indexOf('suning.com')>=0 ) {
  window.suning()
} else if( domain.indexOf('tmall.com') >=0 ) {
  window.tmall()
}




// ------------------------ 天猫 ---------------------------
function tmall() {
	console.log('天猫平台')
	//定时器
	var timer = null;

	//检测状态
	function checkElementState(path,callback){
		var ele = document.querySelector(path);
		if(ele){
			callback && callback();
		}else{
			console.log('异步加载元素中....' + path );
			setTimeout( function(){checkElementState(path,callback);},200);
		}
	}



	//点击购买按钮
	function clickBuy(){
		
		console.log('买！');
		
		//票的数量  如果还不可以购买，这个地方获取会失败 
		var amount = document.getElementsByClassName('mui-amount-increase')[0];
		amount && amount.click();  //+1
		
		var btnBuy = document.querySelector('');
		
	}


	//结算
	function checkOut(){
		
		
		console.log('结算开始....');
		var btn = document.getElementById('J_Go');
		
		if(btn){
			btn.click();
		}else{
			console.log('结算按钮没找到');
		}
		
	}

	function checkOutAsync(){
		checkElementState('#J_Go',checkOut);
	}

	//提交订单
	function submitOrder(){
		
		console.log('提交订单开始....');
		
		
		
		checkElementState('.go-btn',function(){
			var btn = document.querySelector(".go-btn");
		
			if(btn){
				btn.click();
			}else{
				console.log('提交订单按钮没找到');
			}
				
		});
	}



	//目标时间
		var dDate = new Date();  //10点和20点开抢
		if( dDate.getHours() < 10 ){
			dDate.setHours(9,59,59.2);
		}else{
			dDate.setHours(19,59,59.2);
		}
		
		//dDate.setSeconds( dDate.getSeconds() + 10 );
		
	//进入时间判断循环
	function enterTimeCheckLoop(callback){
		var date = new Date();
		
		
		
		
		var diff = Date.parse(dDate) - Date.parse(date) ;
		
		console.log(diff);
		
		if(diff < - 900 ){
			
			console.log('时间过了！');
			
		}else if(diff < 500 ) {

			callback && callback();
			
			console.log('时间到了！！！');
			
		}else{
			setTimeout(function(){ enterTimeCheckLoop(callback);},400);
			
			//console.log('--');
		}
		
		
		
	}


	//主要函数
	function main(){
		console.log('############################开始抢购茅台############################');
		
		//debugger;
		
		var href = window.location.href;
		if(href.indexOf('cart.tmall.com') > -1 ){
			//结算页面
			
			//进入时间判断
			enterTimeCheckLoop( checkOutAsync );
		
		
		}else if(href.indexOf('buy.tmall.com') > -1 ){
			//提交订单页面
			
			submitOrder();
		}
		
	}


	main()
}



// ------------------------苏宁---------------------------
function suning(){
  console.log('苏宁平台')
  //定时器
  var timer = null;

  //目标时间
  var targetDate = new Date();  //10点和20点开抢
  if( targetDate.getHours() < 10 ){
    targetDate.setHours(9,59,59.2);
  }else{
    // targetDate.setHours(19,59,59.2);
    targetDate.setHours(11,54,30.2);
  }
  //targetDate.setSeconds( targetDate.getSeconds() + 10 );

  // 天猫刷新
  function refreshPage(time) {
    setTimeout( function(){
      var targetTime = new Date(time).getTime()
      if(new Date().getTime() >= targetTime){
        console.log('即将刷新')
        location.reload()
      }else if(!document.querySelector('.go-btn')){
        console.log('时间没到')
        refreshPage(time)
      }else{
        console.log('时间没到')
        refreshPage(time)
      }
    },100)
  }
  // refreshPage('2021-01-09 19:59:59')

  //检测状态
  function isCanBuy() {
    var buyBtn = document.querySelector('#buyNowAddCart')
    return buyBtn.style.display !== 'none' 
  }

  // 轮询检查
  function checkElementState(isCanBuy, callback){
    if(isCanBuy()){
      callback && callback();
    }else{
      console.log('循环检测是否可购买....');
      setTimeout( function(){checkElementState(isCanBuy,callback);},200);
    }
  }

  function clickBtn(domName) {
    var dom = document.querySelector(domName)
    dom && dom.click()
  }

  // 立即购买
  function clickBuy(){
    clickBtn('#buyNowAddCart')
    // todo 扩展可增加数量
  }

  // 提交订单
  function submitOrder() {
    clickBtn('#submit-btn')
  }


  /** 进入时间判断循环 
   * @param {number} timeout 超时10s就不再做任何行为了
  */
  function enterTimeCheckLoop(callback, loopTime=400, timeout=10000){
    var date = new Date();
    var diff = targetDate.getTime() - date.getTime();
    console.log('是否接近抢购时间', diff/1000);
    if(diff < -timeout ){
      console.log('sorry！时间过了');
    }else if(diff < 500 ) {
      callback && callback();
      console.log('时间到了！！！');
    }else{
      setTimeout(function(){ enterTimeCheckLoop(callback);},loopTime);
    }
  }



  function main() {
    console.log('############################ 开始抢购茅台 ############################');
    var url = location.host
    if(!url) {
      console.log('域名为空, 不做任何操作')
    }else if(url.indexOf('product.suning.com')>=0){
      // 购买页面
      console.log('购买页面')
      enterTimeCheckLoop(function(){
        checkElementState(isCanBuy, clickBuy)
      })
    }else if(url.indexOf('shopping.suning.com') >=0){
      // 提交订单
      console.log('提交订单页面')
      submitOrder()
    }else if(url.indexOf('payment.suning.com')>=0) {
      // 支付页面
      console.log('支付页面')
    }
  }
  
  main()
}