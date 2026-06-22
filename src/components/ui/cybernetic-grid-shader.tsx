"use client";

import { useEffect, useRef } from "react";

/**
 * Cybernetic-Grid als raw WebGL (kein three.js), gescopt auf den Container,
 * Sabala-Gold statt Blau/Pink, transparent (nur die Linien zeichnen -> Underlayer),
 * mit Maus-Warp/Glow. Pausiert off-screen.
 * Quelle: 21st.dev cybernetic-grid-shader, nach raw-WebGL portiert + gebrandet.
 */

const vsSource = `attribute vec2 aPosition; void main(){ gl_Position = vec4(aPosition,0.0,1.0); }`;

const fsSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;

  float random(vec2 st){ return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123); }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5*iResolution.xy)/iResolution.y;
    vec2 mouse = (iMouse - 0.5*iResolution.xy)/iResolution.y;

    float t = iTime*0.2;
    float md = length(uv - mouse);

    float warp = sin(md*20.0 - t*4.0)*0.1;
    warp *= smoothstep(0.4, 0.0, md);
    uv += warp;

    vec2 g = abs(fract(uv*10.0) - 0.5);
    float line = pow(1.0 - min(g.x, g.y), 50.0);

    vec3 gridColor = vec3(0.83, 0.66, 0.32);            // Sabala-Gold
    vec3 color = gridColor * line * (0.55 + sin(t*2.0)*0.2);

    float energy = sin(uv.x*20.0 + t*5.0) * sin(uv.y*20.0 + t*3.0);
    energy = smoothstep(0.8, 1.0, energy);
    color += vec3(1.0, 0.82, 0.45) * energy * line;     // warmer Gold-Puls statt Pink

    float glow = smoothstep(0.12, 0.0, md);
    color += vec3(1.0, 0.95, 0.85) * glow * 0.45;

    color += random(uv + t*0.1) * 0.04;

    float a = clamp(max(color.r, max(color.g, color.b)), 0.0, 1.0);
    gl_FragColor = vec4(color, a);
  }
`;

export default function CyberneticGridShader({ className }: { className?: string }) {
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
        console.error("Grid shader compile:", gl.getShaderInfoLog(s));
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
      console.error("Grid shader link:", gl.getProgramInfoLog(program)); return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");
    const iMouseLoc = gl.getUniformLocation(program, "iMouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mouse = { x: 0, y: 0 };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (r.bottom - e.clientY) * dpr; // y von unten
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let visible = true;
    const start = Date.now();
    const render = () => {
      if (!visible) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(iTimeLoc, (Date.now() - start) / 1000);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.uniform2f(iMouseLoc, mouse.x, mouse.y);
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
      window.removeEventListener("mousemove", onMove);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? "absolute inset-0 h-full w-full"} />;
}
