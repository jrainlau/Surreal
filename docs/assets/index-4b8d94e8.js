import{H as z,a as O,r as B,o as x,c as _,b as m,w as I,v as A,F as E,d as T,n as P,p as R,e as $,f as F,g as j,h as D,i as G}from"./vendor-5ea33047.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))h(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const u of t.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&h(u)}).observe(document,{childList:!0,subtree:!0});function l(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function h(a){if(a.ep)return;a.ep=!0;const t=l(a);fetch(a.href,t)}})();class q{constructor(n,l,h,a=!1){const t=this,u=document.location.search.toLowerCase().indexOf("debug=webgl")!==-1;t.canvas=n,t.gl=t.canvas.getContext("webgl",{antialias:!0,preserveDrawingBuffer:!0}),t.meshes=[];const r=t.gl;l&&h&&this.setSize(l,h),t.lastDebugMsg,t.debug=a&&u?function(s){const c=new Date;c-t.lastDebugMsg>1e3&&console.log("---"),console.log(c.toLocaleTimeString()+Array(Math.max(0,32-s.length)).join(" ")+s+": ",...Array.from(arguments).slice(1)),t.lastDebugMsg=c}:()=>{},Object.defineProperties(t,{Material:{enumerable:!1,value:class{constructor(s,c,e={}){const o=this;function d(y,g){const f=r.createShader(y);return r.shaderSource(f,g),r.compileShader(f),r.getShaderParameter(f,r.COMPILE_STATUS)||console.error(r.getShaderInfoLog(f)),t.debug("Material.compileShaderSource",{source:g}),f}function b(y,g){return Object.entries(y).map(([f,p])=>p.getDeclaration(f,g)).join(`
`)}o.uniforms=e,o.uniformInstances=[];const v=`
              precision highp float;
            `;o.vertexSource=`
              ${v}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${b(t.commonUniforms,"vertex")}
              ${b(e,"vertex")}
              ${s}
            `,o.Source=`
              ${v}
              ${b(t.commonUniforms,"fragment")}
              ${b(e,"fragment")}
              ${c}
            `,o.vertexShader=d(r.VERTEX_SHADER,o.vertexSource),o.fragmentShader=d(r.FRAGMENT_SHADER,o.Source),o.program=r.createProgram(),r.attachShader(o.program,o.vertexShader),r.attachShader(o.program,o.fragmentShader),r.linkProgram(o.program),r.getProgramParameter(o.program,r.LINK_STATUS)||console.error(r.getProgramInfoLog(o.program)),r.useProgram(o.program),o.attachUniforms(void 0,t.commonUniforms),o.attachUniforms(void 0,o.uniforms)}attachUniforms(s,c){const e=this;s===void 0?Object.entries(c).forEach(([o,d])=>{e.attachUniforms(o,d)}):c.type=="array"?c.value.forEach((o,d)=>e.attachUniforms(`${s}[${d}]`,o)):c.type=="struct"?Object.entries(c.value).forEach(([o,d])=>e.attachUniforms(`${s}.${o}`,d)):(t.debug("Material.attachUniforms",{name:s,uniform:c}),e.uniformInstances.push({uniform:c,location:r.getUniformLocation(e.program,s)}))}}},Uniform:{enumerable:!1,value:class{constructor(s){this.type="float",Object.assign(this,s),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(s){this.value!==void 0&&r[`uniform${this.typeFn}`](s,this.typeFn.indexOf("Matrix")===0?this.transpose:this.value,this.typeFn.indexOf("Matrix")===0?this.value:null)}getDeclaration(s,c,e){const o=this;if(o.excludeFrom!==c){if(o.type==="array")return o.value[0].getDeclaration(s,c,o.value.length)+`
