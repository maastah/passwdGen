// Libs
var libCapitalLetters = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';
var libSmallLetters = 'abcdefghijklmnopqrstuwxyz';
var libNumbers = '1234567890';
var libSpecialCharacters = '.?!_-';

allLibs = libCapitalLetters + libSmallLetters + libNumbers + libSpecialCharacters;

// Generator Box
var genBox = $('.passwd-generator-box');
var genInput = genBox.find('input.passwd-input');
var genBtn = genBox.find('.passwd-submit');

// Checkbox libs
var libOne = genBox.find('input[name=passwd-lib-capital-letters]');
var libTwo = genBox.find('input[name=passwd-lib-small-letters]');
var libThree = genBox.find('input[name=passwd-lib-numbers]');
var libFour = genBox.find('input[name=passwd-lib-special-characters]');

// Characters numbers
var charNumber = genBox.find('input[name=passwd-char-number]');

// Custom lib area
var customLibArea = genBox.find('.add-custom-lib-box');
// Add custom lib btn
var addCustomLibBtn = genBox.find('.add-own-lib-btn');

// Cool animations
  // Can be turned off - CSS exception created
libFour.on('click', function() {
    if (libFour[0].checked) {
      genBox.find('.special-chars-additional-info').slideDown();
    } else {
      genBox.find('.special-chars-additional-info').slideUp();
    }
});


// Add custom lib field
addCustomLibBtn.on('click', function() {
  var newElementTemplate = '<div class="full-width checkbox-item custom-lib"><label for="passwd-lib-custom-lib" class="passwd-label-libs">Własny słownik</label><input type="checkbox" name="passwd-lib-custom-lib" class="passwd-checkbox" checked><div class="full-width"><input type="text" name="custom-lib-input" class="passwd-custom-lib-input-text"><div class="full-width"><span class="remove-custom-lib-btn">-</span></div>';
  customLibArea.append(newElementTemplate);
  // Remove custom lib btn
  var removeCustomLibBtn = genBox.find('.remove-custom-lib-btn');
  // Remove custom lib
  removeCustomLibBtn.on('click', function() {
    $(this).closest('.checkbox-item.custom-lib').remove();
  });
});

// Loading selected libs
/**
*
* @return string selectedLibs
*/
function loadingLibs() {

  var selectedLibs = '';
  if (libOne[0].checked) {
    selectedLibs += libCapitalLetters;
  }
  if (libTwo[0].checked) {
    selectedLibs += libSmallLetters;
  }
  if (libThree[0].checked) {
    selectedLibs += libNumbers;
  }
  if (libFour[0].checked) {
    selectedLibs += libSpecialCharacters;
  }
  if (genBox.find('input[name=passwd-lib-custom-lib]').length) {
    genBox.find('input[name=passwd-lib-custom-lib]').each(function() {
      var addedCustomLibCheckBox = $(this);
      if (addedCustomLibCheckBox[0].checked) {
        selectedLibs += addedCustomLibCheckBox.next('.full-width').find('.passwd-custom-lib-input-text').val();
      }
    });
  }

  return selectedLibs;
}

/**
* @param string text
* @return string text
*/
function numberOfSpecialChar(text) {
  if (libFour[0].checked) {
    var charInSpecialChar = libSpecialCharacters.length;
    var specialCharNumber = 0;
    var specialCharsInPasswdInput = genBox.find('input[name=passwd-lib-special-characters-quantity]');
    var specialCharsInPasswd = specialCharsInPasswdInput.val();

    if (specialCharsInPasswd < 1) {
      specialCharsInPasswd = 3;
      specialCharsInPasswdInput.val(specialCharsInPasswd);
    }

    for (i = 0; i < charInSpecialChar; i++) {
      if ((text.indexOf(libSpecialCharacters[i]) > -1) && specialCharNumber < 3) {
        specialCharNumber++;
      }
    }

    if (specialCharNumber < specialCharsInPasswd) {
      for (specialCharNumber; specialCharNumber < specialCharsInPasswd; specialCharNumber++) {
        var rNumber = Math.floor((Math.random() * text.length));
        var sNumber = Math.floor((Math.random() * charInSpecialChar));
        text = text.substring(0, rNumber) + libSpecialCharacters[sNumber] + text.substring(rNumber + 1)
      }
    }
  }
  return text;
};

// Engine
genBtn.on('click', function(e) {
    //var text = Math.random().toString(36).substring(2);

    selectedLibs = loadingLibs();

    if (!selectedLibs) {
      var conf = confirm('Nie został wybrany żaden słownik.\nHasło zostanie wygenerowane na podstawie funkcji "Math.random()"');
      if (conf == true) {
        selectedLibs = Math.random().toString(36).substring(2);
      } else {
        return;
      }
    }

    // Number of characters in passwd
    var charNum = charNumber.val();
    // In case of input less than 1 character
    if (charNum < 1) {
      charNum = 11;
      charNumber.val(charNum);
    }

    var leng = selectedLibs.length;
    var text = '';
    for (i = 0; i < charNum; i++) {
        var rNumber = Math.floor((Math.random() * leng));
        text += selectedLibs[rNumber];
    }

    text = numberOfSpecialChar(text);

    /*
    console.log(Math.random());
    console.log(Math.random().toString(36));
    console.log(Math.random().toString(36).substring(1));
    console.log(Math.random().toString(36).substring(2));
    console.log(Math.random().toString(36).substring(3));
    console.log(Math.random().toString(36).substring(4));
    console.log(Math.random().toString(36).substring(5));
    console.log(Math.random().toString(36).substring(6));
    console.log(Math.random().toString(36).substring(7));

    */
    genInput.val(text);
});
