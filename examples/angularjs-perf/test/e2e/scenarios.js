// Page objects
var TodoPage = function() {
  this.newTodoInput = element(by.model('newTodo'));

  this.footer = element(by.id('footer'));
  this.remainingCount = element(by.exactBinding('remainingCount'));
	this.clearCompletedButton = element(by.id('clear-completed'));
  this.clearCompletedCount = element(by.exactBinding('todos.length - remainingCount'));
	this.todoList = element.all(by.repeater('todo in todos'));

  this.get = function() {
    browser.get('/');
  };
  this.setNewTodo = function(title) {
    this.newTodoInput.sendKeys(title);
  };
};

describe('todomvc', function() {

  //start the tests with the main page
  browser.get('/');

  //at beginning of test, clear local storage, so we're starting clean
  browser.executeScript(function() {
    var todoStorage = angular.element(document.body).injector().get('todoStorage');
    todoStorage.clear();
  });


  it("should load", function() {
  	expect(browser.getTitle()).toBe('AngularJS • TodoMVC');
  });

  var todoPage = new TodoPage();

  describe('open page', function() {
	  it('should have a hidden footer', function() {
      todoPage.clearCompletedButton.getText().then(console.log);
	  	expect(todoPage.footer.isDisplayed()).toBeFalsy();
	  });

	  it('should have an empty list of todos', function() {
	  	expect(todoPage.todoList.count()).toEqual(0);
	  });

	  it('should not display clear completed button', function() {
	  	expect(todoPage.clearCompletedButton.isDisplayed()).toBeFalsy();
	  });
  });


  describe('adding a todo', function() {
	  it('should add todo to list', function() {
	  	todoPage.setNewTodo('test');
	  	browser.actions().sendKeys(protractor.Key.ENTER).perform();
	  	expect(todoPage.todoList.count()).toEqual(1);
	  });

    //browser.pause();
    //browser.debugger();

  	
  	it('should display the footer', function() {
  		expect(todoPage.footer.isDisplayed()).toBeTruthy();
  	});

  	it('should show correct remaining count', function() {
      todoPage.remainingCount.getText().then(function(txt){
        expect(txt == 1).toBeTruthy();
      });

      //this method failed, perhaps because of the duplicate matches on the page?
      //expect(todoPage.remainingCount).toEqual(1);
  	});

  	it('should not display clear completed button', function() {
  		expect(todoPage.clearCompletedButton.isDisplayed()).toBeFalsy();
  	});
  });


  describe('completing a todo', function() {

  	it('should mark a todo as completed', function() {
	  	var todo = element.all(by.repeater('todo in todos')).get(0);
      todo.element(by.model('todo.completed')).click();

      //sure would be nice to return window, or pass in todo, and do the lookup using todo[0] rather than finding it on the page...
      browser.executeScript(function(){
        return window.getComputedStyle($("#todo-list li:eq(0)").find("label")[0],null)["text-decoration"];
      }).then(function(textDecoration){
        expect(textDecoration).toEqual('line-through');  
      });
     
  	});

    it('should show correct remaining count', function() {
      todoPage.remainingCount.getText().then(function(txt){
        expect(txt == 0).toBeTruthy();
      });
      
      //this method failed, perhaps because of the duplicate matches on the page?
      //expect(todoPage.remainingCount).toEqual(1);
    });

    it('should display clear completed button and have correct count', function() {
      expect(todoPage.clearCompletedButton.isDisplayed()).toBeTruthy();
      todoPage.clearCompletedCount.getText().then(function(txt){
        //replace any text and make sure the count matches
        expect(parseInt(txt.replace(/\D+/,''))).toEqual(1);
      })
    });

  	it('should display correct number of completed tasks on the completed task view', function() {
			element(by.css("a[href='#/completed']")).click();

      expect(browser.getCurrentUrl()).toMatch(/\/completed/);

      expect(todoPage.todoList.count()).toEqual(1);
  	});

  });

  

  

});


//TODO
// *hover over todo and click X
// todo should be deleted

// *double click todo
// todo should become editable
// *click outside of input
// todo should change and become uneditable

// *switch to active tab

// toggle all