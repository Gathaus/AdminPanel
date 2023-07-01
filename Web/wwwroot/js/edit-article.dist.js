/**
 * Form Layout Vertical
 */
'use strict';

(function () {
  // Full Toolbar
  // --------------------------------------------------------------------
  const fullToolbar = [
        [
          {
            font: []
          },
          {
            size: []
          }
        ],
        ['bold', 'italic', 'underline', 'strike'],
        [{
          align: ''
        },
          {
            align: 'center'
          },
          {
            align: 'right'
          },
          {
            align: 'justify'
          }],
        [
          {
            color: []
          },
          {
            background: []
          }
        ],
        [
          {
            script: 'super'
          },
          {
            script: 'sub'
          }
        ],
        [
          {
            header: '1'
          },
          {
            header: '2'
          },
          'blockquote',
          'code-block'
        ],
        [
          {
            list: 'ordered'
          },
          {
            list: 'bullet'
          },
          {
            indent: '-1'
          },
          {
            indent: '+1'
          }
        ],
        [{direction: 'rtl'}
        ],
        ['link', 'image', 'video', 'formula'],
        ['clean']
      ]
  ;

  const fullEditor = new Quill('#full-editor', {
    bounds: '#full-editor',
    placeholder: 'Type Something...',
    modules: {
      formula: true,
      toolbar: fullToolbar
    },
    theme: 'snow',
  });
  // Form submission

  // Form submission
  document.querySelector('#form').addEventListener('submit', function(event) {
    // Prevent form from submitting normally
    event.preventDefault();

    // Get the other form values
    let title = document.querySelector('#basic-icon-default-fullname').value;
    let description = document.querySelector('#basic-icon-default-message').value;
    let tags = document.querySelector('#basic-icon-default-email').value;
    let articleId = document.querySelector('#article-id').value;

    // Create a FormData object
    let formData = new FormData();

    // Add the Quill content and other form data to the FormData object
    formData.append('id', articleId);
    formData.append('content', fullEditor.root.innerHTML);
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('Tags', tags);

    // Now you can use a normal form submission or an AJAX one
    fetch('/api/AiNews/UpdateArticle', {
      method: 'POST',
      body: formData
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    }).then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  });


  document.getElementById('preview-button').addEventListener('click', function () {
    var content = fullEditor.root.innerHTML;
    // Create a new DOM Parser
    var parser = new DOMParser();
    // Parse the content string into a DOM tree
    var doc = parser.parseFromString(content, "text/html");
    // Get all img elements
    var imgs = doc.getElementsByTagName("img");
    // Loop through each img element and add the .img-fluid class and set max-width
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].classList.add("img-fluid");
      imgs[i].style.maxWidth = "100%";
    }
    // Serialize the DOM tree back into a string
    content = new XMLSerializer().serializeToString(doc);
    document.getElementById('previewBody').innerHTML = content;

    var previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
    previewModal.show();
  });


})();


(function () {
  const phoneMaskList = document.querySelectorAll('.phone-mask'),
    creditCardMask = document.querySelector('.credit-card-mask'),
    expiryDateMask = document.querySelector('.expiry-date-mask'),
    cvvMask = document.querySelector('.cvv-code-mask'),
    datepickerList = document.querySelectorAll('.dob-picker');

  // Phone Number
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }

  // Credit Card
  if (creditCardMask) {
    new Cleave(creditCardMask, {
      creditCard: true,
      onCreditCardTypeChanged: function (type) {
        if (type != '' && type != 'unknown') {
          document.querySelector('.card-type').innerHTML =
            '<img src="' + assetsPath + 'img/icons/payments/' + type + '-cc.png" height="28"/>';
        } else {
          document.querySelector('.card-type').innerHTML = '';
        }
      }
    });
  }

  // Expiry Date Mask
  if (expiryDateMask) {
    new Cleave(expiryDateMask, {
      date: true,
      delimiter: '/',
      datePattern: ['m', 'y']
    });
  }

  // CVV
  if (cvvMask) {
    new Cleave(cvvMask, {
      numeral: true,
      numeralPositiveOnly: true
    });
  }

  // Flat Picker Birth Date
  if (datepickerList) {
    datepickerList.forEach(function (datepicker) {
      datepicker.flatpickr({
        monthSelectorType: 'static'
      });
    });
  }
})();

// select2 (jquery)
$(function () {
  // Form sticky actions
  var topSpacing;
  const stickyEl = $('.sticky-element');

  // Init custom option check
  window.Helpers.initCustomOptionCheck();

  // Set topSpacing if the navbar is fixed
  if (Helpers.isNavbarFixed()) {
    topSpacing = $('.layout-navbar').height() + 7;
  } else {
    topSpacing = 0;
  }

  // sticky element init (Sticky Layout)
  if (stickyEl.length) {
    stickyEl.sticky({
      topSpacing: topSpacing,
      zIndex: 9
    });
  }

  // Select2 Country
  var select2 = $('.select2');
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'Select value',
        dropdownParent: $this.parent()
      });
    });
  }
});
