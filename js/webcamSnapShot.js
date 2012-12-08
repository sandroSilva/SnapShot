var streamVideo;
var c;
var ctx;
$(document).ready(function()
	{
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL;
		streamVideo = document.getElementById('monitor');
		c = document.getElementById('canvasCamera');
		c.width = 280;
		c.height = 210;
		ctx = c.getContext('2d');
		$("button#capture").click(function()
				{
					init(this);
				});		
		$("button#snapshot").click(function()
				{
					snapshot();
				});		
		$("button#enviarImg").click(function()
				{
					 enviar();
				});		
	 });
function gotStream(stream)
	{
		if (window.URL) 
			{
				streamVideo.src = window.URL.createObjectURL(stream);
			} 
		else 
			{
				streamVideo.src = stream; 
			}
	
		streamVideo.onerror = function(e) 
			{
				stream.stop();
			};
	
		stream.onended = noStream;
	
		streamVideo.onloadedmetadata = function(e) 
			{
			};
	}
function init(el) 
	{
		if (!navigator.getUserMedia) 
			{
				document.getElementById("errorMessage").innerHTML = "Navegador do usuário não permite acesso à webcam.";
				return;
			}
		navigator.getUserMedia({video: true}, gotStream, noStream);
	}
function noStream(e) 
	{
		var msg = "Usuário não possui webcam.";
			
		if (e.code == 1) 
			{
				msg = "Usuário não permitiu acesso à webcam.";
			}
		document.getElementById("errorMessage").textContent = msg;
	}
function snapshot() 
	{
		ctx.drawImage(streamVideo, 0, 0, c.width, c.height);
	}
function enviar() 
	{
		window.open(c.toDataURL("image/png"));
	}	