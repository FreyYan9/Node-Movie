module.exports = function(grunt){

	grunt.initConfig({
		watch : {
			jade : {
				files : ['views/**'], // 监视views文件夹下边的所有文件, 如果出现改动则重新启动
				options : {
					livereload : true // 当文件出现改动时会重新启动服务
				}
			},
			js : {
				files : ['public/libs/**','models/**/*.js','schemas/**/*.js'], // 监视libs、models、schemas文件夹下边的所有文件, 如果出现改动则重新启动
				options : {
					livereload : true // 当文件出现改动时会重新启动服务
				}
			}
		},


		nodemon : {
			dev : {
				options : {
					file : "app.js",
					args : [],
					ignoredFiles : ["README.md","node_modules/**",".DS_Store"],
					watchedExtensions : ["js"],
					// watchedFolders : ["app","config"],
					watchedFolders : ["./"],
					debug : true,
					delayTime : 1,
					env : {
						PORT : 3000
					},
					cwd : __dirname
				},
			},
		},

		mochaTest : {
			options : {
				reporter : "spec"
			},
			src : ['test/**/*.js']
		},

		concurrent : {
			tasks : ["nodemon" , "watch"],
			options : {
				logConcurrentOutput : true
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");// 如果对文件有添加、修改、删除等操作，重新执行注册好的任务
	grunt.loadNpmTasks("grunt-nodemon");//实时监听， 监听app.js，如果app.js有改动，会自动重启app.js
	grunt.loadNpmTasks("grunt-concurrent");//针对慢任务， 如less 、sass
	grunt.loadNpmTasks("grunt-mocha-test");//针对慢任务， 如less 、sass

	grunt.option('force',true);//为了便于开发的时候不会因为语法的错误或者一些警告来中断grunt的整体任务

	grunt.registerTask("default",["concurrent"]);
	grunt.registerTask("test",["mochaTest"]);

}