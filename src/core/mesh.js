export function initMaterial() {
  this.uniforms = {
    u_time: new this.minigl.Uniform({
      value: 0,
    }),
    u_shadow_power: new this.minigl.Uniform({
      value: 5,
    }),
    u_darken_top: new this.minigl.Uniform({
      value: "" === this.el.dataset.jsDarkenTop ? 1 : 0,
    }),
    u_active_colors: new this.minigl.Uniform({
      value: this.activeColors,
      type: "vec4",
    }),
    u_global: new this.minigl.Uniform({
      value: {
        noiseFreq: new this.minigl.Uniform({
          value: [this.freqX, this.freqY],
          type: "vec2",
        }),
        noiseSpeed: new this.minigl.Uniform({
          value: 5e-6,
        }),
      },
      type: "struct",
    }),
    u_vertDeform: new this.minigl.Uniform({
      value: {
        incline: new this.minigl.Uniform({
          value: Math.sin(this.angle) / Math.cos(this.angle),
        }),
        offsetTop: new this.minigl.Uniform({
          value: -0.5,
        }),
        offsetBottom: new this.minigl.Uniform({
          value: -0.5,
        }),
        noiseFreq: new this.minigl.Uniform({
          value: [3, 4],
          type: "vec2",
        }),
        noiseAmp: new this.minigl.Uniform({
          value: this.amp,
        }),
        noiseSpeed: new this.minigl.Uniform({
          value: 10,
        }),
        noiseFlow: new this.minigl.Uniform({
          value: 3,
        }),
        noiseSeed: new this.minigl.Uniform({
          value: this.seed,
        }),
      },
      type: "struct",
      excludeFrom: "fragment",
    }),
    u_baseColor: new this.minigl.Uniform({
      value: this.sectionColors[0],
      type: "vec3",
      excludeFrom: "fragment",
    }),
    u_waveLayers: new this.minigl.Uniform({
      value: [],
      excludeFrom: "fragment",
      type: "array",
    }),
  }
  for (let e = 1; e < this.sectionColors.length; e += 1) {
    this.uniforms.u_waveLayers.value.push(
      new this.minigl.Uniform({
        value: {
          color: new this.minigl.Uniform({
            value: this.sectionColors[e],
            type: "vec3",
          }),
          noiseFreq: new this.minigl.Uniform({
            value: [
              2 + e / this.sectionColors.length,
              3 + e / this.sectionColors.length,
            ],
            type: "vec2",
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 11 + 0.3 * e,
          }),
          noiseFlow: new this.minigl.Uniform({
            value: 6.5 + 0.3 * e,
          }),
          noiseSeed: new this.minigl.Uniform({
            value: this.seed + 10 * e,
          }),
          noiseFloor: new this.minigl.Uniform({
            value: 0.1,
          }),
          noiseCeil: new this.minigl.Uniform({
            value: 0.63 + 0.07 * e,
          }),
        },
        type: "struct",
      })
    )
  }
  return (
    (this.vertexShader = [
      this.shaderFiles.noise,
      this.shaderFiles.blend,
      this.shaderFiles.vertex,
    ].join("\n\n")),
    new this.minigl.Material(
      this.vertexShader,
      this.shaderFiles.fragment,
      this.uniforms
    )
  )
}
export function initMesh() {
  this.material = this.initMaterial()
  this.geometry = new this.minigl.PlaneGeometry()
  this.mesh = new this.minigl.Mesh(this.geometry, this.material)
}