var AttributeGroupDD = function(name, nav){
  this.name = name;
  this.attributes = [];
  this.$el = $('<div></div>').html($('#attr_dd_tmpl').html()).children();
  this.nav = nav;
  
  this.defaultAttribute = new Attribute('Select', 'default', nav);
}

AttributeGroupDD.prototype = {
  render : function(){
    this.$el.find('.attr-group-name').text(this.name);
    
    //this.$el.find('.attr-group-rpt').append( this.defaultAttribute.render() );
    
    for (var i = 0; i < this.attributes.length; i++)
      this.$el.find('.attr-group-rpt').append( this.attributes[i].render() );
    
    return this.$el;
  }
};

