var join = os.path.join;

var glfw_home = os.getenv("GLFW_CMAKE_INSTALL_DIR");
var glfw_include = join(glfw_home, "include", "GLFW");

function emit_command(output, header) {
	var b_opt = `--no-doc-comments --default-macro-constant-type signed --allowlist-type GLFW.* --allowlist-function glfw.* --allowlist-var GLFW_.* -o ${output} ${header}`
	var comp_opt = `-DGLFW_INCLUDE_NONE`
	return `bindgen ${b_opt} -- ${comp_opt}`
}

function emit_api(output){
	return emit_command(join(output, "glfw3.rs"), join(glfw_include, "glfw3.h"))
}

var r=os.system(emit_api(join("..", "src")));
quit(r)
