$('a.update-cache[data-remote]').on('ajax:success', function() {
  $.Notification.notify(
    'success',
    'top left',
    'Los datos se actualizan',
    'Esto puede demorar un par de minutos. Regrese un poco más tarde.'
  );
});

$('a.update-cache[data-remote]').on('ajax:error', function() {
  $.Notification.notify(
    'error',
    'top left',
    'Algo salió mal',
    'Ya estamos trabajando en una solución, por favor regrese más tarde'
  );
});