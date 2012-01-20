// Version 0.0.1
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//		@add onurguzel
//		jWindow( message, [value, title, callback] )
//
(function($) {
	
	$.juiplus = {
		
		// These properties can be read/written by accessing $.juiplus.propertyName from your scripts at any time
		
		verticalOffset: -80,                // vertical offset of the dialog from center screen in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .70,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		sendButton: '&nbsp;Send&nbsp;',		// text for Send button
		loadingInfo: '&nbsp;Loading...',	//text for Loading info
		dialogClass: null, dialoginner: null,  // if specified, this class will be applied to all dialogs
		suggestions: new Array,
		suggestionSelected: 'Selected',
		suggestionAll: 'All',
		suggestionSize: 0,
		suggestionAction: 'ajax.php',
		suggestionActionPath: 'page=',
		suggestionUseAjax: true,
		pagination: 0,
		receiver: 'Receiver',
		subject: 'Subject',
		message: 'Message',
		friends: false,
		genislik: 0,
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.juiplus._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.juiplus._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.juiplus._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		juipluswindow: function(message, value, title, callback,width,height){
			if( title == null ) title = 'Window';
			$.juiplus._show(title, message, value, 'juipluswindow', function(result){
				if( callback ) callback(result);
			});
		},
		
		juiplusdialog: function(message, value, title, callback){
			if( title == null ) title = 'Dialog';
			$.juiplus._show(title, message, value, 'juiplusdialog', function(result){
				if( callback ) callback(result);
			});
		},
		
		juiplusinfodialog: function(message, value, title, callback){
			if( title == null ) title = 'Information';
			$.juiplus._show(title, message, value, 'juiplusinfo', function(result){
				if( callback ) callback(result);
			});
		},
		
		messagedialog: function(message, value, title, callback){
			if( title == null ) title = 'Message';
			$.juiplus._show(title, message, value, 'messagedialog', function(result){
				if( callback ) callback(result);
			});
		},
		
		suggestiondialog: function(suggestions, value, title, callback){
			if( title == null ) title = 'Suggest';
			$.juiplus._show(title, suggestions, value, 'suggestiondialog', function(result){
				if( callback ) callback(result);
			});
		},

		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.juiplus._hide();
			$.juiplus._overlay('show');
			
			var popupmessage = 'popup_message_info';
			
			$("BODY").append(
					  '<div id="popup_container">' +
					    '<h1 id="popup_title"></h1>' +
					    '<div id="popup_content">' +
					      '<div id="'+popupmessage+'"></div>' +
						'</div>' +
					  '</div>');
			
			if( $.juiplus.dialogClass ) $("#popup_container").addClass($.juiplus.dialogClass);
			
			
			var pos = ($.browser.msie && parseInt($.browser.version) <= 8 ) ? 'absolute' : 'fixed'; 
			//genislik means width in turkish :) 
			//it is only usable in juipluswindow
			if(type == 'juipluswindow' && $.juiplus.genislik > 0 ) $('#popup_content').css('width',$.juiplus.genislik);
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			
			$("#popup_message_info").text(msg);
			$("#popup_message_info").html( $("#popup_message_info").text().replace(/\n/g, '<br />') );
			
			
			
			switch( type ) {
				case 'alert':
					$.juiplus._insertDialogInfo(false,true,msg,null,null,'alert');
				break;
				case 'juipluswindow':
					$.juiplus._insertDialogInfo(true,true,msg,value,callback,'juipluswindow');
				break;
				case 'confirm':
					$.juiplus._insertDialogInfo(true,true,msg,null,callback,'confirm');
				break;
				case 'prompt':
					$.juiplus._insertDialogInfo(true,true,msg,null,callback,'prompt');
				break;
				case 'juiplusinfo':
					$.juiplus._insertDialogInfo(true,false,msg,null,callback,'info');
				break;
				case 'juiplusdialog':
					$.juiplus._insertDialogInfo(true,false,msg,value,null,'dialog');
				break;
				case 'messagedialog':
					$.juiplus._insertDialogInfo(true,true,msg,value,callback,'message');
				break;
				case 'suggestiondialog':
					$.juiplus._insertDialogInfo(true,true,msg,value,callback,'suggest');
				break;
			}
			
			$.juiplus._reposition();
			$.juiplus._maintainPosition(true);
			
			// Make draggable
			if( $.juiplus.draggable ) {
				try {
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.juiplus._overlay('hide');
			$.juiplus._maintainPosition(false);
		},
		
		_suggest: function(id)
		{
			$('#is_user_selected_'+id).toggleClass('juiplussprite');
			$('#suggestion_info_'+id+' a').toggleClass('suggested_item');
			$('#suggestion_info_'+id+' strong').toggleClass('suggested_item');
			if($.juiplus.suggestions.exists(id) == false)
			{
				$.juiplus.suggestions.push(id);
				$.juiplus._increaseSuggest();
			}
			else
			{
				if($.juiplus.suggestions.length > 0 && $.juiplus.suggestions.exists(id))
				{
					$.juiplus._removeSuggest(id);
					$.juiplus._decreaseSuggest();
				}
			}
		},
		
		_removeSuggest: function(id)
		{
			$.juiplus.suggestions.remove(id);
		},
		
		_changeSuggestPage: function(page,getsuggestion)
		{
			var pagesize = Math.ceil(parseFloat($.juiplus.suggestionSize)/parseFloat($.juiplus.pagination));
			
			$('#suggestion_paginate_list').html('');
			if(getsuggestion)
			{
				var action = 'm=suggestions&p='+page;
				$.ajax({
			    	type: 'GET',
			    	url: 'ajax.php',
			    	data: action,
			    	dataType: 'json',
			    	success: function(ajaxCevap) {
						if( ajaxCevap.response == "OK" ) 
						{
							$.juiplus.friends = ajaxCevap.relations;
							
							var suggestionspage = $.juiplus.friends;
							var suggestionitems='';
							$('#friends').html('');
							if(suggestionspage != false)
							{
								$.each(suggestionspage,function(objorder,obje){
											if(obje.icon == -1) obje.icon = 'images/noimage/user_icon.png';
											
											var is_selected = '';
											
											var is_selected_classing = '';
											if($.juiplus.suggestions.exists(obje.value))
											{
												is_selected = ' class="alemsprite"';
												is_selected_classing = ' class="suggested_item"';
											}
											suggestionitems = suggestionitems + '<li id="suggestion_info_'+obje.value+'" class="userinfo"><a title="'+obje.caption+'" onclick="$.juiplus._suggest('+obje.value+');return false;" href="" '+is_selected_classing+'><span style="background-image: url('+obje.icon+');" class="imageicon"><span id="is_user_selected_'+obje.value+'"'+is_selected+'> <\/span><\/span><strong'+is_selected_classing+'>'+obje.caption+'<\/strong><\/a><\/li>';
										});
							}
							$('#friends').html(suggestionitems);
							
						}
						else
						{
							$.juiplus.friends = false;
						}
						}
				});
			}
			
			if(pagesize >= 1)
			{
				for(i=0;i<pagesize;i++)
				{
					var page_number = (i+1);
					
					if(page_number != page)
					{
						$('#suggestion_paginate_list').append('<li><a href="" onClick="$.juiplus._changeSuggestPage('+page_number+',true);return false;" title="'+page_number+'">'+page_number+'</a><\/li>');
					}
					else
					{
						$('#suggestion_paginate_list').append('<li><span title="'+page_number+'">'+page_number+'</span><\/li>');
					}
				}
			}
		},

		
		
		_increaseSuggest: function()
		{
			var i = parseInt($('#suggestion_count').html());
			$('#suggestion_count').html(i+1);
		},
		
		_decreaseSuggest: function()
		{
			var i = parseInt($('#suggestion_count').html());
			if(i>=0)i=i-1;
			$('#suggestion_count').html(i);
		},
		
		_insertDialogInfo: function(showclose,showsend,msg,value,callback,type)
		{
			$('#popup_message_info').html('<div id="uiplus_dialog" class="uiplus_dialog"><div id="uiplus_dialog_title" class="uiplus_dialog_title"></div></div>'+
			'<div id="uiplus_dialog_footer" class="uiplus_dialog_footer"></div>');
			var footer = '<div class="left" id="uiplus_dialog_footer_message"></div><div class="uiplus_dialog_buttons">';
			if(showsend) var footer = footer + '<input id="uiplus_dialog_send" type="button" class="link_button_blue dialog_button" value="'+$.juiplus.okButton+'"/>';
			if(showclose) footer = footer + '<input id="uiplus_dialog_close" type="button" class="link_button_deactivate dialog_button" value="'+$.juiplus.cancelButton+'"/>';
			
			$('#uiplus_dialog_footer').html(footer + '</div>');
			
			if(type=='suggest' && msg)
			{
				$.juiplus.verticalOffset = 8;
				var suggestions = msg;
				var suggestionitems='';
				$.each(suggestions,function(objorder,obje)
						{
							if(obje.icon == -1) obje.icon = 'images/noimage/user_icon.png';
							suggestionitems = suggestionitems + '<li id="suggestion_info_'+obje.value+'" class="userinfo"><a title="'+obje.caption+'" onclick="$.juiplus._suggest('+obje.value+');return false;" href=""><span style="background-image: url('+obje.icon+');" class="imageicon"><span id="is_user_selected_'+obje.value+'"> <\/span><\/span><strong>'+obje.caption+'<\/strong><\/a><\/li>';
						});
				suggestions = '<div id="suggestion_window"><div id="suggestion_window_info"><div class="suggestion_filter"><span class="infospan">'+$.juiplus.suggestionSelected+'<span id="suggestion_count"> 0 <\/span></span></div><\/div><ul id="friends">'+suggestionitems+'<\/ul><\/div><div id="suggestion_pagination"><ul id="suggestion_paginate_list" class="paginate_list alignright"><\/ul><\/div>';
				if(suggestions) $('#uiplus_dialog_title').after(suggestions);
				if(value) $('#uiplus_dialog_title').html(value);
				$.juiplus._changeSuggestPage(1,false);
			}
			else if(type=='message')
			{
				msg = '<div id="newmessage_content">'+
						'<div id="newmessagecontainer" class="extendedkutu">'+
							'<div id="newmessagecontent">'+
								'<div class="form_container">'+
								'<div class="gridrow">'+
										'<div class="gridrowcaption">'+$.juiplus.receiver+'&nbsp;:&nbsp;<\/div>'+
										'<div class="gridrowinfo"><select name="newmessage[receiver][0]" id="message_send_receiver" class="newmessageinput"><\/select><\/div>'+
									'<\/div>'+
									'<div class="placeholdermini"><\/div>'+
									'<div class="gridrow">'+
										'<div class="gridrowcaption">'+$.juiplus.subject+'&nbsp;:&nbsp;<\/div>'+
										'<div class="gridrowinfo"><input type="text" maxlength="300" name="newmessage[subject]" id="message_send_subject" class="newmessageinput" \/><\/div>'+
									'<\/div>'+
									'<div class="placeholdermini"><\/div>'+
									'<div class="gridrow">'+
										'<div class="gridrowcaption">'+$.juiplus.message+'&nbsp;:&nbsp;<\/div>'+
										'<div class="gridrowinfo"><textarea name="newmessage[content]" id="message_send_content" class="newmessageinput"><\/textarea><\/div>'+
									'<\/div>'+
									'<div class="gridrow">'+
										'<div class="gridrowcaption"><\/div><div class="gridrowinfo" style="float: right;"><\/div>'+
									'<\/div>'+
								'<\/div>'+
							'<\/div>'+
						'<\/div><\/div>'+msg;
				
				$.juiplus.verticalOffset = -8;
				if(msg) $('#uiplus_dialog_title').html(msg);
				if(value) $('#uiplus_dialog_title').after(value);

			}
			else if(type == 'prompt')
			{
				if(msg) $("#uiplus_dialog_title").html(msg);
				$("#uiplus_dialog_title").after('<br /><input type="text" size="30" id="popup_prompt" style="width:100%;" />');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#uiplus_dialog_send").click( function() {
						var val = $("#popup_prompt").val();
						$.juiplus._hide();
						if( callback ) callback( val );
					});
					$("#uiplus_dialog_cancel").click( function() {
						$.juiplus._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #uiplus_dialog_send, #uiplus_dialog_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#uiplus_dialog_send").trigger('click');
						if( e.keyCode == 27 ) $("#uiplus_dialog_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();

			}
			else
			{
				$.juiplus.verticalOffset = -8;
				if(msg) $('#uiplus_dialog_title').html(msg);
				if(value) $('#uiplus_dialog_title').after(value);
			}
			
			$('#uiplus_dialog').width($('#popup_message_info').width()-20);
			if($.browser.msie)
			{
				$('#uiplus_dialog_footer').width($('#popup_message_info').width());
			}
			
			if(showsend)
			{
				$("#uiplus_dialog_send").click( function() {
					var result = $('#popup_container');
					$.juiplus._hide();
					if(callback) callback(result);
					result.remove();
				});
			}
			
			if(showclose)
			{
				$("#uiplus_dialog_close").click( function() {
					$.juiplus._hide();
					if(callback) callback(false);
				});
				$("#uiplus_dialog_close").focus().keypress( function(e) {
				if( e.keyCode == 13 || e.keyCode == 27 ) $("#uiplus_dialog_close").trigger('click');
				});
			}
		},
		
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.juiplus._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.juiplus.overlayColor,
						opacity: $.juiplus.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.juiplus.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.juiplus.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.juiplus.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.juiplus._reposition);
					break;
					case false:
						$(window).unbind('resize', $.juiplus._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortcut functions
	jAlert = function(message, title, callback) {
		$.juiplus.alert(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.juiplus.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.juiplus.prompt(message, value, title, callback);
	};
	
	jWindow = function(message,value,title,callback,width,height)
	{
		$.juiplus.juipluswindow(message,value,title,callback);
	};
	
	jDialog = function(message,value,title,callback)
	{
		$.juiplus.juiplusdialog(message,value,title,callback);
	};
	
	jInfoDialog = function(message,value,title,callback)
	{
		$.juiplus.juiplusinfodialog(message,value,title,callback);
	};
	
	jMessage = function(message,value,title,callback)
	{
		$.juiplus.messagedialog(message,value,title,callback);
	};
	
	jSuggestion = function(suggestions,value,title,pagination,suggestion_size,callback)
	{
		$.juiplus.suggestionSize = suggestion_size;
		$.juiplus.pagination = pagination;
		$.juiplus.suggestiondialog(suggestions,value,title,callback);
		return $('#popup_container');
	};
	
})(jQuery);
