(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["Selectable"] = factory(require("react"), require("react-dom"), require("prop-types"));
	else
		root["Selectable"] = factory(root["React"], root["ReactDOM"], root["PropTypes"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createSelectable = exports.SelectableGroup = undefined;

	var _selectableGroup = __webpack_require__(1);

	var _selectableGroup2 = _interopRequireDefault(_selectableGroup);

	var _createSelectable = __webpack_require__(8);

	var _createSelectable2 = _interopRequireDefault(_createSelectable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.SelectableGroup = _selectableGroup2.default;
	exports.createSelectable = _createSelectable2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _nodeInRoot = __webpack_require__(5);

	var _nodeInRoot2 = _interopRequireDefault(_nodeInRoot);

	var _getBoundsForNode = __webpack_require__(6);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

	var _doObjectsCollide = __webpack_require__(7);

	var _doObjectsCollide2 = _interopRequireDefault(_doObjectsCollide);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectableGroup = function (_React$Component) {
		_inherits(SelectableGroup, _React$Component);

		function SelectableGroup(props) {
			_classCallCheck(this, SelectableGroup);

			var _this = _possibleConstructorReturn(this, (SelectableGroup.__proto__ || Object.getPrototypeOf(SelectableGroup)).call(this, props));

			_this.state = {
				isBoxSelecting: false,
				boxWidth: 0,
				boxHeight: 0,
				currentItems: [],
				selectingItems: []
			};

			_this._mouseDownStarted = false;
			_this._mouseMoveStarted = false;
			_this._mouseUpStarted = false;

			_this._mouseDownData = null;
			_this._registry = [];

			_this._openSelector = _this._openSelector.bind(_this);
			_this._click = _this._click.bind(_this);
			_this._mouseDown = _this._mouseDown.bind(_this);
			_this._mouseUp = _this._mouseUp.bind(_this);
			_this._selectElements = _this._selectElements.bind(_this);
			_this._registerSelectable = _this._registerSelectable.bind(_this);
			_this._unregisterSelectable = _this._unregisterSelectable.bind(_this);
			_this._clearSelections = _this._clearSelections.bind(_this);
			_this._clearSelectings = _this._clearSelectings.bind(_this);
			_this._updatedSelecting = _this._updatedSelecting.bind(_this);
			_this._desktopEventCoords = _this._desktopEventCoords.bind(_this);
			return _this;
		}

		_createClass(SelectableGroup, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return {
					selectable: {
						register: this._registerSelectable,
						unregister: this._unregisterSelectable
					}
				};
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				_reactDom2.default.findDOMNode(this).addEventListener('mousedown', this._mouseDown);
				_reactDom2.default.findDOMNode(this).addEventListener('touchstart', this._mouseDown);
			}

			/**
	   * Remove global event listeners
	   */

		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				_reactDom2.default.findDOMNode(this).removeEventListener('mousedown', this._mouseDown);
				_reactDom2.default.findDOMNode(this).removeEventListener('touchstart', this._mouseDown);
			}
		}, {
			key: '_registerSelectable',
			value: function _registerSelectable(key, domNode) {
				this._registry.push({ key: key, domNode: domNode });
			}
		}, {
			key: '_unregisterSelectable',
			value: function _unregisterSelectable(key) {
				this._registry = this._registry.filter(function (data) {
					return data.key !== key;
				});
			}

			/**
	   * Called while moving the mouse with the button down. Changes the boundaries
	   * of the selection box
	   */

		}, {
			key: '_openSelector',
			value: function _openSelector(e) {
				var _this2 = this;

				if (this._mouseMoveStarted) return;
				this._mouseMoveStarted = true;

				e = this._desktopEventCoords(e);

				var w = Math.abs(this._mouseDownData.initialW - e.pageX);
				var h = Math.abs(this._mouseDownData.initialH - e.pageY);

				this.setState({
					isBoxSelecting: true,
					boxWidth: w,
					boxHeight: h,
					boxLeft: Math.min(e.pageX, this._mouseDownData.initialW),
					boxTop: Math.min(e.pageY, this._mouseDownData.initialH),
					selectingItems: this._updatedSelecting() // Update list of currently selected items...
				}, function () {
					_this2._mouseMoveStarted = false;
				});

				this.props.duringSelection(this.state.selectingItems);
			}

			/**
	   * Returns array of all of the elements that are currently under the selector box.
	   */

		}, {
			key: '_updatedSelecting',
			value: function _updatedSelecting() {
				var selectbox = _reactDom2.default.findDOMNode(this.refs.selectbox);
				var tolerance = this.props.tolerance;
				if (!selectbox) return [];
				var currentItems = [];
				this._registry.forEach(function (itemData) {
					if (itemData.domNode && (0, _doObjectsCollide2.default)(selectbox, itemData.domNode, tolerance)) {
						currentItems.push(itemData.key);
					}
				});

				return currentItems;
			}

			/**
	   * Called when a user clicks on an item (and doesn't drag). Selects the clicked item.
	   * Called by the _selectElements() function.
	   */

		}, {
			key: '_click',
			value: function _click(e) {
				var node = _reactDom2.default.findDOMNode(this);

				var _props = this.props,
				    tolerance = _props.tolerance,
				    dontClearSelection = _props.dontClearSelection,
				    selectbox = _reactDom2.default.findDOMNode(this.refs.selectbox);

				var newItems = []; // For holding the clicked item

				if (!dontClearSelection) {
					// Clear exisiting selections
					this._clearSelections();
				} else {
					newItems = this.props.selectedItems;
				}

				this._registry.forEach(function (itemData) {
					if (itemData.domNode && (0, _doObjectsCollide2.default)(selectbox, itemData.domNode, tolerance)) {
						if (!dontClearSelection) {
							newItems.push(itemData.key); // Only clicked item will be selected now
						} else {
							// Toggle item selection
							if (newItems.indexOf(itemData.key) == -1) {
								// Not selected currently, mark item as selected
								newItems.push(itemData.key);
							} else {
								// Selected currently, mark item as unselected
								var index = newItems.indexOf(itemData.key);
								newItems.splice(index, 1);
							}
						}
					}
				});

				// Clear array for duringSelection, since the "selecting" is now finished
				this._clearSelectings();
				this.props.duringSelection(this.state.selectingItems); // Last time duringSelection() will be called since drag is complete.

				// Close selector and update currently selected items
				this.setState({
					isBoxSelecting: false,
					boxWidth: 0,
					boxHeight: 0,
					currentItems: newItems
				});

				this.props.onSelection(newItems);
			}

			/**
	   * Called when a user presses the mouse button. Determines if a select box should
	   * be added, and if so, attach event listeners
	   */

		}, {
			key: '_mouseDown',
			value: function _mouseDown(e) {
				if (e.target.dataset.preventSelection === 'true') return;

				if (this._mouseDownStarted) return;
				this._mouseDownStarted = true;
				this._mouseUpStarted = false;

				e = this._desktopEventCoords(e);

				var node = _reactDom2.default.findDOMNode(this);
				var collides = void 0,
				    offsetData = void 0,
				    distanceData = void 0;
				_reactDom2.default.findDOMNode(this).addEventListener('mouseup', this._mouseUp);
				_reactDom2.default.findDOMNode(this).addEventListener('touchend', this._mouseUp);

				// Right clicks
				if (e.which === 3 || e.button === 2) return;

				if (!(0, _nodeInRoot2.default)(e.target, node)) {
					offsetData = (0, _getBoundsForNode2.default)(node);
					collides = (0, _doObjectsCollide2.default)({
						top: offsetData.top,
						left: offsetData.left,
						bottom: offsetData.offsetHeight,
						right: offsetData.offsetWidth
					}, {
						top: e.pageY,
						left: e.pageX,
						offsetWidth: 0,
						offsetHeight: 0
					});
					if (!collides) return;
				}

				this._mouseDownData = {
					boxLeft: e.pageX,
					boxTop: e.pageY,
					initialW: e.pageX,
					initialH: e.pageY
				};

				e.preventDefault();

				_reactDom2.default.findDOMNode(this).addEventListener('mousemove', this._openSelector);
				_reactDom2.default.findDOMNode(this).addEventListener('touchmove', this._openSelector);
			}

			/**
	   * Called when the user has completed selection
	   */

		}, {
			key: '_mouseUp',
			value: function _mouseUp(e) {
				if (this._mouseUpStarted) return;
				this._mouseUpStarted = true;
				this._mouseDownStarted = false;

				_reactDom2.default.findDOMNode(this).removeEventListener('mousemove', this._openSelector);
				_reactDom2.default.findDOMNode(this).removeEventListener('mouseup', this._mouseUp);
				_reactDom2.default.findDOMNode(this).removeEventListener('touchmove', this._openSelector);
				_reactDom2.default.findDOMNode(this).removeEventListener('touchend', this._mouseUp);

				if (!this._mouseDownData) return;

				return this._selectElements(e);
			}

			/**
	   * Selects multiple children given x/y coords of the mouse
	   */

		}, {
			key: '_selectElements',
			value: function _selectElements(e) {
				var _this3 = this;

				// Clear array for duringSelection, since the "selecting" is now finished
				this._clearSelectings();
				this.props.duringSelection(this.state.selectingItems); // Last time duringSelection() will be called since drag is complete.

				var _props2 = this.props,
				    tolerance = _props2.tolerance,
				    dontClearSelection = _props2.dontClearSelection,
				    selectbox = _reactDom2.default.findDOMNode(this.refs.selectbox);

				if (!dontClearSelection) {
					// Clear old selection if feature is not enabled
					this._clearSelections();
				}

				if (!selectbox) {
					// Since the selectbox is null, no drag event occured. Thus, we will process this as a click event...
					this.setState({
						isBoxSelecting: true,
						boxWidth: 0,
						boxHeight: 0,
						boxLeft: this._mouseDownData.boxLeft,
						boxTop: this._mouseDownData.boxTop
					}, function () {
						this._click();
					});
					return;
				}

				// Mouse is now up...
				this._mouseDownData = null;

				var newItems = [];
				var allNewItemsAlreadySelected = true; // Book keeping for dontClearSelection feature

				this._registry.forEach(function (itemData) {
					if (itemData.domNode && (0, _doObjectsCollide2.default)(selectbox, itemData.domNode, tolerance)) {
						newItems.push(itemData.key);
						if (_this3.props.selectedItems.indexOf(itemData.key) == -1 && dontClearSelection) {
							allNewItemsAlreadySelected = false;
						}
					}
				});

				var newCurrentItems = [];
				var shouldBeAddedArray = [];
				newItems.forEach(function (item) {
					if (_this3.props.selectedItems.indexOf(item) === -1) {
						shouldBeAddedArray.push(item);
					}
				});
				if (!dontClearSelection || !allNewItemsAlreadySelected) {
					// dontClearSelection is not enabled or
					// newItems should be added to the selection
					newCurrentItems = this.props.selectedItems.concat(shouldBeAddedArray);
				} else {
					newCurrentItems = this.props.selectedItems.filter(function (i) {
						return newItems.indexOf(i) < 0;
					}); // Delete newItems from currentItems
				}

				this.setState({
					isBoxSelecting: false,
					boxWidth: 0,
					boxHeight: 0,
					currentItems: newCurrentItems
				});

				this.props.onSelection(newCurrentItems);
			}

			/**
	   * Unselects all items, clearing this.state.currentItems
	   */

		}, {
			key: '_clearSelections',
			value: function _clearSelections() {
				this.state.currentItems = [];
			}

			/**
	   * Empties the array of items that were under selector box while selecting,
	   * clearing this.state.selectingItems
	   */

		}, {
			key: '_clearSelectings',
			value: function _clearSelectings() {
				this.state.selectingItems = [];
			}

			/**
	   * Used to return event object with desktop (non-touch) format of event
	   * coordinates, regardless of whether the action is from mobile or desktop.
	   */

		}, {
			key: '_desktopEventCoords',
			value: function _desktopEventCoords(e) {
				if (e.pageX == undefined || e.pageY == undefined) {
					// Touch-device
					e.pageX = e.targetTouches[0].pageX;
					e.pageY = e.targetTouches[0].pageY;
				}
				return e;
			}

			/**
	   * Renders the component
	   * @return {ReactComponent}
	   */

		}, {
			key: 'render',
			value: function render() {

				var boxStyle = {
					left: this.state.boxLeft,
					top: this.state.boxTop,
					width: this.state.boxWidth,
					height: this.state.boxHeight,
					zIndex: 9000,
					position: this.props.fixedPosition ? 'fixed' : 'absolute',
					cursor: 'default'
				};

				var spanStyle = {
					backgroundColor: 'transparent',
					border: '1px dashed #999',
					width: '100%',
					height: '100%',
					float: 'left'
				};

				var _props3 = this.props,
				    selectedItems = _props3.selectedItems,
				    onSelection = _props3.onSelection,
				    duringSelection = _props3.duringSelection,
				    dontClearSelection = _props3.dontClearSelection,
				    component = _props3.component,
				    tolerance = _props3.tolerance,
				    fixedPosition = _props3.fixedPosition,
				    remainingProps = _objectWithoutProperties(_props3, ['selectedItems', 'onSelection', 'duringSelection', 'dontClearSelection', 'component', 'tolerance', 'fixedPosition']);

				var SelectableComponentWrapper = component;

				return _react2.default.createElement(
					SelectableComponentWrapper,
					remainingProps,
					this.state.isBoxSelecting && _react2.default.createElement(
						'div',
						{ style: boxStyle, ref: 'selectbox' },
						_react2.default.createElement('span', { style: spanStyle })
					),
					this.props.children
				);
			}
		}]);

		return SelectableGroup;
	}(_react2.default.Component);

	SelectableGroup.propTypes = {

		/**
	  * Event that will fire when items are selected. Passes an array of keys.
	  */
		onSelection: _propTypes2.default.func,

		/**
	  * Event that will fire rapidly during selection (while the selector is
	  * being dragged). Passes an array of keys.
	  */
		duringSelection: _propTypes2.default.func,

		/**
	  * The component that will represent the Selectable DOM node
	  */
		component: _propTypes2.default.node,

		/**
	  * Amount of forgiveness an item will offer to the selectbox before registering
	  * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
	  * included.
	  */
		tolerance: _propTypes2.default.number,

		/**
	  * In some cases, it the bounding box may need fixed positioning, if your layout
	  * is relying on fixed positioned elements, for instance.
	  * @type boolean
	  */
		fixedPosition: _propTypes2.default.bool,

		/**
	  * When enabled, makes all new selections add to the already selected items,
	  * except for selections that contain only previously selected items--in this case
	  * it unselects those items.
	  */
		dontClearSelection: _propTypes2.default.bool,

		/**
	  * An array of keys to control selected items via flux/redux as a prop
	  */
		selectedItems: _propTypes2.default.array
	};

	SelectableGroup.defaultProps = {
		onSelection: function onSelection() {},
		duringSelection: function duringSelection() {},
		selectedItems: [],
		component: 'div',
		tolerance: 0,
		fixedPosition: false,
		dontClearSelection: false
	};

	SelectableGroup.childContextTypes = {
		selectable: _propTypes2.default.object
	};

	exports.default = SelectableGroup;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isNodeInRoot = function isNodeInRoot(node, root) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	};

	exports.default = isNodeInRoot;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	/**
	 * Given a node, get everything needed to calculate its boundaries
	 * @param  {HTMLElement} node 
	 * @return {Object}
	 */
	exports.default = function (node) {
		var rect = node.getBoundingClientRect();

		return {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft,
			offsetWidth: node.offsetWidth,
			offsetHeight: node.offsetHeight
		};
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getBoundsForNode = __webpack_require__(6);

	var _getBoundsForNode2 = _interopRequireDefault(_getBoundsForNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Given offsets, widths, and heights of two objects, determine if they collide (overlap).
	 * @param  {int} aTop    The top position of the first object
	 * @param  {int} aLeft   The left position of the first object
	 * @param  {int} bTop    The top position of the second object
	 * @param  {int} bLeft   The left position of the second object
	 * @param  {int} aWidth  The width of the first object
	 * @param  {int} aHeight The height of the first object
	 * @param  {int} bWidth  The width of the second object
	 * @param  {int} bHeight The height of the second object
	 * @return {bool}
	 */
	var coordsCollide = function coordsCollide(aTop, aLeft, bTop, bLeft, aWidth, aHeight, bWidth, bHeight, tolerance) {
	  if (typeof tolerance === 'undefined') {
	    tolerance = 0;
	  }

	  return !(
	  // 'a' bottom doesn't touch 'b' top
	  aTop + aHeight - tolerance < bTop ||
	  // 'a' top doesn't touch 'b' bottom
	  aTop + tolerance > bTop + bHeight ||
	  // 'a' right doesn't touch 'b' left
	  aLeft + aWidth - tolerance < bLeft ||
	  // 'a' left doesn't touch 'b' right
	  aLeft + tolerance > bLeft + bWidth);
	};

	/**
	 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
	 * properties, determine if they collide.
	 * @param  {Object|HTMLElement} a
	 * @param  {Object|HTMLElement} b
	 * @return {bool}
	 */

	exports.default = function (a, b, tolerance) {
	  var aObj = a instanceof HTMLElement ? (0, _getBoundsForNode2.default)(a) : a,
	      bObj = b instanceof HTMLElement ? (0, _getBoundsForNode2.default)(b) : b;

	  return coordsCollide(aObj.top, aObj.left, bObj.top, bObj.left, aObj.offsetWidth, aObj.offsetHeight, bObj.offsetWidth, bObj.offsetHeight, tolerance);
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createSelectable = function createSelectable(WrappedComponent) {
		var SelectableItem = function (_React$Component) {
			_inherits(SelectableItem, _React$Component);

			function SelectableItem() {
				_classCallCheck(this, SelectableItem);

				return _possibleConstructorReturn(this, (SelectableItem.__proto__ || Object.getPrototypeOf(SelectableItem)).apply(this, arguments));
			}

			_createClass(SelectableItem, [{
				key: 'componentDidMount',
				value: function componentDidMount() {
					this.context.selectable.register(this.props.selectableKey, _reactDom2.default.findDOMNode(this));
				}
			}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					this.context.selectable.unregister(this.props.selectableKey);
				}
			}, {
				key: 'render',
				value: function render() {
					return _react2.default.createElement(WrappedComponent, this.props, this.props.children);
				}
			}]);

			return SelectableItem;
		}(_react2.default.Component);

		SelectableItem.contextTypes = {
			selectable: _propTypes2.default.object
		};

		SelectableItem.propTypes = {
			selectableKey: _propTypes2.default.any.isRequired
		};

		return SelectableItem;
	};

	exports.default = createSelectable;

/***/ })
/******/ ])
});
;