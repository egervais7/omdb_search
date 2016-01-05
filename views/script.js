$(document).ready(function(){

  $('.delete-button').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var id = $(this).attr('id');
    if (confirm("Do you really really really want to delete this from your favorites???")) {
      $.ajax({
        url: url,
        method: 'DELETE',
        data: {id: id},
        success: function(data, status, obj) {
          alert('Deleted Favorite');
          window.location.reload(true);
        },
        error: function(err, status, message) {
          console.log(err, status, message);
        }
      });
    } else {
      return;
    }
  });

  $('.remove-button').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var id = $(this).attr('id');
    if (confirm("Do you really really really want to delete this comment??")) {
      $.ajax({
        url: url,
        method: 'DELETE',
        data: {id: id},
        success: function(data, status, obj) {
          alert('Deleted Comment');
          window.location.reload(true);
        },
        error: function(err, status, message) {
          console.log(err, status, message);
        }
      });
    } else {
      return;
    }
  });

});
