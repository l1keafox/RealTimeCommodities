// When one of the dropdown items is selected 
$('#com-dropdown').on('click', function(event){
    let buttonPsd = $(event.target);
    let dropDown = $('#dropDownTxt');
    // the text of dropDown is changed to notify user of the state.
    dropDown.text(buttonPsd.attr('id'));
});