module.exports = function (grunt) {
  grunt.initConfig({
  express: {
    options: {
      // Override defaults here 
    },
    dev: {
      options: {
        script: 'gccs.js'
      }
    }
  }
  });
grunt.loadNpmTasks('grunt-express-server');

grunt.initConfig({
  watch: {
    express: {
      files:  [ '**/*.js' ],
      tasks:  [ 'express:dev' ],
      options: {
        spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded 
      }
    }
  }
});
 
grunt.registerTask('server', [ 'express:dev', 'watch' ])
watch: {
  options: {
    livereload: true
  },
  express: {
    files:  [ '**/*.js' ],
    tasks:  [ 'express:dev' ],
    options: {
      spawn: false
    }
  },
  less: {
    files: ["public/**/*.less"],
    tasks: ["less"],
    options: {
      livereload: false
    }
  },
  public: {
    files: ["public/**/*.css", "public/**/*.js"]
  }
}
};