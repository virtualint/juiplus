<div id="subinfomenu">
	<div id="overlays">
						<a id="overlaynocolor" href="#">No Color Overlay</a> | 
						<a id="overlayblue" href="#" style="color: #0000FF;">Blue Overlay</a> | 
						<a id="overlayred" href="#" style="color: #FF0000;">Red Overlay</a> | 
						<a id="overlayblack" href="#" style="color: #000000;">Black Overlay</a> | 
						<a id="overlaygray" href="#" style="color: #DDDDDD;">Gray Overlay</a> | 
						<a id="overlaywhite" href="#" style="color: #FFFFFF; background-color: #000000;">White Overlay</a> 
	</div>
</div>
<div><h1>Project is under development!</h1>
	<a id="jdialog" href="#">JDialog</a><br/>
	<a id="jmessage" href="#">JMessage</a><br/>
	<a id="jprompt" href="#">JPrompt</a><br/>
	<a id="jconfirm" href="#">JConfirm</a><br/>
	<a id="jsuggestion" href="#">JSuggestion</a><div id="suggestionloading" style="display:none;">Loading</div><br/>
	<a id="jalert" href="#">JAlert</a><br/>
	<a id="jinfodialog" href="#">JInfoDialog</a><br/>
	<a id="jwindow" href="#">JWindow</a><br/>
