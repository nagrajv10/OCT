// // Set the date we're counting down to
// var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = days + "D: " + hours + "H: "
//   + minutes + "M: " + seconds + "S ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);



// No magic numbers...

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Calculates the difference between two timestamps, returns a quadruple with
 * the difference in days, hours, minutes and seconds.
 *
 * @param {number} future
 */
const timestampDiff =
    future =>
    /** @param {number} past */
    past =>
        [DAY, HOUR, MINUTE, SECOND].map((time, index, times) => {
            const diff = future - past;
            const previousTime = times[index - 1];

            return (
                Math.floor(diff / time) -
                (Math.floor(diff / previousTime) * (previousTime / time) || 0)
            );
        });

/**
 * Start timer and set the content of the element.
 *
 * @param {string} date
 */
const timer =
    date =>
    /** @param {HTMLElement} target */
    target => {
        const diff = timestampDiff(Date.parse(date));

        return setInterval(() => {
            const [days, hours, minutes, seconds] = diff(Date.now());

            // Ideally we should have targets for every element
            // to avoid updating the entire innerHTML of the container with
            // every tick.
            target.innerHTML = `
                <div>${days}<span>Days</span></div>
                <div>${hours}<span>Hours</span></div>
                <div>${minutes}<span>Minutes</span></div>
                <div>${seconds}<span>Seconds</span></div>
            `;
        }, SECOND);
    };

// We finally run it (and we save the interval return value if we wan to stop it later)
const interval = timer("OCT 1, 2022 01:30:00")(document.querySelector("#timer"));