

$(".box").click(function(id) {
  var id = $(this).prop('id');
  id = 'pages/' + id + '.html';
  window.location = id;
  console.log(id);
});