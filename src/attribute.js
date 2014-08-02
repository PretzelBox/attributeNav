var Attribute = function(name, count, id, nav){
  this.name = name;
  this.count = count;
  this.id = id;
  this.nav = nav;
  this.template = $('#attr_tmpl').html();
  this.merger = new MergeHelper(this.template, [
    {
      tag : 'ATTRNAME',
      property : 'name'
    },
    {
      tag : 'ATTRID',
      property : 'id'
    },
    {
      tag : 'ATTRCOUNT',
      property : 'count'
    }
  ]);
}


Attribute.prototype = {
  render : function(){
    var $node = this.merger.domBuilder(this);
    
    if(this.nav.currentAttributes.indexOf(this.id) > -1)
      $node.addClass('active-attr');
    
    return $node;
  }
};