/**
 * Form Editors
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
// Submit butonuna basıldığında içeriğin konsola yazdırılması
    document.getElementById('submit-button').addEventListener('click', function () {
        var content = fullEditor.root.innerHTML;
        console.log(content);
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


