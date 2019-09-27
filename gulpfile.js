const gulp=require("gulp");//引入gulp模块
const connect=require("gulp-connect");//引入服务器模块
const sass=require("gulp-sass");//将sass转换css
const sourcemaps=require("gulp-sourcemaps");//让sass和css关联的模块
const concat=require("gulp-concat");//合并js文件
const uglify=require("gulp-uglify");//压缩js文件
const rename=require("gulp-rename");//重命名
const babel = require("gulp-babel");//转js版本
const cleanCss=require("gulp-clean-css")//压缩css

//拷贝各种文件，js先转在压缩，sass先转再放

gulp.task("html",function(){
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
	
})

gulp.task("sass",function(){
	gulp.src("sass/*.scss").pipe(gulp.dest("dist/css"));
})

gulp.task("js",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/css"))
	.pipe(uglify())
	.pipe(rename({
		suffix:".min",
		extname:".js"
	}))
	.pipe(gulp.dest("dist/js"));
})



gulp.task("build",["html","sass","js"]);

gulp.task("watch",function(){
	gulp.watch(["*.html","sass/*.scss","js/*.js"],["html","sass","js"]);
})

gulp.task("server",function(){
	connect.server({ 
		root:"dist",
		livereload:true 
	}); 
})

gulp.task("default",["server","watch"]);








