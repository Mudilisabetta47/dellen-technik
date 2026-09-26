/**
 * Dent-Engine – rendert eine glänzende Karosseriefläche per WebGL.
 *
 * Kein 3D-Modell, kein Foto: Die Fläche ist ein Höhenfeld. Aus dessen Gefälle
 * entsteht die Flächennormale, an der ein Studio-Licht (Softboxen, Lichtstreifen)
 * gespiegelt wird. Eine Delle verbiegt deshalb die Lichtlinien – genau so, wie
 * ein Karosseriebauer Dellen im Streiflicht erkennt. Die Reparatur läuft in
 * mehreren „Zügen“ zurück, die Reflexion wird wieder gerade.
 *
 * Alles wird über wenige Uniforms gesteuert; React rendert nichts pro Frame.
 */

export type DentPreset = 'single' | 'hail' | 'large' | 'clean';

export type DentState = {
  /** 0–1: Delle entsteht (Werte >1 erlaubt: Einschlag-Überschwinger). */
  form: number;
  /** 0–1: Reparatur-Fortschritt. */
  repair: number;
  /** 0–1: Analyse-Overlay (Messrahmen, Scan-Linie). */
  mark: number;
  /** Position des Glanzlichts (0–1 = über die Fläche, <0 oder >1 = aus). */
  sweep: number;
  /** 0–1: Werkzeug-/Druckpunkt sichtbar. */
  tool: number;
  /** 0–1: Einschlag-Welle (Ausbreitung). */
  ripple: number;
  /** Sekunden – für ruhige Lichtdrift. */
  time: number;
  /** Zeigerposition −1…1 – verschiebt das Licht minimal. */
  look: [number, number];
};

export const DEFAULT_STATE: DentState = {
  form: 0,
  repair: 0,
  mark: 0,
  sweep: -1,
  tool: 0,
  ripple: 0,
  time: 0,
  look: [0, 0],
};

type Dent = { u: number; v: number; r: number; d: number };

/** Delle-Positionen in UV (0–1), Radius in Flächenhöhen, Tiefe relativ. */
const PRESETS: Record<DentPreset, Dent[]> = {
  single: [{ u: 0.6, v: 0.5, r: 0.25, d: 0.075 }],
  large: [
    { u: 0.58, v: 0.5, r: 0.42, d: 0.075 },
    { u: 0.36, v: 0.66, r: 0.12, d: 0.03 },
  ],
  hail: [
    { u: 0.3, v: 0.32, r: 0.073, d: 0.017 },
    { u: 0.47, v: 0.55, r: 0.086, d: 0.025 },
    { u: 0.62, v: 0.3, r: 0.065, d: 0.020 },
    { u: 0.76, v: 0.6, r: 0.082, d: 0.023 },
    { u: 0.22, v: 0.68, r: 0.060, d: 0.018 },
    { u: 0.55, v: 0.78, r: 0.069, d: 0.020 },
    { u: 0.86, v: 0.36, r: 0.056, d: 0.018 },
    { u: 0.38, v: 0.48, r: 0.052, d: 0.016 },
    { u: 0.7, v: 0.45, r: 0.052, d: 0.016 },
  ],
  clean: [],
};

const MAX_DENTS = 9;

export const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

export const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;

uniform vec2  uRes;
uniform float uTime;
uniform float uForm;
uniform float uRepair;
uniform float uMark;
uniform float uSweep;
uniform float uTool;
uniform float uRipple;
uniform vec2  uLook;
uniform float uCount;
uniform vec4  uDents[${MAX_DENTS}];   // x,y (Flächenkoordinaten), radius, tiefe
uniform vec2  uToolPos;               // Flächenkoordinaten
uniform float uAspect;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Reparatur in mehreren „Zügen“: Stufen mit weichem Übergang.
float steppedRepair(float r) {
  float s = clamp(r, 0.0, 1.0) * 6.0;
  float st = floor(s) + smoothstep(0.12, 0.88, fract(s));
  return clamp(st / 6.0, 0.0, 1.0);
}

