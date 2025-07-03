attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    vec3 offset = vec3(aVertexPosition.x, aVertexPosition.y  , aVertexPosition.y  * aVertexPosition.y * sin(timeFactor * 0.05) * 0.1  );
    gl_Position = uPMatrix * uMVMatrix * vec4(offset, 1.0);
}