"use client";

import { useEffect, useRef } from "react";

/**
 * Rotierender Gold-Ring als transparenter Hintergrund, gescopt auf den
 * Eltern-Container. Aspekt-korrigiert (echter Kreis), alpha-geblendet
 * (nur der Ring zeichnet, Rest transparent), pausiert off-screen.
 * Quelle: 21st.dev animated-glassy-pricing ShaderCanvas, angepasst.
 */

const vsSource = `attribute vec2 aPosition; void main(){ gl_Position = vec4(aPosition,0.0,1.0); }`;

const fsSource = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;

  mat2 rotate2d(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
  float variation(vec2 v1,vec2 v2,float strength,float speed){
    return sin(dot(normalize(v1),normalize(v2))*strength + iTime*speed)/100.0;
  }
  float paintCircle(vec2 p, vec2 center, float rad, float width){
    vec2 diff = center - p;
    float len = length(diff);
    len += variation(diff, vec2(0.,1.), 5., 2.);
    len -= variation(diff, vec2(1.,0.), 5., 2.);
    return smoothstep(rad-width, rad, len) - smoothstep(rad, rad+width, len);
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 p = uv - 0.5;
    p.x *= iResolution.x / iResolution.y;   // Aspekt-Korrektur -> echter Kreis
    vec2 center = vec2(0.0);
    float radius = 0.32;

    float mask = 0.0;
    mask += paintCircle(p, center, radius, .035);
    mask += paintCircle(p, center, radius-.018, .01);
    mask += paintCircle(p, center, radius+.018, .005);

    // rotierender Gold-Verlauf um den Ring
    vec2 v = rotate2d(iTime) * p;
    float g = clamp(0.5 + 0.5*(v.x + v.y)/radius, 0.0, 1.0);
    vec3 gold = mix(vec3(0.55,0.40,0.14), vec3(0.96,0.82,0.50), g);

    float hi = paintCircle(p, center, radius, .003);   // heller Innen-Strich
    vec3 col = mix(gold, vec3(1.0,0.97,0.90), hi);

    float alpha = clamp(mask + hi, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function AnimatedRingBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) { console.warn("WebGL not supported."); return; }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Ring shader compile:", gl.getShaderInfoLog(s));
        gl.deleteShader(s); return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Ring shader link:", gl.getProgramInfoLog(program)); return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    let visible = true;
    const render = (time: number) => {
      if (!visible) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(render);
      else if (!visible) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? "absolute inset-0 h-full w-full"} />;
}
