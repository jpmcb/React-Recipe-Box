'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// REACT RECIPE BOX - BY JPMCB //
/////////////////////////////////

// array of keys from local storage object
var keys = Object.keys(localStorage);

// REACT JS CODE

// push array of list items within unordered lsit

var Recipe = function (_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe() {
    _classCallCheck(this, Recipe);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Recipe.prototype.getIngredients = function getIngredients(name) {
    var ingredients = localStorage[name].split(', '); // to replace with better reg ex?
    var listArr = [];

    for (var i = 0; i < ingredients.length; i++) {
      listArr.push(React.createElement(
        'li',
        null,
        ingredients[i]
      ));
    }

    return React.createElement(
      'ul',
      null,
      listArr
    );
  };

  Recipe.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      this.getIngredients(this.props.recipeName)
    );
  };

  return Recipe;
}(React.Component);

// function and html for add recipe

var AddRecipe = function (_React$Component2) {
  _inherits(AddRecipe, _React$Component2);

  function AddRecipe(props) {
    _classCallCheck(this, AddRecipe);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = { show: false,
      recipe: '', ingredients: '' };

    _this2.changeRecipe = _this2.changeRecipe.bind(_this2);
    _this2.changeIngredients = _this2.changeIngredients.bind(_this2);
    _this2.add = _this2.add.bind(_this2);
    _this2.showAddMenu = _this2.showAddMenu.bind(_this2);
    return _this2;
  }

  AddRecipe.prototype.showAddMenu = function showAddMenu() {
    this.setState({ show: !this.state.show });
  };

  AddRecipe.prototype.changeRecipe = function changeRecipe(event) {
    this.setState({ recipe: event.target.value });
  };

  AddRecipe.prototype.changeIngredients = function changeIngredients(event) {
    this.setState({ ingredients: event.target.value });
  };

  AddRecipe.prototype.add = function add() {
    // code to add state and new recipe
    if (this.state.recipe === '') {
      console.warn("Please include a recipe name");
    } else {
      localStorage.setItem(this.state.recipe, this.state.ingredients);
      this.setState({ recipe: '', ingredients: '' });
    }
  };

  AddRecipe.prototype.render = function render() {
    if (this.state.show === false) {
      return React.createElement(
        'div',
        { id: 'add-recipe-button' },
        React.createElement(
          'button',
          { onClick: this.showAddMenu },
          this.props.text
        )
      );
    } else if (this.state.show === true) {
      return React.createElement(
        'div',
        { id: 'add-recipe-button' },
        React.createElement(
          'button',
          { onClick: this.showAddMenu },
          this.props.text
        ),
        React.createElement(
          'span',
          { id: 'add-recipe' },
          React.createElement(
            'form',
            null,
            React.createElement(
              'h4',
              null,
              'Recipe Name'
            ),
            React.createElement('input', { value: this.state.recipe, onChange: this.changeRecipe }),
            React.createElement(
              'h4',
              null,
              'Ingredients, seperated by a comma'
            ),
            React.createElement('textarea', { value: this.state.ingredients, onChange: this.changeIngredients }),
            React.createElement('br', null),
            React.createElement('input', { type: 'submit', onClick: this.add })
          )
        )
      );
    }
  };

  return AddRecipe;
}(React.Component);

// functions and html for delete recipe

var Delete = function (_React$Component3) {
  _inherits(Delete, _React$Component3);

  function Delete(props) {
    _classCallCheck(this, Delete);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = { delete: '' };

    _this3.deleteRecipe = _this3.deleteRecipe.bind(_this3);
    _this3.delete = _this3.delete.bind(_this3);
    return _this3;
  }

  Delete.prototype.delete = function _delete(event) {
    var id = event.target.id;

    localStorage.removeItem(id.replace('delete', ''));
    keys = Object.keys(localStorage);

    this.setState({ delete: '' });
  };

  Delete.prototype.deleteRecipe = function deleteRecipe(event) {
    console.log(this.state);
    var id = event.target.id;

    event.target.className = 'danger';

    this.setState({ delete: 'delete' }, console.log(this.state));
  };

  Delete.prototype.render = function render() {
    var _this4 = this;

    if (this.state.delete === 'delete') {
      return React.createElement(
        'button',
        { id: this.props.id, onClick: function onClick(event) {
            _this4.delete(event);_this4.props.callBack(event);
          } },
        'Are you sure?'
      );
    } else {
      return React.createElement(
        'button',
        { id: this.props.id, onClick: this.deleteRecipe },
        'Delete'
      );
    }
  };

  return Delete;
}(React.Component);

// functions and html to edit recipe from local storage

