module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
        banner :  [ '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>',
                    '    <%= pkg.author.name %>',
                    '    PretzelBox | AmeriCommerce */','' ].join(' \n')
      },
      dist: {
        src: 'src/*.js',
        dest: 'dist/<%= pkg.name %>.js',
      },
    },
    uglify: {
      options : {
        banner : '<%= concat.options.banner %>'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('reversion', 'Increment version number', function(){
    
    var BUILD_TYPES = {
      nobuild : -1,
      major : 0,
      minor : 1,
      patch : 2
    };

    // pkg is the contents of package.json.
    // versionNums is an array of the build number [0] - major version. [1] - minor version. [2] - patch number.
    // buildType will tell us the index in the array to increment based on the BUILD_TYPES object.
    var pkg = grunt.file.readJSON('package.json'),
      versionNums = pkg.version.split('.'),
      buildType = BUILD_TYPES[grunt.option('build') || 'nobuild'];

    if( buildType > -1 ){
      versionNums[ buildType ]++;

      //Reset all version points below the selected point back to zero.
      //I.e. if you bumo the minor version, reset patch version to zero.
      for (var i = buildType - 1; i >= 0; i--)
        versionNums[i] = 0;

      //Join the version number back together again and write it back to 
      //the package.json file so the rest of the tasks will have it if
      //need be. Use the overload of JSON.stringify so that the json
      //object will be human-readable again.
      pkg.version = versionNums.join('.')
      grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
    }

  });

  grunt.registerTask('build', ['concat','uglify']);

};