const int ${s}_length = ${o.value.length};`;if(o.type==="struct"){let d=s.replace("u_","");return d=d.charAt(0).toUpperCase()+d.slice(1),`uniform struct ${d} 
                                {
`+Object.entries(o.value).map(([b,v])=>v.getDeclaration(b,c).replace(/^uniform/,"")).join("")+`
} ${s}${e>0?`[${e}]`:""};`}return`uniform ${o.type} ${s}${e>0?`[${e}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(s,c,e,o,d){r.createBuffer(),this.attributes={position:new t.Attribute({target:r.ARRAY_BUFFER,size:3}),uv:new t.Attribute({target:r.ARRAY_BUFFER,size:2}),uvNorm:new t.Attribute({target:r.ARRAY_BUFFER,size:2}),index:new t.Attribute({target:r.ELEMENT_ARRAY_BUFFER,size:3,type:r.UNSIGNED_SHORT})},this.setTopology(e,o),this.setSize(s,c,d)}setTopology(s=1,c=1){const e=this;e.xSegCount=s,e.ySegCount=c,e.vertexCount=(e.xSegCount+1)*(e.ySegCount+1),e.quadCount=e.xSegCount*e.ySegCount*2,e.attributes.uv.values=new Float32Array(2*e.vertexCount),e.attributes.uvNorm.values=new Float32Array(2*e.vertexCount),e.attributes.index.values=new Uint16Array(3*e.quadCount);for(let o=0;o<=e.ySegCount;o++)for(let d=0;d<=e.xSegCount;d++){const b=o*(e.xSegCount+1)+d;if(e.attributes.uv.values[2*b]=d/e.xSegCount,e.attributes.uv.values[2*b+1]=1-o/e.ySegCount,e.attributes.uvNorm.values[2*b]=d/e.xSegCount*2-1,e.attributes.uvNorm.values[2*b+1]=1-o/e.ySegCount*2,d<e.xSegCount&&o<e.ySegCount){const v=o*e.xSegCount+d;e.attributes.index.values[6*v]=b,e.attributes.index.values[6*v+1]=b+1+e.xSegCount,e.attributes.index.values[6*v+2]=b+1,e.attributes.index.values[6*v+3]=b+1,e.attributes.index.values[6*v+4]=b+1+e.xSegCount,e.attributes.index.values[6*v+5]=b+2+e.xSegCount}}e.attributes.uv.update(),e.attributes.uvNorm.update(),e.attributes.index.update(),t.debug("Geometry.setTopology",{uv:e.attributes.uv,uvNorm:e.attributes.uvNorm,index:e.attributes.index})}setSize(s=1,c=1,e="xz"){const o=this;o.width=s,o.height=c,o.orientation=e,o.attributes.position.values&&o.attributes.position.values.length===3*o.vertexCount||(o.attributes.position.values=new Float32Array(3*o.vertexCount));const d=s/-2,b=c/-2,v=s/o.xSegCount,y=c/o.ySegCount;for(let g=0;g<=o.ySegCount;g++){const f=b+g*y;for(let p=0;p<=o.xSegCount;p++){const N=d+p*v,M=g*(o.xSegCount+1)+p;o.attributes.position.values[3*M+"xyz".indexOf(e[0])]=N,o.attributes.position.values[3*M+"xyz".indexOf(e[1])]=-f}}o.attributes.position.update(),t.debug("Geometry.setSize",{position:o.attributes.position})}}},Mesh:{enumerable:!1,value:class{constructor(s,c){const e=this;e.geometry=s,e.material=c,e.wireframe=!1,e.attributeInstances=[],Object.entries(e.geometry.attributes).forEach(([o,d])=>{e.attributeInstances.push({attribute:d,location:d.attach(o,e.material.program)})}),t.meshes.push(e),t.debug("Mesh.constructor",{mesh:e})}draw(){r.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:s,location:c})=>s.update(c)),this.attributeInstances.forEach(({attribute:s,location:c})=>s.use(c)),r.drawElements(this.wireframe?r.LINES:r.TRIANGLES,this.geometry.attributes.index.values.length,r.UNSIGNED_SHORT,0)}remove(){t.meshes=t.meshes.filter(s=>s!=this)}}},Attribute:{enumerable:!1,value:class{constructor(s){this.type=r.FLOAT,this.normalized=!1,this.buffer=r.createBuffer(),Object.assign(this,s),this.update()}update(){this.values!==void 0&&(r.bindBuffer(this.target,this.buffer),r.bufferData(this.target,this.values,r.STATIC_DRAW))}attach(s,c){const e=r.getAttribLocation(c,s);return this.target===r.ARRAY_BUFFER&&(r.enableVertexAttribArray(e),r.vertexAttribPointer(e,this.size,this.type,this.normalized,0,0)),e}use(s){r.bindBuffer(this.target,this.buffer),this.target===r.ARRAY_BUFFER&&(r.enableVertexAttribArray(s),r.vertexAttribPointer(s,this.size,this.type,this.normalized,0,0))}}}});const C=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];t.commonUniforms={projectionMatrix:new t.Uniform({type:"mat4",value:C}),modelViewMatrix:new t.Uniform({type:"mat4",value:C}),resolution:new t.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new t.Uniform({type:"float",value:1})}}setSize(n=640,l=480){this.width=n,this.height=l,this.canvas.width=n,this.canvas.height=l,this.gl.viewport(0,0,n,l),this.commonUniforms.resolution.value=[n,l],this.commonUniforms.aspectRatio.value=n/l,this.debug("MiniGL.setSize",{width:n,height:l})}setOrthographicCamera(n=0,l=0,h=0,a=-2e3,t=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(a-t),0,n,l,h,1],this.debug("setOrthographicCamera",this.commonUniforms.projectionMatrix.value)}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(n=>n.draw())}}function V(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:this.el.dataset.jsDarkenTop===""?1:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let i=1;i<this.sectionColors.length;i+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[i],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+i/this.sectionColors.length,3+i/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*i}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*i}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*i}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*i})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}function H(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}const w=1263106;class k{constructor(...n){this.angle=0,this.freqDelta=1e-5,this.freqX=14e-5,this.freqY=29e-5,this.width=void 0,this.height=void 0,this.seed=5,this.t=w,this.xSegCount=void 0,this.ySegCount=void 0,this.sectionColors=void 0,this.shaderFiles=void 0,this.uniforms=void 0,this.vertexShader=void 0,this.conf=void 0,this.el=void 0,this.geometry=void 0,this.material=void 0,this.mesh=void 0,this.minigl=void 0,this.amp=100,this.activeColors=[1,1,1,1],this.shaderFiles={vertex:`varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  //
  // Tilting the plane
  //

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  //
  // Vertex noise
  //

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  //
  // Vertex color, to be passed to fragment shader
  //

  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  //
  // Finish
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,noise:`//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}`,blend:`//
// https://github.com/jamieowen/glsl-blend
//

// Normal

vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen

float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay

float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard light

vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft light

float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Color dodge

float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Color burn

float blendColorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light

float blendVividLight(float base, float blend) {
	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear burn

float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear dodge

float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear light

float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}`,fragment:`varying vec3 v_color;

void main() {
  vec3 color = v_color;
  if (u_darken_top == 1.0) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
  }
  gl_FragColor = vec4(color, 1.0);
}`},this.conf={wireframe:!1,density:[.06,.16],playing:!0},this.initMaterial=V.bind(this),this.initMesh=H.bind(this)}animate(n){this.t+=100,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render(),this.conf.playing&&requestAnimationFrame(()=>{this.animate()})}render(n=0){this.t+=n*1e3,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render()}getMeshId(){return Number(((this.t-w)/1e3).toFixed(0))}setMeshId(n){this.t=w+n*1e3,this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render()}changeColor(n=[]){this.initGradientColors(n),this.initMesh(),this.resize(),this.render()}pause(){this.conf.playing=!1}play(){this.animate(),this.conf.playing=!0}initGradient({el:n,colors:l,meshId:h}){this.el=n,this.minigl=new q(this.el,null,null,!0),this.initGradientColors(l),this.initMesh(),this.resize(),this.setMeshId(h)}initGradientColors(n){this.sectionColors=n.map(l=>l&&`0x${l.substr(1)}`).map(X)}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.minigl.setSize(this.width,this.height),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}}function X(i){return[(i>>16&255)/255,(i>>8&255)/255,(255&i)/255]}function Y(i){const n=parseInt(i.slice(1,3),16),l=parseInt(i.slice(3,5),16),h=parseInt(i.slice(5,7),16);return[n,l,h]}function W(i,n,l,h){function a(u){const r=u.toString(16);return r.length==1?0+r:r}return"#"+a(i)+a(n)+a(l)}function K(i){const n=Y(i),l=O(...n);return z.fromInt(l)}function S(i,n,l){const h=z.from(i,n,l),{argb:a}=h,{r:t,g:u,b:r,a:C}=B(a);return W(t,u,r)}function J(i){const n=K(i),{hue:l,chroma:h,tone:a}=n,t=S(l+30,h,a),u=S(l+60,h,a),r=S(l+90,h,a);return[i,t,u,r]}const U=(i,n)=>{const l=i.__vccOpts||i;for(const[h,a]of n)l[h]=a;return l},Q={props:{colors:Array,meshId:Number},data(){return{colorList:[void 0,void 0,void 0,void 0],autoColor:!1,curMeshId:0}},created(){this.colorList=this.colors,this.curMeshId=this.meshId},watch:{meshId(i){this.curMeshId=i}},methods:{getColor(i){return`background-color: ${this.colorList[i]||"transparent"};`},updateMeshId(){this.$emit("meshIdChange",this.curMeshId)},exportImage(){this.$emit("exportImage")},onColorChange(){this.$emit("colorChange",this.colorList)},autoGenerateColors(){const[i]=this.colorList,n=J(i);console.log(n),this.colorList=n,this.onColorChange()}}},Z={class:"color-picker"},ee={class:"console"},ne={class:"mesh-id"},te={class:"colors"},oe=["onUpdate:modelValue"];function ie(i,n,l,h,a,t){return x(),_("div",Z,[m("div",ee,[m("div",ne,[I(m("input",{type:"text",pattern:"\\d*",inputmode:"numeric","onUpdate:modelValue":n[0]||(n[0]=u=>a.curMeshId=u),onInput:n[1]||(n[1]=(...u)=>t.updateMeshId&&t.updateMeshId(...u))},null,544),[[A,a.curMeshId]])]),m("ul",te,[(x(),_(E,null,T(4,u=>m("li",{class:"color",style:P(t.getColor(u-1))},[I(m("input",{type:"color","onUpdate:modelValue":r=>a.colorList[u-1]=r,onBlur:n[2]||(n[2]=(...r)=>t.onColorChange&&t.onColorChange(...r))},null,40,oe),[[A,a.colorList[u-1]]])],4)),64)),m("li",{class:"color",onClick:n[3]||(n[3]=(...u)=>t.autoGenerateColors&&t.autoGenerateColors(...u))},"A")])]),m("div",{class:"export",onClick:n[4]||(n[4]=(...u)=>t.exportImage&&t.exportImage(...u))}," EXPORT ")])}const re=U(Q,[["render",ie],["__scopeId","data-v-86fcbf00"]]);const se={props:{url:String},methods:{closePreview(i){i.target.classList.contains("preview-mask")&&this.$emit("close")}}},ae=i=>(R("data-v-11b7d475"),i=i(),$(),i),le={class:"preview"},ce=["src"],de=ae(()=>m("div",null,"Long press to save this wallpaper",-1));function ue(i,n,l,h,a,t){return x(),_("div",{class:"preview-mask",onClick:n[0]||(n[0]=(...u)=>t.closePreview&&t.closePreview(...u))},[m("div",le,[m("img",{src:l.url},null,8,ce),de])])}const he=U(se,[["render",ue],["__scopeId","data-v-11b7d475"]]);let L=null;const be={components:{ColorPicker:re,ImagePreview:he},data(){return{gradient:null,meshId:616,colors:["#0099ff","#8489ff","#bd76f0","#e26abc"],imgUrl:""}},mounted(){this.gradient=new k;const i=this.$refs.canvas;this.gradient.initGradient({el:i,colors:this.colors,meshId:this.meshId}),window.gradient=this.gradient,i.addEventListener("touchstart",this.onTouchstart),i.addEventListener("touchmove",this.onTouchMove)},methods:{onTouchStart(i){i.preventDefault(),L=i.touches[0].pageX},onTouchMove(i){const n=i.touches[0].pageX,l=n-L;L=n,this.reRender(l),this.meshId=this.gradient.getMeshId()},reRender(i){this.gradient.render(i)},onMeshIdChange(i){console.log(i),this.gradient.setMeshId(i)},onColorChange(i){var n;(n=this.gradient)==null||n.changeColor(i)},onExportImage(){const n=this.$refs.canvas.toDataURL();this.imgUrl=n},closePreview(){this.imgUrl=""}}},ve={class:"canvas-wrapper"},me={ref:"canvas"};function ge(i,n,l,h,a,t){const u=D("ColorPicker"),r=D("ImagePreview");return x(),_(E,null,[m("div",ve,[m("canvas",me,null,512)]),F(u,{colors:a.colors,meshId:a.meshId,onMeshIdChange:t.onMeshIdChange,onColorChange:t.onColorChange,onExportImage:t.onExportImage},null,8,["colors","meshId","onMeshIdChange","onColorChange","onExportImage"]),I(F(r,{url:a.imgUrl,onClose:t.closePreview},null,8,["url","onClose"]),[[j,a.imgUrl]])],64)}const fe=U(be,[["render",ge]]);G(fe).mount("#app");
