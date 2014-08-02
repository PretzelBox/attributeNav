var AttributeNav = function(settings){
  this.catId = settings.catId;
  this.altLayoutId = settings.altLayoutId;
  this.container = $(settings.selector);
  this.$el = $('<div></div>').html($('#attr_nav_tmpl').html()).children();
  this.attrOnClick = settings.attrOnClick;
  this.isCategoryPage = settings.isCategoryPage;
  this.groups = [];
  this.currentAttributes = [];
  
  this.cache = {
    enabled : (settings.enableCache && 'localStorage' in window && window['localStorage'] !== null),
    get : function(key){
      return JSON.parse(localStorage.getItem(key));      
    },
    set : function(key, data){
      localStorage.setItem(key, JSON.stringify(data));
    }
  };
  
  this.init();
};

AttributeNav.prototype = {
  init : function(){
    var self = this;
    
    this.currentAttributes = this.getCurrentAttributes();
    
    this.getAttrData(function(attrData){
      self.buildMenu(attrData);
      self.container.html(self.render());
      self.bindChanges();
    });
  },
  bindChanges : function(){
    var nav = this;
    nav.container.on('click', '.attr-group-rpt>*', {
      currentAttributes : nav.currentAttributes
    }, this.attrOnClick)
  },
  buildMenu : function(attrData){
    this.groups = attrData;
  },
  render : function(){
    for (var i = 0; i < this.groups.length; i++) {
      this.$el.append( this.groups[i].render() );
    };
    
    return this.$el;
  },
  getCurrentAttributes : function(){
    var currentAttributes = [],
        urlParams = {},
        match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
    
    urlParams = {};
    while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);
    
    if('Attribs' in urlParams)
      currentAttributes = urlParams['Attribs'].split(' ');
    
    return currentAttributes;
  },
  getAttrData : function(callback){
    var self = this,
        data = null;
    
    if(this.cache.enabled)
      data = this.cache.get('attributeMenu');
    
    if(data !== null)
      callback(data);
    else {
      
      $.get(this.getAjaxUrl(), function(r){
        var groups = [];
        $(r).find('.AttributeNavigationLinks li').each(function(){
          
          if( $(this).find('.ControlHeader').length > 0 ){
            
            var attrGroupDD = new AttributeGroupDD($(this).find('.ControlHeader').text().trim(), self);
            groups.push(attrGroupDD);
            
          } else {
            
            var $attr = $(this),
                name = $attr.find('.attribute-link').text().trim(),
                id = $attr.find('input[type=hidden]').val(),
                count = $attr.find('.attribute-product-count').text().trim();
            
            groups[ groups.length-1 ].attributes.push(new Attribute(name, count, id, self));
            
          }
        });
        
        if(self.cache.enabled)
          self.cache.set('attributeMenu', groups);
        
        if(callback)
          callback(groups);
      });
      
    }
  },
  getAjaxUrl : function(){
    return this.getNavigationUrl( this.currentAttributes )+ '&previewlayoutid=' + this.altLayoutId
    //return '/store/c/' + this.catId + '-.aspx?previewlayoutid=' + this.altLayoutId;
    
  },
  getNavigationUrl : function(attrIds){
    return '/store/c/' + this.catId + '-.aspx?Attribs=' + attrIds.join('+');    
  }
};