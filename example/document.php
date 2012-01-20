<?
	require("format_javascript.php");
	
?>
<div id="subinfomenu">
	<div id="overlays">
						<a id="jdialoginfo" href="#">JDialog</a> | 
						<a id="jalertinfo" href="#">JAlert</a> | 
						<a id="jmessageinfo" href="#">JMessage</a> | 
						<a id="jsuggestioninfo" href="#">JSuggestion</a> | 
						<a id="jinfodialoginfo" href="#">JInfoDialog</a> | 
						<a id="jconfirminfo" href="#">JConfirm</a> |
						<a id="jinfodialoginfo" href="#">JPrompt</a> | 
						<a id="jinfodialoginfo" href="#">JWindow</a> | 
	</div>
</div>
<script type="text/javascript" language="javascript">
$(document).ready(function()
{
	//Overlay buttons
		$('#jdialoginfo').click(function(){
			$.juiplus.overlayColor = "#D8DFEA";
			$('#info').html('Information about JDialog');
			$('#document').html($('#jdialoghelp').clone());
		});
		$('#jalertinfo').click(function(){
			$.juiplus.overlayColor = "#D8DFEA";
			$('#info').html('Information about JAlert');
			$('#document').html($('#jalerthelp').clone());
		});
});
</script>
<h2>Documents</h2>
<div id="document">
	<p>How to use JuiPlus?</p>
	<p>Welcome to documents!</p>
</div>

<div id="document_pages" style="display: none;">
	<div id="jdialoghelp">
		<p>JDialog may be used anywhere you want to use it.</p>
			<?
			echo format_javascript("
			var languages = $('#languages').html();\n
			$.juiplus.cancelButton = 'Close';\n
			
			jDialog(languages,'','Dialog');\n");
			?>
	</div>
	<div id="jalerthelp">
		<p>JAlert, is used to give some notification, information, error, warning etc. to user. JAlert is not closed until you click on the close button, user has to click on the close button to close the alert dialog. Escape key does not work on JAlert</p>
		<?
		echo format_javascript("jAlert(\"This is alert\",'Alert');");
		?>
	</div>
	<div id="jmessagehelp">
	</div>
	<div id="jsuggestionhelp">
	</div>
	<div id="jwindowhelp">
	</div>
	<div id="jprompthelp">
	</div>
	<div id="jconfirmhelp">
	</div>
	<div id="jinfodialoghelp">
	</div>
</div>
