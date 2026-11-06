import {
  AdditiveBlending, BufferAttribute, BufferGeometry, LinearSRGBColorSpace,
  Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Points,
  Scene, ShaderMaterial, Vector2, WebGLRenderer, WebGLRenderTarget,
} from 'three';
import { seededRandom } from './random';
import type { CosmicRenderer } from './useCosmicRenderer';

const nebulaVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const nebulaFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uPointer;
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
      mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0, weight = .52;
    mat2 turn = mat2(.8, -.6, .6, .8);
    for(int i=0; i<5; i++) {
      value += weight * noise(p);
      p = turn*p*2.05+vec2(7.1,3.8);
      weight *= .5;
    }
    return value;
  }
  void main() {
    vec2 p=(vUv-.5)*vec2(uAspect,1.0)+uPointer*.012;
    float t=uTime*.008;
    vec2 flow=vec2(fbm(p*2.4+vec2(t,0)),fbm(p*2.2+vec2(4.7,-t*.8)));
    float cloud=fbm(p*4.8+flow*2.5+vec2(t*.25,-t*.4));
    float filaments=fbm(p*11.5+flow*4.0-vec2(t*.2,0));
    float ridge=p.y-.24*p.x+.15*(flow.x-.5)+.035;
    float band=exp(-ridge*ridge*10.0);
    float distant=exp(-pow(p.y+.4*p.x-.35,2.0)*28.0);
    float density=pow(smoothstep(.20,.78,cloud),2.0)*band;
    float dust=smoothstep(.30,.66,filaments);
    float location=smoothstep(-.95,.7,p.x)*.72+.28;
    vec3 violet=mix(vec3(.14,.055,.31),vec3(.37,.15,.49),filaments);
    vec3 color=vec3(.0314,.0196,.0627);
    color+=violet*density*location*1.1;
    color+=vec3(.055,.035,.16)*distant*cloud*.6;
    color+=vec3(.20,.12,.30)*pow(density,2.5)*dust*.4;
    color*=1.0-(1.0-dust)*density*.45;
    float vignette=1.0-smoothstep(.25,1.2,length((vUv-.5)*vec2(.8,1.0)));
    color*=.65+vignette*.35;
    gl_FragColor=vec4(color,1.0);
  }
`;

const starVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uDpr;
  uniform vec2 uPointer;
  varying float vAlpha;
  varying float vDepth;
  void main() {
    vec2 p=position.xy;
    float depth=position.z;
    p+=uPointer*vec2(-.025,.025)*depth;
    p+=vec2(sin(uTime*.013+aPhase),cos(uTime*.009+aPhase))*.004*depth;
    gl_Position=vec4(p,0.0,1.0);
    gl_PointSize=aSize*uDpr;
    vAlpha=(.40+.6*depth)*(.77+.23*sin(uTime*(.25+depth*.3)+aPhase));
    vDepth=depth;
  }
`;
const starFragment = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying float vDepth;
  void main() {
    float d=length(gl_PointCoord-.5)*2.0;
    float sharp=exp(-d*d*7.0);
    float halo=exp(-d*d*2.5)*.15;
    vec3 color=mix(vec3(.55,.41,.84),vec3(.96,.93,1.),vDepth);
    gl_FragColor=vec4(color,(sharp+halo)*vAlpha);
  }
