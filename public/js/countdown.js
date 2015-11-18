$(document).ready(function() {


    /* ========== COUNTDOWN ========== */
    var tillDate = new Date();

    tillDate = new Date(tillDate.getFullYear() + 1, 1 - 1, 1);
    // new Date(year, mth - 1, day, hr, min, sec) - date/time to count down to
    // or numeric for seconds offset, or string for unit offset(s):
    // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds

    $('.countdown').countdown({

        labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
        // The expanded texts for the counters

        labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
        // The display texts for the counters if only one

        until: tillDate,

        timezone: null,
        // The timezone (hours or minutes from GMT) for the target times,
        // or null for client local

        format: 'ydHMS', // Format for display - upper case for always, lower case only if non-zero,
        // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
        layout:
        // Build your own layout for the countdown
            '{y<}<li>{yn}<span>{yl}</span></li>{y>}'         // Years
                + '{d<}<li>{dn}<span>{dl}</span></li>{d>}'       // Days
                + '{h<}<li>{hn}<span>{hl}</span></li>{h>}'       // Hours
                + '{m<}<li>{mn}<span>{ml}</span></li>{m>}'       // Minutes
                + '{s<}<li>{sn}<span>{sl}</span></li>{s>}',      // Seconds


        tickInterval: 10 // Interval (seconds) between onTick callbacks
    });
});