float baseHeight(vec2 p) {
  float h = -0.085 * (p.x * p.x * 0.55 + p.y * p.y * 0.42);
  // Karosserielinie (leichte Schulter) – sorgt für einen echten Lichtverlauf.
  float line = (p.y + 0.36 - 0.11 * p.x) / 0.07;
  h += 0.02 * exp(-line * line);
  return h;
}

float heightAt(vec2 p, float rs) {
  float h = baseHeight(p);
  for (int i = 0; i < ${MAX_DENTS}; i++) {
    if (float(i) >= uCount) break;
    vec4 d = uDents[i];
    vec2 q = (p - d.xy) / d.z;
    float r2 = dot(q, q);
    if (r2 > 9.0) continue;
    float seed = float(i) * 1.7;
    q += 0.16 * vec2(sin(q.y * 2.3 + seed), cos(q.x * 2.1 + seed * 1.3));
    r2 = dot(q, q);
    float bowl = exp(-r2 * 1.35);
    float rr = sqrt(r2) - 1.55;
    float rim = exp(-rr * rr * 3.2);
    // Rest-Unebenheiten während der Reparatur: verschwinden zum Ende hin.
    float n = vnoise(q * 2.6 + seed) - 0.5;
    float local = clamp(rs + n * 0.32 * sin(3.14159 * clamp(rs, 0.0, 1.0)), 0.0, 1.0);
    float amt = uForm * (1.0 - local);
    h += d.w * amt * (-bowl + 0.17 * rim);
  }
  // Einschlag-Welle
  if (uRipple > 0.001 && uCount > 0.5) {
    float dist = length(p - uDents[0].xy);
    float front = uRipple * 1.5;
    float w = (dist - front) * 4.5;
    h += 0.0085 * sin((dist - front) * 30.0) * exp(-w * w) * (1.0 - uRipple);
  }
  return h;
}

float softbox(vec2 r, vec2 c, vec2 hs, float soft) {
  vec2 d = abs(r - c) - hs;
  float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  return 1.0 - smoothstep(-soft, soft, dist);
}

vec3 environment(vec2 r) {
  float ca = cos(-0.14), sa = sin(-0.14);
  r = mat2(ca, -sa, sa, ca) * r;
  vec3 col = mix(vec3(0.006, 0.008, 0.011), vec3(0.05, 0.058, 0.072), smoothstep(-1.0, 1.0, r.y));
  // großes Deckenlicht (weicher Verlauf)
  col += softbox(r, vec2(-0.2 + uLook.x * 0.08, 0.95), vec2(1.7, 0.42), 0.34) * vec3(1.0, 0.98, 0.95) * 0.95;
  // Haupt-Leuchtstreifen
  col += softbox(r, vec2(0.05, 0.30), vec2(2.4, 0.042), 0.05) * vec3(0.96, 0.98, 1.0) * 1.25;
  col += softbox(r, vec2(0.0, 0.58), vec2(2.4, 0.016), 0.02) * vec3(0.96, 0.98, 1.0) * 0.75;
  col += softbox(r, vec2(0.0, -0.22), vec2(2.4, 0.022), 0.03) * vec3(0.96, 0.98, 1.0) * 0.8;
  // feine Zweitlinie
  col += softbox(r, vec2(0.0, 0.02), vec2(2.4, 0.010), 0.014) * vec3(0.96, 0.98, 1.0) * 0.9;
  // Bodenreflex
  col += softbox(r, vec2(0.0, -0.75), vec2(2.4, 0.26), 0.34) * vec3(0.8, 0.85, 0.95) * 0.30;
  // Marken-Akzent
  col += softbox(r, vec2(0.62 + uLook.x * 0.1, -0.36), vec2(0.55, 0.030), 0.045) * vec3(1.0, 0.42, 0.10) * 1.1;
  return col;
}

// Dünne Linie (Abstand d, Breite w)
float lineAA(float d, float w) {
  return 1.0 - smoothstep(w * 0.6, w, abs(d));
}

