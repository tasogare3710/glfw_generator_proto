var glfw_home = os.getenv("GLFW_CMAKE_INSTALL_DIR");
var glfw_include = os.path.join(glfw_home, "include", "GLFW");

function macro(defs) {
	return defs.map((v, i, a) => `#define ${v}\n`)
}

function glfw3native_rs_file(native_access_includes, glfw3native){
return  `#ifndef _glfw3native_rs_
#define _glfw3native_rs_

#ifdef __cplusplus
extern "C" {
#endif

${macro(native_access_includes).toString().replaceAll(",", "")}
#include \"${os.path.join(glfw3native, 'glfw3.h')}\"
#include \"${os.path.join(glfw3native, 'glfw3native.h')}\"

#ifdef __cplusplus
}
#endif
#endif`
}

function emit_native(native_access_includes){
	return glfw3native_rs_file(native_access_includes, glfw_include);
}

print(emit_native(scriptArgs))
