/**
 *
 *  DataTables Basic
 */

'use strict';

// datatable (jquery)
$(function () {
  console.log(dataFromRazor)
  var dt_basic_table = $('.datatables-basic'),
      dt_complex_header_table = $('.dt-complex-header'),
      dt_row_grouping_table = $('.dt-row-grouping'),
      dt_multilingual_table = $('.dt-multilingual'),
      dt_ajax_table = $('.datatables-ajax'),
      dt_adv_filter_table = $('.dt-advanced-search'),
      startDateEle = $('.start_date'),
      endDateEle = $('.end_date'),
      dt_basic;

  // Advanced Search Functions Starts
  // --------------------------------------------------------------------

  // Datepicker for advanced filter
  var rangePickr = $('.flatpickr-range'),
      dateFormat = 'MM/DD/YYYY';

  if (rangePickr.length) {
    rangePickr.flatpickr({
      mode: 'range',
      dateFormat: 'm/d/Y',
      orientation: isRtl ? 'auto right' : 'auto left',
      locale: {
        format: dateFormat
      },
      onClose: function (selectedDates, dateStr, instance) {
        var startDate = '',
            endDate = new Date();
        if (selectedDates[0] != undefined) {
          startDate = moment(selectedDates[0]).format('MM/DD/YYYY');
          startDateEle.val(startDate);
        }
        if (selectedDates[1] != undefined) {
          endDate = moment(selectedDates[1]).format('MM/DD/YYYY');
          endDateEle.val(endDate);
        }
        $(rangePickr).trigger('change').trigger('keyup');
      }
    });
  }

  // Filter column wise function
  function filterColumn(i, val) {
    if (i == 5) {
      var startDate = startDateEle.val(),
          endDate = endDateEle.val();
      if (startDate !== '' && endDate !== '') {
        $.fn.dataTableExt.afnFiltering.length = 0; // Reset datatable filter
        dt_basic_table.dataTable().fnDraw(); // Draw table after filter
        filterByDate(i, startDate, endDate); // We call our filter function
      }
      dt_basic_table.dataTable().fnDraw();
    } else {
      dt_basic_table.DataTable().column(i).search(val, false, true).draw();
    }
  }

  // Advance filter function
  // We pass the column location, the start date, and the end date
  $.fn.dataTableExt.afnFiltering.length = 0;
  var filterByDate = function (column, startDate, endDate) {
    // Custom filter syntax requires pushing the new filter to the global filter array
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
      var rowDate = normalizeDate(aData[column]),
          start = normalizeDate(startDate),
          end = normalizeDate(endDate);

      // If our date from the row is between the start and end
      if (start <= rowDate && rowDate <= end) {
        return true;
      } else if (rowDate >= start && end === '' && start !== '') {
        return true;
      } else if (rowDate <= end && start === '' && end !== '') {
        return true;
      } else {
        return false;
      }
    });
  };

  // converts date strings to a Date object, then normalized into a YYYYMMMDD format (ex: 20131220). Makes comparing dates easier. ex: 20131220 > 20121220
  var normalizeDate = function (dateString) {
    var date = new Date(dateString);
    var normalized =
        date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2);
    return normalized;
  };
  // Advanced Search Functions Ends

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic = dt_basic_table.DataTable({
      data:dataFromRazor,
      columns: [
        { data: '' },
        { data: 'id' },
        { data: 'id' },
        { data: 'title' },
        { data: 'description' },
        { data: 'tags' },
        { data: 'formattedCreatedDate' },
        { data: 'formattedUpdatedDate' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
        },
        {
          targets: 2,
          searchable: false,
          visible: false
        },
  {
          responsivePriority: 1,
          targets: 4
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full['status'];
            var $status = {
              0: { title: 'Draft', class: 'bg-label-primary' },
              1: { title: 'Published', class: ' bg-label-success' },
              2: { title: 'Deleted', class: ' bg-label-danger' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
                '<span class="badge ' + $status[$status_number].class + '">' + $status[$status_number].title + '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
                '<div class="d-inline-block">' +
                '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="text-primary ti ti-dots-vertical"></i></a>' +
                '<ul class="dropdown-menu dropdown-menu-end m-0">' +
                '<li><a href="javascript:;" class="dropdown-item">Details</a></li>' +
                '<li><a href="javascript:;" class="dropdown-item">Archive</a></li>' +
                '<div class="dropdown-divider"></div>' +
                '<li><a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a></li>' +
                '</ul>' +
                '</div>' +
                '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="text-primary ti ti-pencil"></i></a>'
            );
          }
        }
      ],
      order: [[2, 'desc']],
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-primary dropdown-toggle me-2',
          text: '<i class="ti ti-file-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
          buttons: [
            {
              extend: 'print',
              text: '<i class="ti ti-printer me-1" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                    .css('color', config.colors.headingColor)
                    .css('border-color', config.colors.borderColor)
                    .css('background-color', config.colors.bodyBg);
                $(win.document.body)
                    .find('table')
                    .addClass('compact')
                    .css('color', 'inherit')
                    .css('border-color', 'inherit')
                    .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="ti ti-file-text me-1" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="ti ti-file-description me-1"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="ti ti-copy me-1" ></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        },
        {
          text: '<i class="ti ti-plus me-sm-1"></i> <span class="d-none d-sm-inline-block">Add New Record</span>',
          className: 'create-new btn btn-primary mr-2',
          action: function(e, dt, button, config) {
            window.location.href = '/AiNews/AddArticle'
          }
        },
        {
          text: '<i class="ti ti-trash me-sm-1"></i> <span class="d-none d-sm-inline-block">Delete Selected</span>',
          className: 'delete-selected btn btn-danger disabled',
          action: function (e, dt, button, config) {
            const selectedIds = $('.dt-checkboxes:checkbox:checked').map(function () {
              return dt.row($(this).closest('tr')).data().id;
            }).get();
            if (selectedIds.length === 0) {
              // Show an alert if no rows are selected
              alert('No rows selected!');
              return;
            }
            console.log(selectedIds)

            // Here, you can make a POST request to your server to delete the selected rows.
            // Replace the URL '/api/AiNews/DeleteArticles' with your API endpoint.
            // fetch('/api/AiNews/DeleteArticles', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify(selectedIds)
            // }).then(response => {
            //   if (!response.ok) {
            //     throw new Error('Network response was not ok');
            //   }
            //   return response.text();
            // }).then(data => {
            //   console.log('Success:', data);
            //   // Reload the DataTable to show updated data
            //   dt_basic.ajax.reload();
            // }).catch((error) => {
            //   console.error('Error:', error);
            // });
          }
        }
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['title'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                  ? '<tr data-dt-row="' +
                  col.rowIndex +
                  '" data-dt-column="' +
                  col.columnIndex +
                  '">' +
                  '<td>' +
                  col.title +
                  ':' +
                  '</td> ' +
                  '<td>' +
                  col.data +
                  '</td>' +
                  '</tr>'
                  : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
    $('div.head-label').html('<h5 class="card-title mb-0">DataTable with Buttons</h5>');
  }

  // Delete Record
  $('.datatables-basic tbody').on('click', '.delete-record', function () {
    dt_basic.row($(this).parents('tr')).remove().draw();
  });
  
  dt_basic.on('click', 'a.item-edit', function() {
      var tr = $(this).closest('tr');
      var row = dt_basic.row(tr);
      var rowData = row.data();
      window = window.location.href = '/AiNews/EditArticle?id=' + rowData.id;
    });
  
  // on key up from input field
  $('input.dt-input').on('keyup', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });


  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
