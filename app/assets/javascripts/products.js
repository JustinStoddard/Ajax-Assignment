var product = {}
var showForm = false
var editingProduct;

function toggleForm() {
  showForm = !showForm;
  $('#product-form').remove();
  $('#product-list').toggle();

  if (showForm) {
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      method: 'GET',
      data: {id: editingproduct}
    }).done( function(html) {
      $('#toggle').after(html)
    });
  };
};

$(document).ready( function(){
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products',
    type: 'GET',
    dataType: 'JSON'
  }).done( function(products) {
    $('#product-list').text(products);
    var list = $('#product-list');
    list.empty();
    products.forEach( function(prod){
      var li = '<li data-product-id="' + prod.id + '">' + prod.name + ' - ' + prod.description + '</li>'
      list.append(li)
    });
  });

  $(document).on('click', '#delete-product', function(){
    var id = $(this).siblings('.product-item').data().id
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products' + id,
      type: 'DELETE'
    }).done( function() {
      var row = $("[data-id='" + id + "'")
      row.parent().remove('li')
    });
  });

  $('#toggle').on('click', function() {
    toggleForm()
  });
});
