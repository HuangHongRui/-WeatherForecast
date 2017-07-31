//天气 Api 获取天气
var cityId = ""
var Boss = function(){$.get('http://api.jirengu.com/weather.php',{city:cityId})
    .done(function(datas){
      $('.cearchCity >input').keydown(function(e) {  
        var key = e.which
        if(key == 13) {
          cityId = $(this).val()
          Boss()
        }
      })
      var datas = JSON.parse(datas)
      if (datas.error === 0 && datas.status === 'success') {
        bianliWeather(datas)
      } else {
        alert('Sorry.加载失败.')
      }
    }).fail(function() {
      alert('Sorry.服务器炸了.')
    })
}
Boss()

$(function(){
  var hours = new Date().getHours()
  if ( 18 >= hours && hours >= 6 ) {
    $('.bgPic>img').attr('src','images/z-day.jpeg')
  } else {                        
    $('.bgPic>img').attr('src','images/z-night.jpg')
  }
})

$('#btn >.btnShow').on('click', function(){
  $('.recommend >ul').toggle('showOrHide')
  $('.weeked >ul >li.one ').fadeOut()
  $("#btn >.btnShow").mouseout(function() { 
    window.setTimeout(function() { 
      $(".recommend >ul").fadeOut("slow"); 
      $('.weeked >ul >li.one ').show("fast")
    },2000);
  });
})

function bianliWeather(transmitData){
  var results = transmitData.results[0];
  var weatherIndex = results.index;
  var weatherDay = results.weather_data;

  $(results).each(function(){
    var city = this.currentCity
    var pm = this.pm25
    var citypm = "";
    citypm += '<span class="city">'+ city +'</span><br/>';
    citypm += '<span class="pm iconfont icon-fmpm"> ' + pm +'</span>'
    $('.bgPic >.citypm').html(citypm)
  })

  $.each(results.weather_data,function(i,obj){        //遍历   !!####!!
    var nowDate = this.date.split(' ');//切
    var a = nowDate[0]
    degree = nowDate[2]

    var htmls = '';
    htmls += '<span class="date">'+ '星期' +nowDate[0][1] +'</span><br/>';
    htmls += '<span class="temperature">' + this.temperature + '</span><br/>';
    htmls += '<span class="weather">' + this.weather + '</span><br/>';
    htmls += '<span class="wind">' + this.wind + '</span></br/>';
    htmls += '<img class="morning" src="' + this.dayPictureUrl + '">'
    htmls += '<img class="night" src="' + this. nightPictureUrl + '">'
    // htmls += '<span class="degree" >'+ degree +'</span>';         
    $('.weeked>ul>li').eq(i).html(htmls)
  })
  $.each(results.index,function(i,boj){
    var idxHtmls = '';
    idxHtmls += '<li class="tiptzs f '+ i +'\'">'+ this.tipt + " : " + this.zs + '</li>'
    idxHtmls += '<li class="titlede l '+ i +'\">' + this.title + " : " + this.des + '</li>'
    $('.recommend >ul >li').eq(i).html(idxHtmls)
  })   

  $(transmitData).each(function(){
    var addE = '<span class="yearmonth">' + this.date + '</span><br/>'
    a = addE + $('.weeked>ul>li.one >.temperature').eq(0).html()
    $('.weeked>ul>li.one >.temperature').eq(0).html(a)
  })

  // $('.weeked >ul >li.one >span.temperature').on('mouseover',function(){
  //     console.log(1)
  // })

}
