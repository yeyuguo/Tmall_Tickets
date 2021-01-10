window.suning = function(){
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