</div>
<script type="text/javascript" language="javascript">
$(document).ready(function()
{
	//Overlay buttons
		$('#overlayblue').click(function(){
			resetPageStyle();
			$.juiplus.overlayColor = "#D8DFEA";
			$('#info').css('background-color','#D8DFEA');
			$('#info').html('Overlay is Blue');
		});
		$('#overlayred').click(function(){
			resetPageStyle();
			$.juiplus.overlayColor = "#FF0000";
			$('#info').css('background-color','#FF0000');
			$('#info').html('Overlay is Red');
		});
		$('#overlayblack').click(function(){
			resetPageStyle();
			$.juiplus.overlayColor = "#000000";
			$('#info').css('background-color','#000000');
			$('#info').css('color','#FFFFFF');
			$('#info').html('Overlay is Black');
		});
		$('#overlaygray').click(function(){
			resetPageStyle();
			$.juiplus.overlayColor = "#DDDDDD";
			$('#info').css('background-color','#DDDDDD');
			$('#info').html('Overlay is Gray');
		});
		$('#overlaywhite').click(function(){
			resetPageStyle();
			$.juiplus.overlayColor = "#FFFFFF";
			$('#info').css('background-color','#FFFFFF');
			$('#info').html('Overlay is White');
		});
		$('#overlaynocolor').click(function(){
			resetPageStyle();
			$.juiplus.overlayColor = "#FFFFFF";
			$.juiplus.overlayOpacity= .01;
			$('#info').html('Nocolor for overlay');
		});
		//Overlay buttons
	
	//JDIALOG
	$('#jdialog').click(function(){
		var languages = $('#languages').html();
		$.juiplus.cancelButton = 'Close';
		jDialog(languages,'','Dialog');
	});
	
	//JMESSAGE
	$('#jmessage').click(function(){
		jMessage("Message is located here, Palestine is under attack ! Stop the cruel Israel government!","Message");
		$('#message_send_content').elastic();
		$("#message_send_receiver").fcbkcomplete({
				json_url: "ajax.php?action=getmyfriends;",
				cache: true,
				filter_case: false,
				filter_hide: false,
				firstselected: true,
				complete_text: 'Select your friends',
				filter_selected: true,
				maxitems: 7
			  });
	});
	
	//JPROMPT
	$('#jprompt').click(function(){
		jPrompt("Please enter what are you thinking about jui plus?",'Prompt Message','Prompt',function(r)
			{
					jAlert("You write " + r);
			});
	});
	
	//JCONFIRM
	$('#jconfirm').click(function(){
		$.juiplus.okButton = 'I think OK';
		$.juiplus.cancelButton = 'NO I dont think';
		jConfirm("Do you agree JuiPlus is ok?",'Confirm',function(r){
			$.juiplus.okButton = 'OK';
			if(r){
				jAlert("You clicked 'I think OK'");
			}
			else{
				jAlert("You clicked " + $.juiplus.cancelButton);
			}
			});
	});
	
	//JSUGGESTION
	$('#jsuggestion').click(function(){
		//Use ajax or use json 
		suggestdialog();
		jSuggestion("Suggestions",'Suggestion');
	});
	
	//JALERT
	$('#jalert').click(function(){
		jAlert("This is alert",'Alert');
	});
	
	//JINFODIALOG
	$('#jinfodialog').click(function(){
		jInfoDialog("Information message",'Information');
	});
	
	//JWINDOW
	$('#jwindow').click(function(){
		information = '<div style="width:100%;"><div style="width:40%;float:left;"><img src="demo/filistin.jpg" style="border: 1px solid #D8DFEA;padding: 2px;"></div><div style="width:60%; float: right;">Do you know Israel?</div></div>';
		$.juiplus.genislik = 400;
		jWindow(information,'Israel kills babies and children in Palestine!');
	});
});
function suggestdialog()
{
	$.juiplus.okButton = 'Suggest';
	$.juiplus.cancelButton = 'Cancel';
	$.juiplus.suggestionSelected = 'Selected';
	var friends=null;
	var action = 'm=suggestions';
	$.ajax({
    	type: 'GET',
    	url: 'ajax.php',
    	data: action,
    	dataType: 'json',
		onload: $('#suggestionloading').removeClass('gizli').addClass('gorunur'),
    	success: function(ajaxResponse) {
			console.log(ajaxResponse.response);
			if( ajaxResponse.response == "OK" ) 
			{
				$('#suggestionloading').removeClass('gorunur').addClass('gizli');
				friends = ajaxResponse.relations;
				var jsuggestiondialog = jSuggestion(friends,'<div>Suggestion<\/div><div class="placeholdermini"><\/div>','Suggest',ajaxResponse.pagination,ajaxResponse.relationscount,function(r){
					if(r)
					{
						var action_suggest = 'j='+$.juiplus.suggestions.toString()+';';
						$.ajax({
					    	type: 'GET',
					    	url: 'ajax.php',
					    	data: action_suggest,
							onload: $('#suggestionloading').removeClass('gizli').addClass('gorunur'),
					    	success: function(ajaxResponseSuggestion) {
					    	if(ajaxResponseSuggestion == "OK")
					    	{
						    	jAlert('Suggestions are sent successfully');
					    	}
					    	else if(ajaxResponseSuggestion == 'NODATA')
					    	{
						    	jAlert('Suggestions are not sent');
					    	}

							$('#suggestionloading').removeClass('gorunur').addClass('gizli')
						}
						});					    	
					}
				});
			}
			else
			{
				$('#suggestionloading').removeClass('gorunur').addClass('gizli');
			}
    	}
	});
}

</script>

<div id="languages" style="display:none;">
	<div style=" height: 300px; width: 300px;">
	<div id="message_content" style="height:75%;">
	<table width="97%" style="margin:7px;">
	<tr>
		<td class="dil">
			<a href="http://jquery.com" target="_blank">Jquery</a>
			<sup style="font-size: 7px;">alpha</sup>
		</td>
		<td class="dil">
			JuiPlus
			<sup style="font-size: 7px; color: #FFFFFF;">beta</sup>
		</td>
	</tr>
	<tr>
		<td class="dil">
			<a href="http://php.net" target="_blank">Php</a>
			<sup style="font-size: 7px;">alpha</sup>
		</td>
		<td class="dil">
			<a href="http://www.python.org" target="_blank">Python</a>
			<sup style="font-size: 7px;">alpha</sup>
		</td>
	</tr>
	</table>
	</div>
	</div>
	</div>
<script type="text/javascript" language="javascript">
function resetPageStyle()
{
	$('#info').css('background-color','#DDDDDD');
	$('#info').css('color','#000000');
}
</script>
<?
