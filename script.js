
// Radio stations
var stations = [
  {
    "title": "Ретро Хит",
    "stream": "http://air.volna.top/Retro"
  },
  {
    "title": "Европа Плюс",
    "stream": "http://78.111.244.206/euro32.mp3"
  },
  {
    "title": "NonStopPlay",
    "stream": "http://stream.nonstopplay.co.uk/nsp-128k-mp3"
  },
  {
    "title": "Radio Record",
    "stream": "http://air.radiorecord.ru:8101/rr_320"
  },
  {
    "title": "Jazz FM Legends",
    "stream": "http://jazz128legends.streamr.ru/"
  },
  {
    "title": "Trancemission",
    "stream": "http://air.radiorecord.ru:8102/tm_320"
  },
  {
    "title": "Дискотека 90-ых",
    "stream": "http://air.radiorecord.ru:8102/sd90_320 "
  },
  {
    "title": "Joy Radio",
    "stream": "http://airtime.joyradio.cc:8000/airtime_192.mp3"
  },
  {
    "title": "Fip Radio",
    "stream": "http://direct.fipradio.fr/live/fip-midfi.mp3"
  },
  {
    "title": "Dubstep",
    "stream": "http://air.radiorecord.ru:8102/dub_320"
  },
  {
    "title": "Страна FM",
    "stream": "http://icecast.stranafm.cdnvideo.ru/stranafm_128"
  },
  {
    "title": "Music Radio",
    "stream": "http://ice-the.musicradio.com/CapitalXTRANationalMP3"
  },
  {
    "title": "Classical Music",
    "stream": "http://stream.srg-ssr.ch/m/rsc_de/mp3_128"
  },
  {
    "title": "Live Icy",
    "stream": "http://live-icy.gss.dr.dk:8000/A/A05H.mp3"
  },
  {
    "title": "Старое Радио",
    "stream": "http://195.91.237.50:8000/music32"
  }
];

var backgrounds = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg',
  'images/10.jpg',
  'images/11.jpg',
  'images/12.jpg',
  'images/13.jpg',
  'images/14.jpg'
];

var app = {
  
  init: function () {
    // DOM elements
    this.$player = $('audio');
    this.$playControl = $('.play-control');
    this.$background = $('.background');
    this.$backgroundOverlay = $('.background-overlay');
    
    // Variables
    this.rotationInterval = 30000;
    
    // Functions
    this.registerPlayerHandlers();
    this.loadStations();
    this.initBackgroundChanger();
  },
  
  registerPlayerHandlers: function () {
    this.$playControl.on('click', function () {
			app.$playControl.removeClass('fa-pause fa-play');
      
      // Toggle play status
      if (app.$player[0].paused === true) {
        // Play the station
        app.$playControl.addClass('fa-play');
        app.$player[0].play();
      } else {
        // Pause the station
        app.$playControl.addClass('fa-pause');
        app.$player[0].pause();
      }
    });
  },
  
  loadStations: function () {
    $(stations).each(function(index, station) {
      
      // Set default favicon
      station.favicon = 'images/galaxy.png';
      
      // Append to station list
      var element = '<div id="station-' + index + '" class="station"><div class="station-icon" style="background-image: url(' + station.favicon + ');"></div><div class="station-title">' + station.title + '</div>';
      $('.container.stations').append(element);
    });
    
    // Load audio
    $('.station').on('click', function () {
      var $station = $(this);
      var stationId = $station.attr('id').replace('station-', '');
      var stationUrl = stations[stationId].stream;
      
      // Show selected station
      $station.addClass('station-selected');
      $station.siblings().removeClass('station-selected');
      
      // Add station url to audio player
      app.$player.attr('src', stationUrl);
      app.$playControl.removeClass('fa-pause').addClass('fa-play');
    });
  },
  
  initBackgroundChanger: function () {
    // Set the default backgrounds
    var index = Math.floor(Math.random() * backgrounds.length);
		app.$background.css('backgroundImage', 'url(' + backgrounds[index] + ')');
    app.$backgroundOverlay.css('backgroundImage', 'url(' + backgrounds[index] + ')');

    // Update the background image
    setInterval(function () {
      
      // Select a random background
      var index = Math.floor(Math.random() * backgrounds.length);
      
      app.$background.css('backgroundImage', 'url(' + backgrounds[index] + ')');
      
      // Transition the image
      app.$backgroundOverlay.fadeOut(5000, function () {
      	app.$backgroundOverlay.css('backgroundImage', 'url(' + backgrounds[index] + ')');
      	app.$backgroundOverlay.fadeIn(5000);
      });

    }, this.rotationInterval);
  }
  
};

$(window).load(function () {
  app.init();
})
