onload = function() {
  document.getElementById('second').addEventListener('click', function() {
    // document.documentElement is working fine on chome, but not on safari
    // document.body is working on safari but not on chrome
    scrollGo(document.getElementById('aboutus').offsetTop, 1250);
  });

  document.getElementById('first').addEventListener('click', function() {
    //scrollTo(document.documentElement, document.getElementById('welcome').offsetTop, 1250);
    scrollGo(document.getElementById('home').offsetTop, 1250);
  });
}

function scrollGo(to, duration) {
  const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  console.log('scrollTop ' + scrollTop);

    var start = scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function(){
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        // console.log('scrollTo ' + val);
        // element.scrollTop = val;
        window.scrollTo(0, val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();

}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
