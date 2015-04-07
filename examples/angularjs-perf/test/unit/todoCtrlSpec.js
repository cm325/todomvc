/*global describe, it, beforeEach, inject, expect*/
(function () {
	'use strict';

	describe('Test to print out jasmine version', function() {
		it('prints jasmine version', function() {
	        console.log('jasmine-version:' + jasmine.getEnv().versionString());
	    });
	});

	describe('Todo Controller', function () {
		var ctrl, scope, store, location; 

		// Load the module containing the app, only 'ng' is loaded by default.
		beforeEach(module('todomvc'));

		beforeEach(inject(function ($controller, $rootScope, todoStorage, $location) {
			scope = $rootScope.$new();

			store = todoStorage;

			//clear local storage before starting
			store.clear();

			location = $location;

			ctrl = $controller('TodoCtrl', {
				$scope: scope,
				store: store
			});
		}));

		it('should not have an edited Todo on start', function () {
			expect(scope.editedTodo).toBeNull();
		});

		it('should not have any Todos on start', function () {
			expect(scope.todos.length).toBe(0);
		});

		it('should have all Todos completed', function () {
			scope.$digest();
			expect(scope.allChecked).toBeTruthy();
		});

		describe('the filter', function () {
			it('should default to ""', function () {
				scope.$emit('$routeChangeSuccess');

				expect(scope.statusFilter).not.toBeDefined();
			});

			describe('being at /active', function () {
				it('should filter non-completed', inject(function ($controller) {
					ctrl = $controller('TodoCtrl', {
						$scope: scope,
						todoStorage: store,
						$location:location
					});

					location.path("/active");
					scope.$apply();
					expect(scope.statusFilter.completed).toBeFalsy();
				}));
			});

			describe('being at /completed', function () {
				it('should filter completed', inject(function ($controller) {
					ctrl = $controller('TodoCtrl', {
						$scope: scope,
						todoStorage: store,
						$location:location
					});

					location.path("/completed");
					scope.$apply();
					expect(scope.statusFilter.completed).toBeTruthy();
				}));
			});
		});

		describe('having no Todos', function () {
			var ctrl;

			beforeEach(inject(function ($controller) {
				ctrl = $controller('TodoCtrl', {
					$scope: scope,
					todoStorage: store
				});
				scope.$digest();
			}));

			it('should not add empty Todos', function () {
				scope.newTodo = '';
				scope.addTodo();
				scope.$digest();
				expect(scope.todos.length).toBe(0);
			});

			it('should not add items consisting only of whitespaces', function () {
				scope.newTodo = '   ';
				scope.addTodo();
				scope.$digest();
				expect(scope.todos.length).toBe(0);
			});


			it('should trim whitespace from new Todos', function () {
				scope.newTodo = '  buy some unicorns  ';
				scope.addTodo();
				scope.$digest();
				expect(scope.todos.length).toBe(1);
				expect(scope.todos[0].title).toBe('buy some unicorns');
			});
		});

		describe('having some saved Todos', function () {
			var ctrl;

			beforeEach(inject(function ($controller) {
				ctrl = $controller('TodoCtrl', {
					$scope: scope,
					todoStorage: store
				});

				scope.newTodo = 'Uncompleted Item 0'
				scope.addTodo(); 
				scope.newTodo = 'Uncompleted Item 1'
				scope.addTodo(); 
				scope.newTodo = 'Uncompleted Item 2'
				scope.addTodo(); 

				//now for adding completed ones
				scope.newTodo = 'Completed Item 0';
				scope.addTodo(); 
				var todo1 = scope.todos[scope.todos.length-1];
				todo1.completed = true;
				scope.doneEditing(todo1);
				scope.todoCompleted(todo1);

				scope.newTodo = 'Completed Item 1';
				scope.addTodo(); 
				var todo2= scope.todos[scope.todos.length-1];
				todo2.completed = true;
				scope.doneEditing(todo2);
				scope.todoCompleted(todo2);
				
				scope.$digest();
			}));

			it('should count Todos correctly', function () {
				expect(scope.todos.length).toBe(5);
				expect(scope.remainingCount).toBe(3);
				expect(scope.todos.length - scope.remainingCount).toBe(2);
				expect(scope.allChecked).toBeFalsy();
			});

			it('should save Todos to local storage', function () {
				expect(scope.todos.length).toBe(5);
			}); 

			it('should remove Todos w/o title on saving', function () {
				var todo = store.get()[2];
				scope.editTodo(todo);
				todo.title = '';
				scope.doneEditing(todo);
				expect(scope.todos.length).toBe(4);
			});

			it('should trim Todos on saving', function () {
				var todo = scope.todos[0];
				scope.editTodo(todo);
				todo.title = ' buy moar unicorns  ';
				scope.doneEditing(todo);
				expect(scope.todos[0].title).toBe('buy moar unicorns');
			});

			it('clearCompletedTodos() should clear completed Todos', function () {
				scope.clearCompletedTodos();
				expect(scope.todos.length).toBe(3);
			});

			it('markAll() should mark all Todos completed', function () {
				scope.markAll(false);
				scope.$digest();
				expect(scope.todos.length - scope.remainingCount).toBe(5);
			});

			it('revertTodo() get a Todo to its previous state', function () {
				var todo = scope.todos[0];
				scope.editTodo(todo);
				todo.title = 'Unicorn sparkly skypuffles.';
				scope.revertEditing(todo);
				scope.$digest();
				expect(scope.todos[0].title).toBe('Uncompleted Item 0');
			});
		});
	});
}());
