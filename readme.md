# jQuery FullScreen API Plugin

The Fullscreen API is a still experimental feature of HTML5. Currently browser support is limited to Firefox, Chrome and Safari. 


## Usage Example

More examples are available in the examples directory.

```js
$(document).ready(function(){

    // options for constructor
    var options = {
        "fullscreen_class":"my-fullscreen-class"
    };

    // instantiate plugin (with a callback)
    $('div#my-fs-div').fsapi(options, function(elem, open){
        if (open) {
            elem.html('div#my-fs-div is fullscreen');
        } else {
            elem.html('div#my-fs-div is NOT fullscreen');
        };
    });

    // set click event for open button
    $('button#my-button-open').click(function(){
        $('div#my-fs-div').fsapi('open');
    });

    // set click event for close button
    $('button#my-button-close').click(function(){
        $('div#my-fs-div').fsapi('close');
    });

    // hide buttons for unsupported browsers
    if (!$.support.fullscreen) {
        $('button#my-button-open').hide();
        $('button#my-button-close').hide();
    }

});
    
```
## Constructor Options
<table>
  <tr>
    <th>Property</th>
    <th>Default Value</th>
    <th>Description</th>
  </tr>
    <tr>
        <td><b>background</b> (string)</td>
        <td>'#fff'</td>
        <td>This CSS background value will be applied to the div created and placed behind the fullscreen element.</td>
    </tr>
    <tr>
      <td><b>fullscreen_class</b> (string)</td>
        <td>'fs-fullscreen'</td>
        <td>This CSS class is added to the element when it is at full screen.</td>
    </tr>
    <tr>
      <td><b>fullscreen_children</b> (bool)</td>
        <td>false</td>
        <td>Whether or not to add the <b>full_screen</b> class to child elements.</td>
    </tr>
</table>

## Public Methods
<table>
  <tr>
    <th>Method</th>
    <th>Returns</th>
    <th>Description</th>
  </tr>
    <tr>
        <td><b>$('elem').fsapi([object] options, [function] callback)</b> (constructor)</td>
        <td>this</td>
        <td>This CSS background value will be applied to the div created and placed behind the fullscreen element.</td>
    </tr>
    <tr>
        <td><b>$('elem').fsapi('open')</b></td>
        <td>this</td>
        <td>Open the element specified by the selector.</td>
    </tr>
    <tr>
        <td><b>$('elem').fsapi('close')</b></td>
        <td>this</td>
        <td>Close the element specified by the selector.</td>
    </tr>
    <tr>
        <td><b>$('elem').fsapi('width')</b></td>
        <td>int</td>
        <td>Returns the maximum fullscreen width. Equivalent to: screen.width.</td>
    </tr>
    <tr>
        <td><b>$('elem').fsapi('height')</b></td>
        <td>int</td>
        <td>Returns the maximum fullscreen height. Equivalent to: screen.height.</td>
    </tr>
    <tr>
        <td><b>$('elem').fsapi('isFull')</b></td>
        <td>bool</td>
        <td>Returns true if any element has fullscreen status. Otherwise returns false.</td>
    </tr>
</table>

## History

This code was forked from Martin Angelov's *[jQuery-FullScreen](https://github.com/martinaglv/jQuery-FullScreen)*

