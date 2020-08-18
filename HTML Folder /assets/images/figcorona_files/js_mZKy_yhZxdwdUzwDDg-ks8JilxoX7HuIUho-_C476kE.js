jQuery(document).ready(function($) {

	jQuery( ".field-name-field-s3-fs-multi-test a, .field-name-field-competition-dataset a, .field-name-field-open-access-scripts a, .field-name-field-documentation a, .field-name-field-analysis-tools a, .field-name-field-open-access-files a" ).each(function( index ) {
		var myurl = jQuery( this ).attr('href');
		//console.log(myurl);
		
		if (typeof myurl != 'undefined') {
			var mytest = myurl.substr(-33,1);		
			// console.log(mytest );
			if (mytest == '&') {
				var mynewlink = myurl.slice(0, -33);
				jQuery( this ).attr('href',mynewlink);
				// console.log(mynewlink );
			}
		}
	});	
	
	$('.form-submit, .privatemsg-send-link, .masquerade-switch').addClass('btn btn-primary text-white mr-4'); // change drupal form submit buttons to bootstrap buttons
	$('.views-table').addClass('table');
	
	
	
	$('.comment .links.inline li a').addClass('btn btn-primary btn-sm mt-3');
	
	$('.search-datasets-form .content').addClass('row mx-auto');
	$('.search-datasets-form .views-exposed-form').addClass('col');
	$('.search-datasets-form .description').each(function() {
	  $( this ).prev('.views-widget').find('input').attr('placeholder',$( this ).text().trim());
	  $( this ).hide();
	});
	
	$('.field-type-file table tbody').addClass('list-group list-group-flush');
	$('.field-type-file table tr').addClass('list-group-item list-group-item-action');	
	
	if (jQuery('.s3fs-cors-upload-form').length) {	
	jQuery('.field-group-format-wrapper:not(:last-child)').each(function( index ) {
	  var prevbutton = '';
	  if (jQuery(this).attr('id') != 'ui-accordion-1-panel-0') prevbutton = '<a class="button btn btn-primary text-white previous" style="margin-top:15px;">&lt; Previous</a> ';
	  jQuery(this).append('<div class="conwrapper">'+prevbutton+'<a class="button btn btn-primary text-white continue" style="margin-top:15px;">Continue &gt;</a></div>');
	});

	jQuery('.field-group-format-wrapper:last-child').append('<div class="conwrapper"><a class="button previous" style="margin-top:15px;">&lt; Previous</a></div>');
	
	jQuery('.button.continue').click(function() {
	  jQuery(this).parent().parent().next('h3').children('a').trigger('click');
	});	

	jQuery('.button.previous').click(function() {
	  jQuery(this).parent().parent().prev('h3').prev('div').prev('h3').children('a').trigger('click');
	});		
	}

	if (jQuery('.messages.warning a').length) {
		if (jQuery('.messages.warning a').attr('href').indexOf("/user/login") >= 0) {
			jQuery('.messages.warning a').attr('href',jQuery('.messages.warning a').attr('href').replace("/user/login", "/saml_login"));
		}
	}

	if (jQuery('.comment_forbidden a').length) {
		
		if (jQuery('.comment_forbidden a').attr('href').indexOf("/user/login") >= 0) {
			jQuery('.comment_forbidden a').attr('href',jQuery('.comment_forbidden a').attr('href').replace("/user/login", "/saml_login"));
		}		
		
	}
	
	if (jQuery('form.comment-form').length) {
		jQuery('form.comment-form').submit(function( event ) {
			
			if (!jQuery('form.comment-form .field-name-comment-body iframe').contents().find('body').text() && !jQuery('form.comment-form .field-name-comment-body .form-textarea').val()) {
				alert( "Please enter a comment and then submit." );
				event.preventDefault();				
				
			}
		});
		
	}
	
	jQuery("input#shortlink, input.s3link").click(function (event) {
		event.preventDefault();	
	   jQuery(this).select();
	});
	
		
});;
