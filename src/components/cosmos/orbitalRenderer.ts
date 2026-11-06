import { AmbientLight, BufferGeometry, Float32BufferAttribute, Group, Mesh, MeshPhysicalMaterial, PerspectiveCamera, PointLight, Points, PointsMaterial, Scene, SphereGeometry, TorusGeometry, WebGLRenderer } from 'three';
import { seededRandom } from './random';
import type { CosmicRenderer } from './useCosmicRenderer';

export function createRenderer(canvas: HTMLCanvasElement): CosmicRenderer {
  const mobile = window.innerWidth < 768;
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  renderer.setClearColor(0, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, .1, 30);
  camera.position.z = 8;
  const group = new Group();
  scene.add(group);
  scene.add(new AmbientLight(0xa78bfa, 2));
  const key = new PointLight(0xc4b5fd, 55, 15); key.position.set(-3, 4, 4); scene.add(key);
  const rim = new PointLight(0x9333ea, 60, 15); rim.position.set(3, -2, 1); scene.add(rim);
  const sphereGeometry = new SphereGeometry(1.05, mobile ? 32 : 48, 32);
  const sphereMaterial = new MeshPhysicalMaterial({ color: 0x39165d, metalness: .6, roughness: .28, emissive: 0x4c1880, emissiveIntensity: .4, transparent: true, opacity: .92, clearcoat: 1 });
  const sphere = new Mesh(sphereGeometry, sphereMaterial); group.add(sphere);
  const ringMaterial = new MeshPhysicalMaterial({ color: 0xc4b5fd, metalness: .85, roughness: .23, emissive: 0x9333ea, emissiveIntensity: .18 });
  const ringGeometries: TorusGeometry[] = [];
  const rings: Mesh[] = [];
  [[1.52, .013, 1.02, -.5], [1.93, .008, .79, .55], [2.28, .005, 1.1, -.28]].forEach(([radius, width, x, z]) => {
    const geometry = new TorusGeometry(radius, width, 6, mobile ? 120 : 180);
    const ring = new Mesh(geometry, ringMaterial); ring.rotation.set(x, .25, z);
    group.add(ring); rings.push(ring); ringGeometries.push(geometry);
  });
  const satelliteGeometry = new SphereGeometry(.035, 12, 8);
  const satelliteMaterial = new MeshPhysicalMaterial({ color: 0xe9ddff, emissive: 0xa855f7, emissiveIntensity: 1.3 });
  const satellites = rings.map(() => { const dot = new Mesh(satelliteGeometry, satelliteMaterial); group.add(dot); return dot; });
  const random = seededRandom(634);
  const positions: number[] = [];
  for (let i = 0; i < (mobile ? 60 : 140); i++) { const angle = random() * Math.PI * 2; const distance = 1.4 + random() * 1.2; positions.push(Math.cos(angle) * distance, (random() - .5) * 1.1, Math.sin(angle) * distance); }
  const dustGeometry = new BufferGeometry(); dustGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const dustMaterial = new PointsMaterial({ color: 0xc4b5fd, size: .012, transparent: true, opacity: .6, depthWrite: false });
  const dust = new Points(dustGeometry, dustMaterial); group.add(dust);
  return {
    resize(width, height) { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5)); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); },
    render(time, pointerX, pointerY) {
      group.rotation.y = pointerX * .08; group.rotation.x = pointerY * .06;
      rings.forEach((ring, index) => {
        ring.rotation.y = .25 + Math.sin(time * .07 + index) * .13;
        const angle = time * (.1 + index * .025) + index * 2;
        const radius = [1.52, 1.93, 2.28][index];
        satellites[index].position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0).applyEuler(ring.rotation);
      });
      dust.rotation.y = time * .018;
      renderer.render(scene, camera);
    },
    dispose() { sphereGeometry.dispose(); sphereMaterial.dispose(); ringGeometries.forEach(g => g.dispose()); ringMaterial.dispose(); satelliteGeometry.dispose(); satelliteMaterial.dispose(); dustGeometry.dispose(); dustMaterial.dispose(); renderer.dispose(); renderer.forceContextLoss(); },
  };
}
