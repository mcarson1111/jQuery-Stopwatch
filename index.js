// constructor when function is started with a capital letter
// new StopWatch, somewhere will say this
// requires a container parameter
function StopWatch(callback) {
  // stopwatch starts at 0
  this._time = 0
  // dont have an interval when you start. interval object, interval event
  // everytime you click start right now, you start a new interval..this is a bug...we just fixed it on line 20 and 27.
  this._interval = null
  this._delay = 10
  this._callback = callback

  // set timeout(does one and its done) and setinterval(will repeat til you tell it to stop firing its callback)...if intervals can be started it can also be stopped, when you start one, it returns an id and you can use that id to stop it later...so we set it as a variale to hold on to.
  // can start the stop watch...this could also be a prototype which would let you share this with other objects
  // first parameter is what should happen and the second is when it should happen
  // every JS object knows about bind, binds the context to the function, you are controlling the scope. so setInterval would normally always execute its action in the global space, but binding it executes it in my local scope
  // when the click goes into the API it loses its context, then goes into the queue and then the stack; the global context doesnt know anything about our stopwatch. so we bind it to our stopwatch at this moment. the this is fixed, immutable.
  // this is our instance of stopwatch, when you execute add time, execute it with our instance of stopwatch
  this.start = function() { //starts the watch
    if (this._interval) {return}
    //only start an interval if we dont already have one running
    this._interval = setInterval(this.addTime.bind(this), this._delay)
  }
  // bind is controlling the context

  // you can stop the stopwatch
  this.stop = function() { //stops the watch
    clearInterval(this._interval)
    //reset the _interval variable so we know to start a new one later
    this._interval = null
  }

  this.reset = function() { //resets the watch
   this._time = 0
   this._callback(this._time)

  }

  this.addTime = function() { //adds time to the counter
    // console.log(this) see comments above.
    this._time += this._delay
    this._callback(this._time)
    // we can also use a closure here(below) (this is a closure bc it has a dependency on something it ddint define..here it has a dependency on callback but it gets it from its parent), so for this to work it has to keep track of callback all the time.
    // callback(this._time) see comment above

  }

}


// this is all the jquery stuffs...its so deeply connected to the DOM so its harder to test...but it is nicely isolated, so yay
// this is where we create the connection between JS and our DOM ( the visible web page...so its this responsibility to show the stop watch stuffs)
$(document).ready(function() {
  console.log("Yay! Hi!")

  var container1 = $('#sw1')
  var display1 = container1.children('.display')
  // gets the children of the object, specifically the display
  // using css style selector and getting nodes that have the class display
  var buttons1 = container1.children('button.stopWatch')
  // get al the children which are buttons of the class stopWatch
  // console.log(display, buttons)
  var stopWatch1 = new StopWatch(function (newTime) {
    // recieves an arguement called newTime
    //update the display:
    display1.text(msToTime(newTime))
    // uses the display variable, calls jquery text method and assigns its text to be the newTime
  })
  // console.log(container)

  buttons1.on('click', function (event) {
    event.preventDefault()
    // lots of things html have interaction built in, ( behvaiors buit into the   browser, normalize normally), however sometimes you dont like those   behaviors ( dont want link to open right away or form submitted ight away,  so you can prevent the default action from happening). its good practce to  prevent the default. Dont do what you want to do with this button, do what  im telling you to do instead.

    console.log('you clicked me!')

    // which button did i click?
    var button = $(this)
    if (button.hasClass('start')) { //start the stopWatch!
      console.log('start the watch!')
      stopWatch1.start()
    } else if (button.hasClass('stop')) { //stop the stopWatch!
      console.log('stop the watch!')
      stopWatch1.stop()
    } else if (button.hasClass('reset')){ //reset the stopWatch!
      console.log('reset the watch!')
      stopWatch1.stop()
      stopWatch1.reset()
    }
  })

  var container2 = $('#sw2')
  var display2 = container2.children('.display')
  var buttons2 = container2.children('button.stopWatch')
  var stopWatch2 = new StopWatch(function (newTime) {

    display2.text(msToTime(newTime))

  })

  buttons2.on('click', function (event) {
    event.preventDefault()
    console.log('you clicked me!')

    var button = $(this)
    if (button.hasClass('start')) { //start the stopWatch!
      console.log('start the watch!')
      stopWatch2.start()
    } else if (button.hasClass('stop')) { //stop the stopWatch!
      console.log('stop the watch!')
      stopWatch2.stop()
    } else if (button.hasClass('reset')){ //reset the stopWatch!
      console.log('reset the watch!')
      stopWatch2.stop()
      stopWatch2.reset()
    }
  })






    function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
    // this is the element we clicked, the raw element
    // get a jquery object for the thing you clicked
   // what should i do in response?

    // console.log(this)
    // the this in an event is the obect you interacted with (the start button). it'll set the context of this to the object you interacted with.

    // console.log(event)
    // an event object js object wiht all the info about the event, when, what,  where, the object it interacted with, other things that can hapen, etc. we can use this info to make stuff happen. if during the time clicking if holding down the control key, maybe click on part on the button and can make compound buttons where diff things happen depending where on the button they click.
  // this takes a call back bc its asynchronis bc we dont know when or if  someone is going to click those buttons. We call these observers or listeners. We respond with this callback.
})
