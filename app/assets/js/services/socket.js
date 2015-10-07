angular.module('YoutubeRemote').factory('socket', function($rootScope) {
	var server = io.connect('https://localhost/', {secure: true});
	return {
		on: function (eventName, callback) {
			server.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(server, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			server.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});