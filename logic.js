/**
 * Created by sophia on 5/15/17.
 */
document.addEventListener("DOMContentLoaded", function () {

// FIXED NAV
  const navPane = document.querySelector('nav');
  //define location of nav (y-coord) on page load. otherwise, once position is fixed the y-coord will be 0, as defined in CSS
  //afterwards, the else stmt of the fixNav function will not be reached afterwards
  const navTop = navPane.offsetTop;

  function fixNav() {
    console.log(navPane.offsetTop, window.scrollY);
    if (window.scrollY >= navTop) {
      //once nav becomes 'fixed', the element becomes positioned relative to browser window (viewport),
      //thus losing any space it takes up otherwise
      //therefore, we must offset by the amount of space it used to take, aka reflow the page
      document.body.style.paddingTop = navPane.offsetHeight + 'px';
      document.body.classList.add('fixed');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', fixNav);
//--------------------END


// IMAGE SLIDE IN
  //debounce function helps to optimize performance of scroll event as it limits how often the event handler is run
  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      //allows func arg to be called in proper context
      var context = this,
        //combines all arguments passed into func
        args = arguments;
      //function to be passed in as the first arg of the setTimeOut function
      var later = function() {
        //removes numeric ID that is assigned during the setTimeOut function
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  //cannot select 'img' elements because offset properties return based on parent element (which we want to be img tag)
  const images = document.querySelectorAll('.slide-in');

  function slideImage() {
    images.forEach(image => {
      //when half the image is within the screen (in terms of pixels)
      const slideIn = (window.scrollY + window.innerHeight) - image.height / 2;
      //bottom of image in pixels
      const bottomOfImage = image.offsetTop + image.height;
      //when the px of image is greater than those of the top of the image
      const halfImageDisplayed = slideIn > image.offsetTop;
      //when px of bottom of image is not less than px currently scrolled from top
      const notScrolledPastImage = bottomOfImage > window.scrollY;
      if (halfImageDisplayed && notScrolledPastImage) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', debounce(slideImage));

});