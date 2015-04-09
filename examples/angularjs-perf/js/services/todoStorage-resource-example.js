/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 * $resource returns an object with get, save methods built in
*/
todomvc.factory('todoStorageResourceExample', function () {
	return $resource('http://www.myapp.com/api/todos/:todoId'); 
});
