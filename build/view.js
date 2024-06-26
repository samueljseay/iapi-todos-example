import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");

const apiFetch = window.wp.apiFetch;
const artificialDelay = ms => new Promise(resolve => setTimeout(resolve, ms));
const addTodo = (description, isComplete, dueDate) => {
  return apiFetch({
    path: '/wp-todo-api/v1/todo',
    method: 'POST',
    data: {
      description,
      is_completed: isComplete,
      due_date: dueDate
    }
  });
};
const updateTodo = todo => {
  return apiFetch({
    path: `/wp-todo-api/v1/todo/${todo.id}`,
    method: 'PUT',
    data: {
      description: todo.description,
      is_completed: todo.is_completed,
      due_date: todo.due_date
    }
  });
};
(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('iapi-todos', {
  actions: {
    addTodo: function* () {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.formIsProcessing = true;
      try {
        yield artificialDelay(1000);
        const todo = yield addTodo(context.new_todo.description, false, context.new_todo.due_date);
        context.todos = [...context.todos, todo];
      } catch (error) {
        context.errorMessage = `Could not add TODO: ${error.message}`;
      }

      // Clear the form.
      context.new_todo = {
        description: '',
        due_date: ''
      };
      context.formIsProcessing = false;
    },
    toggleComplete: function* (event) {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.formIsProcessing = true;
      const value = event.target.value;
      const isChecked = event.target.checked;
      const todo = context.todos.find(todo => String(todo.id) === value);
      try {
        yield updateTodo({
          ...todo,
          is_completed: isChecked
        });
        // update the todo
        context.todos = context.todos.map(todo => {
          if (String(todo.id) === value) {
            return {
              ...todo,
              is_completed: isChecked
            };
          }
          return todo;
        });
      } catch (error) {
        context.errorMessage = `Could not update TODO: ${error.message}`;
      }
      context.formIsProcessing = false;
    }
  },
  callbacks: {
    // Add some magic here!
    helloWorld: () => {
      console.log('Hello World!');
    },
    updateForm: event => {
      // We can get access to the HTML element attributes to work out which field
      // we're updating.
      const {
        attributes
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const fieldToUpdate = attributes.name;
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();

      // Update the context value here.
      if (context.new_todo[fieldToUpdate] !== undefined) {
        context.new_todo[fieldToUpdate] = event.target.value;
      }
      console.log(context.new_todo);
    }
  }
});
})();


//# sourceMappingURL=view.js.map