void main() {
  vec2 uv = vUv;
  vec2 p = (uv * 2.0 - 1.0) * vec2(uAspect, 1.0);

  float rs = steppedRepair(uRepair);
  float e = 0.0035;
  float hx1 = heightAt(p + vec2(e, 0.0), rs);
  float hx0 = heightAt(p - vec2(e, 0.0), rs);
  float hy1 = heightAt(p + vec2(0.0, e), rs);
  float hy0 = heightAt(p - vec2(0.0, e), rs);
  vec2 grad = vec2(hx1 - hx0, hy1 - hy0) / (2.0 * e);

  vec3 n = normalize(vec3(-grad * 1.55, 1.0));
  vec2 refl = n.xy * 2.0 + p * 0.30 + uLook * 0.04 + vec2(sin(uTime * 0.25) * 0.03, 0.0);

  vec3 env = environment(refl);

  // Lack: dunkles Metallic-Graphit, Klarlack-Reflexion darüber.
  float ndl = clamp(dot(n, normalize(vec3(-0.35, 0.55, 0.75))), 0.0, 1.0);
  vec3 base = vec3(0.030, 0.034, 0.042) * (0.55 + 0.9 * ndl);
  float fres = 0.55;
  vec3 col = base + env * fres;

  // Metallic-Flakes: funkeln nur dort, wo Licht auf der Fläche liegt.
  float fl = hash21(floor(gl_FragCoord.xy / 1.6));
  float lum = dot(env, vec3(0.3, 0.55, 0.15));
  col += vec3(pow(fl, 26.0)) * (0.02 + 0.32 * lum);

  // Glanzlicht-Sweep (Finish)
  if (uSweep > -0.5 && uSweep < 1.5) {
    float sd = uv.x * 0.82 + uv.y * 0.34 - (uSweep * 1.5 - 0.2);
    float band = exp(-sd * sd * 60.0);
    col += vec3(1.0, 0.96, 0.9) * band * (0.16 + 0.95 * lum) * 1.25;
  }

  // Werkzeug / Druckpunkt
  if (uTool > 0.001) {
    vec2 tp = p - uToolPos;
    float td = length(tp);
    col += vec3(1.0, 0.45, 0.12) * exp(-td * td * 140.0) * uTool * 0.55;
    col += vec3(1.0, 0.85, 0.65) * exp(-td * td * 1800.0) * uTool * 0.9;
    float ring = lineAA(td - 0.085, 0.006) * uTool * 0.6;
    col += vec3(1.0, 0.5, 0.15) * ring;
  }

  // Analyse-Overlay: Eckklammern + Fadenkreuz + Scan-Linie um die erste Delle.
  if (uMark > 0.001 && uCount > 0.5) {
    vec4 d0 = uDents[0];
    vec2 c = d0.xy;
    vec2 q = abs(p - c);
    float b = d0.z * 1.3;
    float L = b * 0.34;
    float t = 0.0042;
    float h = lineAA(q.y - b, t) * step(b - L, q.x) * step(q.x, b + t);
    float v = lineAA(q.x - b, t) * step(b - L, q.y) * step(q.y, b + t);
    float brackets = max(h, v);
    vec2 pc = p - c;
    float crossHair = max(lineAA(pc.x, t) * step(abs(pc.y), 0.035), lineAA(pc.y, t) * step(abs(pc.x), 0.035));
    // Messskala links und rechts
    float ticks = 0.0;
    for (int k = 0; k < 7; k++) {
      float ty = -b + (float(k) + 0.5) * (2.0 * b / 7.0);
      float len = (mod(float(k), 2.0) < 1.0) ? 0.03 : 0.016;
      ticks += lineAA(pc.y - ty, t) * step(b + 0.02, q.x) * step(q.x, b + 0.02 + len);
    }
    float scanY = c.y + sin(uTime * 1.6) * b * 0.92;
    float sy = (p.y - scanY) * 46.0;
    float scan = exp(-sy * sy) * step(q.x, b) * step(q.y, b + 0.02);
    float ov = clamp(brackets + crossHair * 0.9 + ticks * 0.8, 0.0, 1.0);
    col = mix(col, vec3(1.0, 0.45, 0.10), ov * uMark);
    col += vec3(1.0, 0.5, 0.15) * scan * uMark * 0.32;
  }

  // Vignette + Filmkorn
  float vig = smoothstep(1.55, 0.35, length((uv - 0.5) * vec2(1.25, 1.0) * 1.9));
  col *= mix(0.55, 1.0, vig);
  col += (hash21(gl_FragCoord.xy + fract(uTime) * 91.0) - 0.5) * 0.018;

  // Tone-Mapping + Gamma
  col = 1.0 - exp(-col * 1.35);
  col = pow(col, vec3(0.86));
  gl_FragColor = vec4(col, 1.0);
}`;

export type DentRenderer = {
  render: (s: Partial<DentState>) => void;
  resize: (cssW: number, cssH: number, scale: number) => void;
  destroy: () => void;
  lost: boolean;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== 'production') console.warn(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function createDentRenderer(canvas: HTMLCanvasElement, preset: DentPreset): DentRenderer | null {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  }) as WebGLRenderingContext | null;
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    res: U('uRes'),
    time: U('uTime'),
    form: U('uForm'),
    repair: U('uRepair'),
    mark: U('uMark'),
    sweep: U('uSweep'),
    tool: U('uTool'),
    ripple: U('uRipple'),
    look: U('uLook'),
    count: U('uCount'),
    dents: U('uDents'),
    toolPos: U('uToolPos'),
    aspect: U('uAspect'),
  };

  const dents = PRESETS[preset];
  let aspect = 1;
  const state: DentState = { ...DEFAULT_STATE };
  let lost = false;

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
  };
  canvas.addEventListener('webglcontextlost', onLost);

  const uploadDents = () => {
    const arr = new Float32Array(MAX_DENTS * 4);
    // Hochformat: Dellen rücken zur Mitte und schrumpfen, damit sie ins Bild passen.
    const fit = Math.min(1, aspect * 0.9);
    dents.forEach((d, i) => {
      arr[i * 4] = ((0.5 + (d.u - 0.5) * fit) * 2 - 1) * aspect;
      arr[i * 4 + 1] = (aspect < 1 ? d.v - 0.06 : d.v) * 2 - 1;
      arr[i * 4 + 2] = d.r * 2 * fit;
      arr[i * 4 + 3] = d.d;
    });
    gl.uniform4fv(u.dents, arr);
    gl.uniform1f(u.count, dents.length);
  };

  const draw = () => {
    if (lost) return;
    gl.uniform1f(u.time, state.time);
    gl.uniform1f(u.form, state.form);
    gl.uniform1f(u.repair, state.repair);
    gl.uniform1f(u.mark, state.mark);
    gl.uniform1f(u.sweep, state.sweep);
    gl.uniform1f(u.tool, state.tool);
    gl.uniform1f(u.ripple, state.ripple);
    gl.uniform2f(u.look, state.look[0], state.look[1]);
    // Werkzeug wandert in kleiner Spirale um den Mittelpunkt der Hauptdelle.
    const main = dents[0];
    if (main) {
      const fit = Math.min(1, aspect * 0.9);
      const cx = ((0.5 + (main.u - 0.5) * fit) * 2 - 1) * aspect;
      const cy = (aspect < 1 ? main.v - 0.06 : main.v) * 2 - 1;
      const a = state.repair * Math.PI * 2 * 6;
      const rad = main.r * 2 * fit * (0.95 - 0.8 * state.repair);
      gl.uniform2f(u.toolPos, cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
    } else {
      gl.uniform2f(u.toolPos, 0, 0);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  return {
    get lost() {
      return lost;
    },
    render(s) {
      Object.assign(state, s);
      draw();
    },
    resize(cssW, cssH, scale) {
      const w = Math.max(2, Math.round(cssW * scale));
      const h = Math.max(2, Math.round(cssH * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      aspect = w / h;
      gl.uniform2f(u.res, w, h);
      gl.uniform1f(u.aspect, aspect);
      uploadDents();
      draw();
    },
    destroy() {
      canvas.removeEventListener('webglcontextlost', onLost);
      const ext = gl.getExtension('WEBGL_lose_context');
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      ext?.loseContext();
    },
  };
}
