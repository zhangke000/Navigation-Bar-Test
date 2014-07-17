/*jshint expr:true*/
/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
        banner: '/*!\n' +
            ' * Nav Bar v<%= pkg.version %> \n' +
            ' * Copyright 2014 <%= pkg.author.name %>\n' +
            ' */\n',
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/**'],
            zipsrc: ['dist/navigation-bar-test']
        },
        less: {
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
                },
                files: {
                    'dist/css/navigation-bar-test.css': 'less/index.less'
                }
            },
            minify: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
                }
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        'dist/css/<%= pkg.name %>.css',
                        'dist/css/<%= pkg.name %>.min.css'
                    ]
                }
            }
        },

        copy: {
            zipsrc: {
                cwd: 'dist/',
                dest: 'dist/navigation-bar-test/',
                expand: true,
                src: ['**']
            }
        },
        compress: {
            zip: {
                files: [
                    {
                        cwd: 'dist/',
                        expand: true,
                        src: ['navigation-bar-test/**']
                    }
                ],
                options: {
                    archive: 'dist/navigation-bar-test.zip',
                    mode: 'zip'
                }
            }
        }

    });

	// Look ma! Load all grunt plugins in one line from package.json
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	/* -------------
		BUILD
	 ------------- */
    grunt.registerTask('default', ['clean:dist', 'less','usebanner','copy:zipsrc','compress:zip','clean:zipsrc']);

	/* -------------
		SERVE
	 ------------- */

};
