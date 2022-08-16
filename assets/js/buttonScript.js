let ddEl = $('#com-dropdown');
ddEl.on('click', function(event){
    
    let buttonPsd = $(event.target);
    console.log( buttonPsd.attr('id') );
    let dropDown = $('#dropDownTxt');
    dropDown.text(buttonPsd.attr('id'));
});

