(function () {
  function SelectText(element) {
    var range;
    var selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
      copy2clipboard(range.text, element.innerHTML);
      document.getSelection().removeAllRanges();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
      copy2clipboard(selection.toString(), element.innerHTML);
      selection.removeAllRanges();
    }
  };
  function copy2clipboard(text, html) {
    function listener(e) {
      e.clipboardData.setData('text/plain', text);
      e.clipboardData.setData('text/html', html);
      e.preventDefault();
    }
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  };
  $('#notebook-container').on('mouseenter', '.input, .output_wrapper', function () {
    if ($(this).find('i:last').length) {
      $(this).find('i:last').show();
    } else {
      $(this).css({
        'position': 'relative'
      }).append($('<i style=\"position:absolute; top:7px; left: 7px;\" class=\"fa-copy fa\"></i>').on('click', function () {
        SelectText($(this).parent().find('.input_area, .output') [0]);
        $(this).slideUp();
      }));
    }
  });
  $('#notebook-container').on('mouseleave', '.input, .output_wrapper', function () {
    $(this).find('i:last').hide();
  });
}) ();
