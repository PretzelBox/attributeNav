var MergeHelper = function(template, merges){
  this.template = template;
  this.mergeData = merges;
}

MergeHelper.prototype = {
  domBuilder : function(data){
    var html = this.merge( data );
    
    return $('<div></div>').html(html).children();
  },
  merge : function(data){
    
    for(var i=this.mergeData.length-1; i>=0; i--){
      var reg = new RegExp(this.mergeData[i].tag,"g");
      this.template = this.template.replace(reg, data[this.mergeData[i].property] );
    }
    
    return this.template;
  }
};
