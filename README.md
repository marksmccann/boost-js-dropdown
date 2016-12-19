Boost JS dropdown [![Build Status](https://travis-ci.org/marksmccann/boost-js-dropdown.svg?branch=master)](https://travis-ci.org/marksmccann/boost-js-dropdown)
==================================================
A style-free dropdown plugin for jQuery and [Boost JS](https://github.com/marksmccann/boost-js). While other plugins style your dropdown for you, this plugin only handles the functionality, leaving the layout and styling up to you.


Installation
--------------------------------------
Install with npm:
```bash
npm install boost-js-dropdown
```
Install in browser:
```html
<script src="https://cdn.rawgit.com/marksmccann/boost-js-dropdown/v0.0.1/dist/dropdown.min.js"></script>
```

Usage
--------------------------------------

### Create Plugin
```javascript
var boost = require('boost-js');
// var boost = $.fn.boost; (browser install)

var dropdown = require('boost-js-dropdown');
// var dropdown = $.fn.boost.dropdown; (browser install)

$.fn.dropdown = boost( dropdown.plugin, dropdown.defaults );
```

### Markup Structure
```html
<a href="#dropdown" data-role="trigger">Dropdown</a>
<ul id="dropdown">
    <li><a href="#">Action 1</a></li>
    <li><a href="#">Action 2</a></li>
    <li><a href="#">Action 3</a></li>
</ul>
```
*Note: the dropdown does not have to be a list of actions, it can be any element with whatever content you want.*

### Instantiate Plugin
```javascript
$('#dropdown').dropdown();
```

Options
--------------------------------------
Name | Default | Description
--- | --- | ---
activeClass | `"is-open"` | the class added to the trigger and dropdown when open
onOpen | `null` | a callback function called after the dropdown opens
onClose | `null` | a callback function called after the dropdown closes
onInit | `null` | a callback function called after the dropdown is initialized
### Usage
```javascript
$('#dropdown').dropdown({
    onInit: function() {
        console.log( this.id ); // 'dropdown'
    }
});
```
\- or -
```html
<ul id="dropdown" ... data-active-class="open">...</ul>
```

API
--------------------------------------
### open( fn )
Opens the dropdown. `fn`: optional callback function called after opening.
```javascript
instance.open();
```
### close( fn )
Closes the dropdown. `fn`: optional callback function called after closing.
```javascript
instance.close();
```
### toggle( fn )
Closes the dropdown if it is open and vice versa. `fn`: optional callback function.
```javascript
instance.toggle();
```
### isOpen()
Determines if dropdown is open or not.
```javascript
instance.isOpen();
```
### trigger
The trigger element.
```javascript
instance.trigger;
```

Running Tests
--------------------------------------

```bash
$ npm install && npm test
```

License
--------------------------------------

Copyright © 2016, [Mark McCann](https://github.com/marksmccann).
Released under the [MIT license](LICENSE).
