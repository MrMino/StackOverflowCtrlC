/*  Code written by:      Blazej "MrMino" Michalik
                            im.mr.mino@gmail.com
    Licence:            
    The MIT License (MIT)
    Copyright (c) 2016 by Błażej "MrMino" Michalik
*/

// Code in copybox.min.js was compiled with 
// https://closure-compiler.appspot.com/home
// This is the unpacked version

// Dump text in toCopy into clipboard
function copyToClipboard(toCopy) {
    // Id of temporary form element for the selection and copy
    var hiddenTextAreaId = "_CopyButtonTextArea_";
    
    // Get scrollbar position to restore it afterwards
    var scrollPos = $(window).scrollTop();

    // Create hidden text element
    var $hid = $('<textarea></textarea>');
    $hid.attr('id', hiddenTextAreaId);
    $('body').append($hid);
    
    $hid.text(toCopy);
    
    // Select the content
    $hid.get(0).focus();
    $hid.get(0).setSelectionRange(0, toCopy.length);
    
    // Copy the selection
    document.execCommand("copy");

    // Clear temporary content
    $('#'+hiddenTextAreaId).remove();

    // Restore scrollbar position
    $(window).scrollTop(scrollPos);
}

$(document).ready(function () {
    var buttonId = '_copyButton_';
    var button = $('<button>Copy</button>').attr('class', buttonId);

    // CSS is copied from .post-tag class, to ensure proper style when stylish is present
    // Not just cloned, because there are too many properties that trip up jquery
    // Button isn't just enclased as post-tag, to make sure nothing interferes with positioning
    var copycat = $('.post-tag');
    var css_string = {
        'display':'none',
        'transition-property':'none',
        'position':'absolute',
        'cursor':'pointer',
        'margin':'0px',
        'padding':              $(copycat).css('padding'),
        'color':                $(copycat).css('color'),
        'font-size':            $(copycat).css('font-size'),
        'font-family':          $(copycat).css('font-family'),
        'background-color':     $(copycat).css('background-color'),
        'border-color':         $(copycat).css('border-color'),
        'border-width':         $(copycat).css('border-width'),
        'border-style':         $(copycat).css('border-style'),
        'border-radius':        $(copycat).css('border-radius'),
    };
    button.css(css_string);
    
    // Calculating button width
    // Element needs to be present in DOM to calculate it's width
    // I blame Hakon Wium Lie
    $('body').append(button);
    var offset = button.width();
    button.remove();

    // For some reason, offset is still too low. I blame W3C.
    offset += 30;
    
    // Hiding, fading, showing, etc.
    $('pre').hover(function (){
        // Calculating the right position for the button to appear
        var pos = $(this).width() - offset;
        // Button is cloned, so jquery won't trip up, and then moved
        var clone = button.clone().css('margin-left', pos + "px");

        $(this).prepend(clone);
        
        // Setting click event
        clone.click(function(){
            var toCopy = $(this).parent().find("code").text();
            copyToClipboard(toCopy);
        });
        
        clone.fadeIn();
    }, function (){
        $('.' + buttonId).fadeOut(function(){
            $(this).remove();
        });
    });
});
