/*var quotes = ["INTELLISOURCE CONSOLE (2671-C)<br>",
  "THIS COMPUTER IS NETWORKED: 2C<br>",
  "**************<br>",
  "<br>",
  "BASE:&gt;&gt; udir B:\\grid_ops<br>",
  "&nbsp;&nbsp;&nbsp;&nbsp;Directory of B:\\unidos_ops<br>",
  "<br>",
  "+ &lt;DIR&gt; vantage_port<br>",
  "- &lt;DIR&gt; marid_port<br>",
  "&nbsp;&nbsp;&gt; mbFile.f<br>",
  "&nbsp;&nbsp;&gt; intelisource.f<br>",
  "+ &lt;DIR&gt; rogues_port<br>",
  "<br>",
  "BASE:&gt;&gt; run B:\\grid_ops\\mbFile.f<br>",
  "WARNING !!! TOP SECRET !!!<br>",
  "<br>"];*/

var quotes = ["OPS CONSOLE (2671-C)<br>",
"******************************<br>",
"* THIS IS A SECURE SYSTEM.   *<br>",
"* ALL OPERATIONS ARE LOGGED. *<br>",
"******************************<br>",
"<br>" ,
"USERNAME: rafikh<br>",
"LOGIN1: ****************<br>",
"LOGIN2: KEYID.....ACCEPT<br>",
"LOGIN3: FACEID....ACCEPT<br>",
"<br>" ,
"[rafikh@2671-C:~]$ sudo opscloak<br>",
"Password: ****************<br>",
"[DHUL_AQ@2671-C:~]$ cd ~/gridops<br>",
"[DHUL_AQ@2671-C:~]$ ssh cim_asset_134422 exploit_A<br>",
"[XXXXXX@[REDACT]:~]# cd /operations<br>",
"[XXXXXX@[REDACT]:~]# ls<br>",
"/exploit<br>",
"/academic<br>",
"/philosophy<br>",
"/anxiety<br>",
"useful.txt<br>",
"[XXXXXX@[REDACT]:/operations]# cat useful.txt<br>",
"He was free, free in every way, free to behave like a fool or a machine,<br>",
"free to accept, free to refuse, free to equivocate; to marry, to give up the game,<br>",
"to drag this death weight about with him for years to come. He could do what he liked,<br>",
"no one had the right to advise him, there would be for him no Good or Evil<br>",
"unless he thought them into being.<br>",
"[XXXXXX@[REDACT]:/operations]# scp * !/dump<br>",
"<br>" ,
"... Secure Copy operation initiated;<br>",
"... Complete!<br>",
"<br>" ,
"[XXXXXX@[REDACT]:/operations]# scan tun0<br>",
"/DIRECTIVE_port 0 - A3334411<br>",
"/vantage_port 1 - A9888533<br>",
"/marid_port 2 - A442998<br>",
"/rogue_port 3 - A778934<br>",
"[XXXXXX@[REDACT]:/operations]# run !/gridops/mbexploit_A<br>",
"<br>" ,
"... Performing /mail operations (144/144);<br>",
"... ACK-ACK received (144/144)<br>",
"... Complete!<br>",
"<br>" ,
"[XXXXXX@[REDACT]:/operations]# rm -rf * --nopreserve-root<br>",
"[XXXXXX@[REDACT]:/operations]# exit<br>",
"<br>",
"<br>"];

var numberOfLines = 0;
var lineNumber = 0;

var maxNumberOfLines = 13;

$(document).ready(function() {

  // Detects browser; only runs certain scripts on desktop browsers.
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    maxNumberOfLines = 10;
  }
  else {
    $('.parallax_s1').parallax("50%", 0.1, true);
    $('.parallax_s2').parallax("50%", 0.2, true);
    $('.parallax_s3').parallax("50%", 0.3, true);
    $('.parallax_s4').parallax("50%", 0.4, true);
    $('.parallax_s5').parallax("50%", 0.5, true);
    $('.parallax_s6').parallax("50%", 0.6, true);
    $('.parallax_s7').parallax("50%", 0.7, true);
    $('.parallax_s8').parallax("50%", 0.8, true);

    $('.parallax_ns4_dossier').parallax("40%", 0.4, true);

    $('.parallax_ns1').parallax("50%", -0.1, true);
    $('.parallax_ns2').parallax("50%", -0.2, true);
    $('.parallax_ns3').parallax("50%", -0.3, true);
    $('.parallax_ns4').parallax("50%", -0.4, true);
    $('.parallax_ns5').parallax("50%", -0.5, true);
    $('.parallax_ns6').parallax("50%", -0.6, true);
    $('.parallax_ns7').parallax("50%", -0.7, true);
    $('.parallax_ns8').parallax("50%", -0.8, true);

  }

  quoteShuffle();

});

function quoteShuffle(){

  if (numberOfLines > maxNumberOfLines) {
    $('#quoteShuffle').find('div').first().remove();
  }
  else {
    numberOfLines++;
  }

  if (lineNumber < 48){
    $('#quoteShuffle').append('<div style="pointer-events: none; overflow-anchor: none;">' + quotes[lineNumber++] + '</div>');
  }
  else {
    lineNumber = 0;
    $('#quoteShuffle').append('<div style="pointer-events: none; overflow-anchor: none;">' + quotes[lineNumber++] + '</div>');
  }

  setTimeout(function() { quoteShuffle(); }, Math.floor(Math.random() * 300));

}

(function($) {
    var firstTops = {};
    var items = [];
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function() {
      windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight, full) {
      var $this = $(this);

      var getHeight;
      var firstTop;
      var paddingTop = 0;

      //get the starting position of each element to have parallax applied to it
      $this.each(function() {
        firstTops[$this] = $this.offset().top;
        items.push($this);
      });

      if (outerHeight) {
        getHeight = function(jqo) {
          return jqo.outerHeight(true);
        };
      } else {
        getHeight = function(jqo) {
          return jqo.height();
        };
      }

      // setup defaults if arguments aren't specified
      if (arguments.length < 1 || xpos === null) xpos = "50%";
      if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
      if (arguments.length < 3 || outerHeight === null) outerHeight = true;
      if (arguments.length < 3 || full === null) full= 'full';

      // function to be called whenever the window is scrolled or resized
      function update() {
        var pos = $window.scrollTop();

        $this.each(function() {
          var $element = $(this);
          var top = $element.offset().top;
          //var top = items[i].offset().top;
          var height = getHeight($element);

          // Check if totally above or totally below viewport
          if (top + height < pos || top > pos + windowHeight) {
            return;
          }

          if (full != 'full') {
            $element.css('backgroundPosition', xpos + " " + Math.round((top - pos) * speedFactor) + "px");
          }
          else {
            $element.css('margin-top', 0 - Math.round((top - pos) * speedFactor) + "px");
          }
        });
      }

      $window.bind('scroll', update).resize(update);
      update();
    };
})(jQuery);
