var join = os.path.join;

var glfw_home = os.getenv("GLFW_CMAKE_INSTALL_DIR");
var glfw_include = join(glfw_home, "include", "GLFW");

var angle_home = os.getenv("ANGLE_HOME");
var angle_include = join(angle_home, "include");

function emit_command(output, header) {
	var block_types_win32="--blocklist-type HWND --blocklist-type HWND__";
	// include id by NSGL
	var block_types_cocoa = "--blocklist-type CGDirectDisplayID --blocklist-type id";
	var block_types_x11 = "--blocklist-type Display --blocklist-type RRCrtc --blocklist-type RROutput --blocklist-type Window";
	var block_types_wayland ="--blocklist-type wl_.*";
	var block_types_osmesa ="--blocklist-type OSMesaContext";
	var block_types_wgl="--blocklist-type HGLRC";
	var block_types_glx= "--blocklist-type GLXContext --blocklist-type GLXWindow";
	var block_types_egl="--blocklist-type EGL.*";

	var block_types = `${block_types_win32} ${block_types_cocoa} ${block_types_x11} ${block_types_wayland} ${block_types_osmesa} ${block_types_wgl}  ${block_types_glx} ${block_types_egl}`;
	var b_opt = `--no-doc-comments --default-macro-constant-type signed ${block_types} --allowlist-type GLFW.* --allowlist-function glfw.* --allowlist-var GLFW_.* -o ${output} ${header}`
	var comp_opt = `-DGLFW_INCLUDE_NONE -I${angle_include}`
	return `bindgen ${b_opt} -- ${comp_opt}`
}

function emit_api(output, input){
	return emit_command(join(output, "glfw3native.rs"), join(input, "glfw3native_rs.h"))
}

var r=os.system(emit_api(join("..", "src"), "."));
quit(r)


//print(emit_api(join("..", "src"), "."))