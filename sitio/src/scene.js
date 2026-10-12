import * as THREE from "three";

// Torre nocturna de 48 niveles sobre una ciudad costera. La cámara asciende con el scroll.
export const FLOORS = 48;
const FLOOR_H = 3.2;
const TOWER_W = 14;
const TOWER_D = 10;
const TOWER_H = FLOORS * FLOOR_H;

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export function createScene(canvas) {
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const horizon = new THREE.Color("#2a2338");
  scene.fog = new THREE.FogExp2(horizon, 0.0032);
  const camera = new THREE.PerspectiveCamera(mobile ? 52 : 42, 1, 0.5, 2000);
  const rand = rng(48);

  // Cielo: degradé de hora azul con un resto de atardecer en el horizonte
  const skyGeo = new THREE.SphereGeometry(900, 32, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color("#04060c") }, mid: { value: new THREE.Color("#121a33") }, low: { value: new THREE.Color("#6b3f3a") }, sun: { value: new THREE.Vector3(-0.6, 0.02, -0.8).normalize() } },
    vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 low; uniform vec3 sun; varying vec3 vP;
      void main(){ float h = vP.y; vec3 c = mix(low, mid, smoothstep(-0.02, 0.18, h)); c = mix(c, top, smoothstep(0.18, 0.75, h));
      float g = pow(max(dot(normalize(vec3(vP.x, max(vP.y,0.0)*0.6, vP.z)), sun), 0.0), 12.0); c += vec3(0.9,0.45,0.25) * g * 0.35 * (1.0 - smoothstep(0.0, 0.35, h));
      gl_FragColor = vec4(c, 1.0); }`,
  });
  scene.add(new THREE.Mesh(skyGeo, skyMat));

  // Estrellas
  {
    const n = mobile ? 700 : 1500;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const th = rand() * Math.PI * 2, ph = Math.acos(rand() * 0.85 + 0.15);
      pos.set([Math.cos(th) * Math.sin(ph) * 800, Math.cos(ph) * 800, Math.sin(th) * Math.sin(ph) * 800], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.7, fog: false })));
  }

  // Luces
  scene.add(new THREE.HemisphereLight(0x5a6c9a, 0x0a0b10, 0.65));
  const moon = new THREE.DirectionalLight(0xbcd0ff, 1.1);
  moon.position.set(80, 160, 60);
  scene.add(moon);
  const dusk = new THREE.DirectionalLight(0xff9a6b, 0.7);
  dusk.position.set(-200, 20, -260);
  scene.add(dusk);

  // Suelo y mar (la rambla corre a lo largo de z = -70)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1800, 1800), new THREE.MeshStandardMaterial({ color: 0x07090e, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(1800, 900), new THREE.MeshStandardMaterial({ color: 0x0b1424, roughness: 0.22, metalness: 0.85 }));
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(0, 0.05, -520);
  scene.add(sea);

  // Rambla: curva de luces cálidas sobre la costa
  {
    const n = 220, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const x = -600 + (i / n) * 1200;
      pos.set([x, 0.6, -72 + Math.sin(x * 0.006) * 14], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffc27a, size: 2.4, sizeAttenuation: false })));
  }

  // Ciudad
  const city = new THREE.Group();
  scene.add(city);
  {
    const n = mobile ? 420 : 900;
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x141a26, roughness: 0.85, metalness: 0.1 });
    const mesh = new THREE.InstancedMesh(geo, mat, n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    const lights = [];
    let k = 0;
    while (k < n) {
      const x = (rand() - 0.5) * 900, z = -60 + rand() * 600;
      if (Math.abs(x) < 26 && z < 30) continue;
      const dist = Math.hypot(x, z);
      const h = 4 + Math.pow(rand(), 3) * (dist < 160 ? 60 : 28);
      const w = 6 + rand() * 12, d = 6 + rand() * 12;
      p.set(x, 0, z); s.set(w, h, d);
      m.compose(p, q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (rand() - 0.5) * 0.3), s);
      mesh.setMatrixAt(k++, m);
      const nl = Math.floor(h / 6);
      for (let j = 0; j < nl; j++) if (rand() < 0.55) lights.push(x + (rand() - 0.5) * w, 2 + rand() * (h - 2), z + (rand() < 0.5 ? -d / 2 - 0.1 : d / 2 + 0.1));
    }
    city.add(mesh);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lights), 3));
    city.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffd9a0, size: 1.5, sizeAttenuation: false, transparent: true, opacity: 0.85 })));
  }

  // Torre
  const tower = new THREE.Group();
  scene.add(tower);
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(TOWER_W, TOWER_H, TOWER_D),
    new THREE.MeshStandardMaterial({ color: 0x0d1a2c, metalness: 0.9, roughness: 0.18, emissive: 0x050a14 })
  );
  glass.position.y = TOWER_H / 2;
  tower.add(glass);

  // Losas de cada piso
  {
    const geo = new THREE.BoxGeometry(TOWER_W + 0.7, 0.28, TOWER_D + 0.7);
    const mat = new THREE.MeshStandardMaterial({ color: 0xb9b2a4, roughness: 0.6, metalness: 0.1, emissive: 0x2a2418 });
    const slabs = new THREE.InstancedMesh(geo, mat, FLOORS + 1);
    const m = new THREE.Matrix4();
    for (let i = 0; i <= FLOORS; i++) { m.makeTranslation(0, i * FLOOR_H, 0); slabs.setMatrixAt(i, m); }
    tower.add(slabs);
  }

  // Ventanas: paneles con color por instancia (cálidas encendidas, frías apagadas)
  const warm = new THREE.Color(1.0, 0.74, 0.46);
  const warm2 = new THREE.Color(1.0, 0.88, 0.7);
  const off = new THREE.Color(0.04, 0.07, 0.12);
  const panels = [];
  {
    const pw = 1.25, gap = 0.18, ph = FLOOR_H - 0.55;
    const faces = [
      { n: Math.floor(TOWER_W / (pw + gap)), len: TOWER_W, z: TOWER_D / 2 + 0.02, rot: 0, axis: "x" },
      { n: Math.floor(TOWER_W / (pw + gap)), len: TOWER_W, z: -TOWER_D / 2 - 0.02, rot: Math.PI, axis: "x" },
      { n: Math.floor(TOWER_D / (pw + gap)), len: TOWER_D, z: TOWER_W / 2 + 0.02, rot: Math.PI / 2, axis: "z" },
      { n: Math.floor(TOWER_D / (pw + gap)), len: TOWER_D, z: -TOWER_W / 2 - 0.02, rot: -Math.PI / 2, axis: "z" },
    ];
    const total = faces.reduce((a, f) => a + f.n, 0) * FLOORS;
    const geo = new THREE.PlaneGeometry(pw, ph);
    const mat = new THREE.MeshBasicMaterial({ toneMapped: false });
    const mesh = new THREE.InstancedMesh(geo, mat, total);
    const o = new THREE.Object3D();
    let k = 0;
    for (let f = 0; f < FLOORS; f++) {
      for (const face of faces) {
        const step = face.len / face.n;
        for (let i = 0; i < face.n; i++) {
          const t = -face.len / 2 + step * (i + 0.5);
          if (face.axis === "x") o.position.set(t, f * FLOOR_H + FLOOR_H / 2 + 0.1, face.z);
          else o.position.set(face.z, f * FLOOR_H + FLOOR_H / 2 + 0.1, t);
          o.rotation.set(0, face.rot, 0);
          o.updateMatrix();
          mesh.setMatrixAt(k, o.matrix);
          const lit = rand() < (f < 2 ? 0.9 : 0.42);
          const c = lit ? (rand() < 0.3 ? warm2 : warm).clone().multiplyScalar(0.55 + rand() * 0.6) : off;
          mesh.setColorAt(k, c);
          panels.push(lit);
          k++;
        }
      }
    }
    mesh.instanceColor.needsUpdate = true;
    tower.add(mesh);
    tower.userData.windows = mesh;
  }

  // Aristas doradas y coronamiento con piscina
  {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(TOWER_W + 0.72, TOWER_H, TOWER_D + 0.72)),
      new THREE.LineBasicMaterial({ color: 0xc9a56b, transparent: true, opacity: 0.55 })
    );
    edges.position.y = TOWER_H / 2;
    tower.add(edges);

    const crown = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(TOWER_W + 0.7, 6, TOWER_D + 0.7)),
      new THREE.LineBasicMaterial({ color: 0xe6c88f })
    );
    crown.position.y = TOWER_H + 3;
    tower.add(crown);

    const pool = new THREE.Mesh(new THREE.PlaneGeometry(TOWER_W * 0.62, TOWER_D * 0.45), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.25, 0.85, 1.0), toneMapped: false }));
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(-1.5, TOWER_H + 0.2, 1);
    tower.add(pool);
    const poolLight = new THREE.PointLight(0x6fdcff, 60, 30, 2);
    poolLight.position.set(-1.5, TOWER_H + 2, 1);
    tower.add(poolLight);

    const lobby = new THREE.PointLight(0xffb36b, 120, 40, 2);
    lobby.position.set(0, 3, TOWER_D / 2 + 6);
    tower.add(lobby);

    // Faro de altura
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff5a4a, toneMapped: false }));
    beacon.position.set(TOWER_W / 2, TOWER_H + 6.4, TOWER_D / 2);
    tower.add(beacon);
    tower.userData.beacon = beacon;
  }

  // Partículas ascendentes alrededor de la torre (sensación de movimiento vertical)
  let dust;
  {
    const n = mobile ? 160 : 360, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = rand() * Math.PI * 2, r = 14 + rand() * 30;
      pos.set([Math.cos(a) * r, rand() * (TOWER_H + 30), Math.sin(a) * r], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dust = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xe6c88f, size: 0.18, transparent: true, opacity: 0.55, depthWrite: false }));
    scene.add(dust);
  }

  // Cámara
  let target = 0, current = 0;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const look = new THREE.Vector3();
  function placeCamera(p) {
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const y = THREE.MathUtils.lerp(3.5, TOWER_H + 22, e);
    const ang = 0.55 + e * 2.1 + mouse.sx * 0.06;
    const r = THREE.MathUtils.lerp(mobile ? 58 : 46, mobile ? 70 : 58, Math.sin(e * Math.PI) * 0.6 + e * 0.4);
    camera.position.set(Math.sin(ang) * r, y + mouse.sy * 1.5, Math.cos(ang) * r);
    const lookY = p < 0.02 ? 26 : THREE.MathUtils.lerp(26, TOWER_H - 6, e);
    look.set((mobile ? -7 : -16) * (1 - e * 0.7), lookY, 0);
    camera.lookAt(look);
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; }, { passive: true });

  let visible = true, raf = 0, t0 = performance.now();
  const color = new THREE.Color();
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min((now - t0) / 1000, 0.05); t0 = now;
    current += (target - current) * (reduce ? 1 : Math.min(dt * 3.2, 1));
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    placeCamera(current);

    const pos = dust.geometry.attributes.position;
    if (!reduce) {
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) + dt * 1.6;
        if (y > TOWER_H + 30) y = 0;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
      // Algunas ventanas se encienden o apagan
      if (Math.random() < 0.25) {
        const w = tower.userData.windows, i = Math.floor(Math.random() * w.count);
        panels[i] = !panels[i];
        w.setColorAt(i, panels[i] ? color.copy(warm).multiplyScalar(0.6 + Math.random() * 0.5) : off);
        w.instanceColor.needsUpdate = true;
      }
      tower.userData.beacon.visible = Math.floor(now / 900) % 2 === 0;
    }
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    setProgress(p) { target = Math.max(0, Math.min(1, p)); },
    setVisible(v) { visible = v; },
    destroy() { cancelAnimationFrame(raf); renderer.dispose(); },
  };
}
