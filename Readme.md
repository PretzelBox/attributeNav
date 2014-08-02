#attributeNav

attributeNav lets you use an existing attribute filter widget to power a more flexibly layout'd filter that can be used anywhere on your site (by providing a default category to direct the filter to). 

###Attribute Nav Template

```
<script type="x/template" id="attr_nav_tmpl">
  <ul class="attr-grp-rpt nav navbar-nav"></ul>
</script>
```

The element with the class of `attr-grp-rpt` will have the groups `.appendTo()`'d to it.


###Attribute Group Template

```
<script type="x/template" id="attr_dd_tmpl">
  <li>
    <div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="attr-group-name"></span> <span class="caret"></span>
      </button>
      <ul class="attr-group-rpt dropdown-menu" role="menu">
      </ul>
    </div>
  </li>
</script>
```

The element with the class of `attr-group-rpt` will have the individual attributes for that group `.appendTo()`'d to it. The element with the class of `attr-group-name` will contain the attribute group's name.

###Attribute Template

```
<script type="x/template" id="attr_tmpl">
  <li data-value="ATTRID">ATTRNAME <span class="pull-right badge">(ATTRCOUNT)</span></option>
</script>
```

This template will be repeated for each attribute. 
- ATTRID is the ID of the attribute. You will have to pass this back to the onclick event so that the attributes can be filtered
- ATTRNAME is the name/text of the attribute
- ATTRCOUNT is the number of products with this attribute. If `Do not limit as navigated` is enabled, then this number will reflect all products with this attribute. Otherwise, it reflects the **remaining** products that would show up if this attribute were to be applied to the filter.


###Initializing the script

```JavaScript
var AttributeNavSettings = {
	catId : 20,
	altLayoutId : 153,
	selector : '.nav-menu',
	enableCache : false,
	attrOnClick : function(event){
	  
	  var attrStr = $(this).attr('data-value');
	  
	  if(attrStr !== 'default'){
	    var indexOfThisAttr = event.data.currentAttributes.indexOf(attrStr);
	    if( indexOfThisAttr >-1){
	      
	      event.data.currentAttributes.splice(indexOfThisAttr, 1);
	      attrStr = event.data.currentAttributes.join('+');
	      
	    } else {
	      
	      if(event.data.currentAttributes.length > 0 ){
	        attrStr += '+';
	        
	        attrStr += event.data.currentAttributes.join('+');
	      }
	      
	    }
	    
	    location.href = '/store/c/20-.aspx?Attribs=' + attrStr;  
	    
	  }
	}
};
var nav = new AttributeNav( AttributeNavSettings );
```

- catId is the id of the category the filter should be directed at and pull attributes from
- altLayoutId is the layout id that contains the attribute filter widget (allows you to use an alternate layout rather than the default layout to allow cutting down the size of the page requests)
- selector is the selector used to `.append()` the menu to,
- enableCache should always be false. Caching is not fully implemented
- attrOnClick callback fired when the attribute is clicked on. Change the selector in `var attrStt` to fit your layout