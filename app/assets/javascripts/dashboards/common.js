$('a.update-cache[data-remote]').on('ajax:success', function() {
  $.Notification.notify(
    'success',
    'top left',
    'Data is being refreshed',
    'This might take a couple of minutes, please come back a bit later'
  );
});

$('a.update-cache[data-remote]').on('ajax:error', function() {
  $.Notification.notify(
    'error',
    'top left',
    'Something went wrong',
    'We are already working on a fix, please come back later'
  );
});