`;

export function createRenderer(canvas: HTMLCanvasElement): CosmicRenderer {
  const mobile = window.innerWidth < 768;
  const renderer = new WebGLRenderer({ canvas, alpha: false, antialias: false, powerPreference: 'low-power' });
  renderer.outputColorSpace = LinearSRGBColorSpace;
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  const source = new Scene();
  const scene = new Scene();
  const plane = new PlaneGeometry(2, 2);
  const target = new WebGLRenderTarget(512, 384, { depthBuffer: false, stencilBuffer: false });
  const nebula = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uAspect: { value: 1 }, uPointer: { value: new Vector2() } },
    vertexShader: nebulaVertex, fragmentShader: nebulaFragment, depthTest: false, depthWrite: false,
  });
  source.add(new Mesh(plane, nebula));
  const composite = new MeshBasicMaterial({ map: target.texture, depthWrite: false, depthTest: false });
  scene.add(new Mesh(plane, composite));

  const random = seededRandom(3434);
  const starCount = mobile ? 140 : 360;
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);
  const phases = new Float32Array(starCount);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = random() * 2 - 1;
    positions[i * 3 + 1] = random() * 2 - 1;
    positions[i * 3 + 2] = random();
    sizes[i] = .9 + Math.pow(random(), 3) * 4;
    phases[i] = random() * Math.PI * 2;
  }
  const starGeometry = new BufferGeometry();
  starGeometry.setAttribute('position', new BufferAttribute(positions, 3));
  starGeometry.setAttribute('aSize', new BufferAttribute(sizes, 1));
  starGeometry.setAttribute('aPhase', new BufferAttribute(phases, 1));
  const stars = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDpr: { value: 1 }, uPointer: { value: new Vector2() } },
    vertexShader: starVertex, fragmentShader: starFragment,
    transparent: true, blending: AdditiveBlending, depthTest: false, depthWrite: false,
  });
  const points = new Points(starGeometry, stars);
  points.frustumCulled = false;
  points.renderOrder = 1;
  scene.add(points);

  const meteorGeometry = new BufferGeometry();
  const meteorPositions = new Float32Array(32 * 3);
  for (let i = 0; i < 32; i++) meteorPositions[i * 3] = i / 31;
  meteorGeometry.setAttribute('position', new BufferAttribute(meteorPositions, 3));
  const meteor = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDpr: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uDpr; varying float vAlpha;
      void main(){
        float cycle=mod(uTime,29.0);
        float progress=(cycle-16.0)/1.8;
        float tail=position.x;
        vec2 p=vec2(.6,.9)+vec2(-.8,-.65)*(progress-tail*.12);
        vAlpha=step(0.,progress)*step(progress,1.)*(1.-tail)*sin(clamp(progress,0.,1.)*3.14159)*.48;
        gl_Position=vec4(p,0.,1.); gl_PointSize=(1.6-tail*.8)*uDpr;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      void main(){gl_FragColor=vec4(.8,.65,1.,vAlpha*(1.-smoothstep(.05,.5,length(gl_PointCoord-.5))));}
    `,
    transparent: true, blending: AdditiveBlending, depthTest: false, depthWrite: false,
  });
  const meteorPoints = new Points(meteorGeometry, meteor);
  meteorPoints.frustumCulled = false;
  meteorPoints.renderOrder = 2;
  scene.add(meteorPoints);

  let frames = 0;
  let renderDuration = 0;
  let resolutionScale = mobile ? .48 : .57;
  let width = 1;
  let height = 1;
  const setNebulaSize = () => {
    const scale = Math.min(resolutionScale, 900 / width);
    target.setSize(Math.max(1, Math.round(width * scale)), Math.max(1, Math.round(height * scale)));
  };

  return {
    resize(nextWidth, nextHeight) {
      width = nextWidth; height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      setNebulaSize();
      nebula.uniforms.uAspect.value = width / height;
      stars.uniforms.uDpr.value = dpr;
      meteor.uniforms.uDpr.value = dpr;
    },
    render(time, pointerX, pointerY) {
      const start = performance.now();
      nebula.uniforms.uTime.value = time;
      nebula.uniforms.uPointer.value.set(pointerX, pointerY);
      stars.uniforms.uTime.value = time;
      stars.uniforms.uPointer.value.set(pointerX, pointerY);
      meteor.uniforms.uTime.value = time;
      renderer.setRenderTarget(target);
      renderer.render(source, camera);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      renderDuration += performance.now() - start;
      if (++frames === 90 && renderDuration / frames > 12 && resolutionScale > .35) {
        resolutionScale = .35;
        setNebulaSize();
      }
    },
    dispose() {
      plane.dispose(); nebula.dispose(); composite.dispose(); target.dispose();
      starGeometry.dispose(); stars.dispose(); meteorGeometry.dispose(); meteor.dispose();
      renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