var Edit = function (_React$Component4) {
  _inherits(Edit, _React$Component4);

  function Edit(props) {
    _classCallCheck(this, Edit);

    var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this5.state = { edit: false,
      recipe: '', ingredients: '' };

    _this5.editRecipe = _this5.editRecipe.bind(_this5);
    _this5.editRecipeName = _this5.editRecipeName.bind(_this5);
    _this5.editIngredients = _this5.editIngredients.bind(_this5);
    _this5.finalEdit = _this5.finalEdit.bind(_this5);
    return _this5;
  }

  Edit.prototype.editRecipeName = function editRecipeName(event) {
    this.setState({ recipe: event.target.value });
  };

  Edit.prototype.editIngredients = function editIngredients(event) {
    this.setState({ ingredients: event.target.value });
  };

  // prevent blank recipe from populating local storage

  Edit.prototype.finalEdit = function finalEdit(id) {
    if (this.state.recipe === '') {
      if (this.state.ingredients === '') {
        localStorage.setItem(id, localStorage[id]);
      } else if (this.state.ingredients !== '') {
        localStorage.setItem(id, this.state.ingredients);
      }
    } else if (this.state.recipe !== '') {
      if (this.state.ingredients === '') {
        var oldIngredients = localStorage[id];
        console.log(id);
        localStorage.removeItem(id);
        localStorage.setItem(this.state.recipe, oldIngredients);
        console.log(localStorage);
      } else if (this.state.ingredients !== '') {
        localStorage.removeItem(id);
        localStorage.setItem(this.state.recipe, this.state.ingredients);
      }
    }

    //console.log(localStorage);
    this.setState({ recipe: '', ingredients: '' });
  };

  Edit.prototype.editRecipe = function editRecipe() {
    this.setState({ edit: !this.state.edit });
  };

  Edit.prototype.render = function render() {
    var _this6 = this;

    var editID = this.props.id.replace('edit', '');

    if (this.state.edit === false) {
      return React.createElement(
        'button',
        { onClick: this.editRecipe },
        'Edit'
      );
    } else if (this.state.edit === true) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: this.editRecipe },
          'Edit'
        ),
        React.createElement(
          'span',
          { id: 'edit-recipe' },
          React.createElement(
            'form',
            null,
            React.createElement('input', { defaultValue: editID, onChange: this.editRecipeName }),
            React.createElement('textarea', { defaultValue: localStorage[editID], onChange: this.editIngredients }),
            React.createElement('input', { type: 'submit', onClick: function onClick() {
                return _this6.finalEdit(editID);
              } })
          )
        )
      );
    }
  };

  return Edit;
}(React.Component);

var App = function (_React$Component5) {
  _inherits(App, _React$Component5);

  function App(props) {
    _classCallCheck(this, App);

    var _this7 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    var recipeState = new Object();
    keys.map(function (x) {
      recipeState[x] = false;
    });

    _this7.state = recipeState;

    _this7.update = _this7.update.bind(_this7);
    _this7.delete = _this7.delete.bind(_this7);
    return _this7;
  }

  App.prototype.update = function update(event) {
    var id = event.target.id;

    this.state[id] === true ? this.state[id] = false : this.state[id] = true;
    this.forceUpdate();
  };

  App.prototype.delete = function _delete(event) {
    var id = event.target.id;

    var correctedId = id.replace('delete', '');
    this.state[correctedId] === true ? this.state[id] = false : this.state[id] = true;
    this.forceUpdate();
  };

  App.prototype.getRecipe = function getRecipe() {
    var recipeArr = [];

    for (var i = 0; i < keys.length; i++) {
      if (this.state[keys[i]]) {
        recipeArr.push(React.createElement(
          'div',
          { className: 'recipe-sheet' },
          React.createElement(
            'h3',
            { id: keys[i], onClick: this.update },
            keys[i]
          ),
          React.createElement(Recipe, { recipeName: keys[i] }),
          React.createElement(Delete, { id: keys[i] + 'delete', callBack: this.delete }),
          React.createElement(Edit, { id: keys[i] + 'edit' })
        ));
      } else {
        recipeArr.push(React.createElement(
          'div',
          { className: 'recipe-sheet' },
          React.createElement(
            'h3',
            { id: keys[i], onClick: this.update },
            keys[i]
          )
        ));
      }
    }

    return recipeArr;
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { id: 'title' },
        'React Recipe Box'
      ),
      React.createElement(AddRecipe, { text: 'Add Recipe' }),
      this.getRecipe(),
      React.createElement(
        'a',
        { id: 'credits', href: 'https://github.com/jpmcb', target: '_blank' },
        'by jpmcb'
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));