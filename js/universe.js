/* PRANTOVERSE — the universe renderer.
   Background: kaleidoscope tunnel  →  Gargantua-style black hole (fullscreen shader, low-res target).
   Foreground: a procedurally built astronaut (Three.js), choreographed by window.U (driven by scroll in main.js). */
(function () {
  const U = window.U = Object.assign({
    travel: 0,   // 0..1 progress through the tunnel
    mix: 0,      // 0 = tunnel, 1 = black hole
    bh: 0,       // 0..1 camera approach to the black hole
    ax: 0.55, ay: -0.15, az: 0, arot: 0, aspin: 0, ascale: 1, // astronaut transform
    ready: false
  }, window.U || {});

  const canvas = document.getElementById('universe');
  if (!canvas || !window.THREE) { document.documentElement.classList.add('no-gl'); return; }
  const THREE = window.THREE;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) { document.documentElement.classList.add('no-gl'); return; }

  const isMobile = matchMedia('(max-width: 820px)').matches || /Mobi|Android/i.test(navigator.userAgent);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75);
  renderer.setPixelRatio(DPR);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.autoClear = false;

  /* ---------------- background shader ---------------- */
  const STEPS = isMobile ? 90 : 170;
  const bgFrag = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uTravel; uniform float uMix; uniform float uBh; uniform vec2 uMouse;
varying vec2 vUv;
float hash(vec3 p){p=fract(p*0.3183099+.1);p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 x){vec3 i=floor(x);vec3 f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*noise(p);p*=2.02;a*=.5;}return s;}
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

vec3 tunnel(vec2 uv){
  float t=uTime;
  uv*=rot(t*.03+uTravel*1.8);
  uv+=uMouse*.04;
  float r=length(uv)+1e-4;
  float a=atan(uv.y,uv.x);
  float N=12.; float seg=6.2831853/N;
  float ka=abs(mod(a,seg)-seg*.5);
  float K=13.;
  float z=-log(r)*K + uTravel*46. + t*1.1;
  vec2 g=vec2(ka*K, z);
  vec2 gi=floor(g); vec2 gf=fract(g)-.5;
  float d=abs(gf.x)+abs(gf.y);
  float edge=smoothstep(.07,.0,abs(d-.5));
  float inner=smoothstep(.05,.0,abs(d-.22));
  float fh=hash(vec3(gi,3.));
  float n=fbm(vec3(gi*.3, t*.07));
  float lit=pow(hash(vec3(gi,1.)),7.);
  float pulse=.5+.5*sin(t*1.6+fh*30.+gi.y*.4);
  vec3 ember=vec3(1.,.27,.17), gold=vec3(.42,.95,.88), cold=vec3(.18,.84,.77);
  vec3 col=vec3(.012,.008,.01);
  col+=ember*n*n*.14;
  col+=gold*edge*(.05+.85*smoothstep(.5,.88,n));
  col+=ember*inner*smoothstep(.6,.9,n)*.5;
  col+=mix(ember,gold,fh)*lit*1.6*pulse*(1.-d);
  col+=cold*edge*pow(hash(vec3(gi,7.)),14.)*2.2;
  float depth=smoothstep(.04,.75,r);
  col*=depth*(.35+.9*min(r,1.3));
  col+=vec3(.75,1.,.95)*exp(-r*9.)*1.2+vec3(1.,.35,.24)*exp(-r*3.)*.16;
  return col;
}

vec3 sky(vec3 d){
  vec3 c=vec3(0.);
  for(int i=0;i<3;i++){
    float s=110.+float(i)*150.;
    vec3 p=d*s; vec3 id=floor(p); vec3 f=fract(p)-.5;
    float h=hash(id+float(i)*17.31);
    if(h>.982){ float b=smoothstep(.32,0.,length(f)); c+=mix(vec3(1.,.82,.62),vec3(.7,.82,1.),hash(id+4.2))*b*(h-.982)*95.; }
  }
  float n=fbm(d*2.2+vec3(3.,1.,7.));
  c+=vec3(.12,.04,.05)*pow(n,3.)*exp(-abs(d.y)*3.)*1.1;
  c+=vec3(.01,.06,.07)*pow(fbm(d*1.4+11.),2.)*.9;
  return c;
}

vec3 blackhole(vec2 uv){
  float pr=smoothstep(0.,1.,uBh);
  float dist=mix(34.,14.5,pr);
  float tilt=mix(.08,.24,pr)+uMouse.y*.03;
  float yaw=-.4+uTime*.01+uMouse.x*.1+pr*.8;
  vec3 ro=vec3(sin(yaw)*cos(tilt),sin(tilt),-cos(yaw)*cos(tilt))*dist;
  vec3 ww=normalize(-ro); vec3 uu=normalize(cross(ww,vec3(0.,1.,0.))); vec3 vv=cross(uu,ww);
  uv*=rot(-.1);
  vec3 rd=normalize(uv.x*uu+uv.y*vv+1.75*ww);
  vec3 pos=ro, vel=rd; vec3 hv=cross(pos,vel); float h2=dot(hv,hv);
  vec3 col=vec3(0.); float alpha=0., glow=0.; bool cap=false;
  for(int i=0;i<${STEPS};i++){
    float r=length(pos);
    if(r<1.){cap=true;break;}
    float dt=clamp(.06*r,.02,1.3);
    vec3 np=pos+vel*dt;
    vel+=-1.5*h2*pos/pow(r,5.)*dt;
    if(pos.y*np.y<0.){
      vec3 p=mix(pos,np,pos.y/(pos.y-np.y)); float rr=length(p.xz);
      if(rr>2.45&&rr<13.){
        float t=(rr-2.45)/10.55;
        vec2 q=rot(uTime*1.5/pow(rr,1.5))*p.xz; float ang=atan(q.y,q.x);
        float streak=fbm(vec3(rr*2.2,cos(ang)*2.5,sin(ang)*2.5));
        float dens=pow(1.-t,1.7)*smoothstep(0.,.06,t)*(.35+1.3*streak);
        float dop=1.+.6*dot(normalize(vec3(-p.z,0.,p.x)),normalize(vel)); dop=dop*dop*dop;
        vec3 dc=mix(vec3(1.,.95,.92),vec3(1.,.36,.24),smoothstep(0.,.35,t)); dc=mix(dc,vec3(.5,.07,.12),smoothstep(.35,1.,t));
        col+=(1.-alpha)*dc*dens*dop*mix(1.25,1.0,pr);
        alpha+=(1.-alpha)*clamp(dens*1.1,0.,1.)*.92;
        if(alpha>.985)break;
      }
    }
    glow+=exp(-abs(r-1.55)*2.6)*dt*.012;
    pos=np;
    if(r>70.&&dot(pos,vel)>0.)break;
  }
  if(!cap) col+=(1.-alpha)*sky(normalize(vel));
  col+=(1.-alpha)*vec3(.55,1.,.92)*glow;
  return col;
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  vec3 col;
  if(uMix<.002) col=tunnel(uv);
  else if(uMix>.998) col=blackhole(uv);
  else {
    vec3 a=tunnel(uv*(1.+uMix*3.));
    vec3 b=blackhole(uv*(1.+(1.-uMix)*.6));
    col=mix(a,b,smoothstep(0.,1.,uMix));
    col+=vec3(.5,1.,.9)*sin(uMix*3.14159)*.3*exp(-length(uv)*2.5);
  }
  col=1.-exp(-col*mix(1.25,.95,uMix));
  col=pow(col,vec3(mix(.92,1.08,uMix)));
  vec2 sv=gl_FragCoord.xy/uRes;
  col*=.32+.68*pow(16.*sv.x*sv.y*(1.-sv.x)*(1.-sv.y),.32);
  gl_FragColor=vec4(col,1.);
}`;

  const bgScene = new THREE.Scene();
  const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const bgUniforms = {
    uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uTravel: { value: 0 },
    uMix: { value: 0 }, uBh: { value: 0 }, uMouse: { value: new THREE.Vector2() }
  };
  const quadGeo = new THREE.PlaneGeometry(2, 2);
  bgScene.add(new THREE.Mesh(quadGeo, new THREE.ShaderMaterial({
    uniforms: bgUniforms, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader: bgFrag
  })));

  let bgScale = isMobile ? 0.5 : 0.6;
  const bgTarget = new THREE.WebGLRenderTarget(2, 2, { depthBuffer: false });
  const blitScene = new THREE.Scene();
  blitScene.add(new THREE.Mesh(quadGeo, new THREE.ShaderMaterial({
    uniforms: { tMap: { value: bgTarget.texture } }, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader: 'uniform sampler2D tMap;varying vec2 vUv;void main(){gl_FragColor=texture2D(tMap,vUv);}'
  })));

  /* ---------------- astronaut ---------------- */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  // environment for reflections (warm tunnel light)
  const envScene = new THREE.Scene();
  envScene.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: 'varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: `varying vec3 vP;void main(){
      float hz=exp(-abs(vP.y)*5.);
      vec3 c=mix(vec3(.01,.03,.04),vec3(1.,.35,.24)*1.5,hz);
      c+=vec3(1.,.9,.7)*pow(max(dot(vP,normalize(vec3(0.,.1,-1.))),0.),24.)*6.;
      c+=vec3(.2,.9,.8)*pow(max(dot(vP,normalize(vec3(.8,.5,.4))),0.),12.)*1.6;
      gl_FragColor=vec4(c,1.);}`
  })));
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(envScene, 0.02).texture;

  const suit = new THREE.MeshStandardMaterial({ color: 0xd9d2c6, roughness: 0.62, metalness: 0.04, envMapIntensity: 0.8 });
  const suitDark = new THREE.MeshStandardMaterial({ color: 0x2a2724, roughness: 0.45, metalness: 0.4 });
  const visorMat = new THREE.MeshPhysicalMaterial({ color: 0x120b05, metalness: 1, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 2.4 });
  const glow = new THREE.MeshBasicMaterial({ color: 0xff5a3d, toneMapped: false });
  const glowCold = new THREE.MeshBasicMaterial({ color: 0x2fd6c4, toneMapped: false });

  const astro = new THREE.Group();
  const add = (geo, mat, x, y, z, parent = astro) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };

  const torso = add(new THREE.CapsuleGeometry(0.34, 0.38, 8, 20), suit, 0, 0, 0); torso.scale.set(1.12, 1, 0.86);
  add(new THREE.BoxGeometry(0.36, 0.2, 0.08), suitDark, 0, 0.1, 0.3);
  add(new THREE.SphereGeometry(0.022, 10, 8), glow, -0.1, 0.12, 0.345);
  add(new THREE.SphereGeometry(0.022, 10, 8), glowCold, -0.04, 0.12, 0.345);
  add(new THREE.SphereGeometry(0.022, 10, 8), glow, 0.02, 0.12, 0.345);
  add(new THREE.BoxGeometry(0.1, 0.05, 0.02), glow, 0.1, 0.06, 0.345);
  const belt = add(new THREE.TorusGeometry(0.33, 0.04, 10, 28), suitDark, 0, -0.26, 0); belt.rotation.x = Math.PI / 2; belt.scale.set(1.12, 0.86, 1);

  const helmetG = new THREE.Group(); helmetG.position.set(0, 0.64, 0.02); astro.add(helmetG);
  add(new THREE.SphereGeometry(0.33, 40, 28), suit, 0, 0, 0, helmetG);
  const visor = add(new THREE.SphereGeometry(0.302, 40, 28, Math.PI / 2 - 1.0, 2.0, 0.78, 1.25), visorMat, 0, -0.01, 0.05, helmetG);
  visor.scale.set(1.04, 1, 1.08);
  const collar = add(new THREE.TorusGeometry(0.25, 0.055, 12, 28), suitDark, 0, -0.27, 0, helmetG); collar.rotation.x = Math.PI / 2;
  add(new THREE.CylinderGeometry(0.012, 0.012, 0.22, 6), suitDark, 0.2, 0.26, -0.12, helmetG).rotation.z = -0.3;
  add(new THREE.SphereGeometry(0.02, 8, 8), glow, 0.235, 0.37, -0.12, helmetG);

  const pack = add(new THREE.BoxGeometry(0.56, 0.62, 0.26), suit, 0, 0.1, -0.38);
  add(new THREE.BoxGeometry(0.5, 0.12, 0.04), suitDark, 0, 0.26, -0.52);
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 14), suitDark, -0.2, 0.06, -0.53);
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 14), suitDark, 0.2, 0.06, -0.53);

  function limb(len, rad) { // returns {root, end}
    const root = new THREE.Group();
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(rad, len, 6, 14), suit);
    m.position.y = -len / 2 - rad * 0.4; root.add(m);
    const end = new THREE.Group(); end.position.y = -len - rad * 0.6; root.add(end);
    return { root, end };
  }
  function arm(side) {
    const sh = new THREE.Group(); sh.position.set(0.44 * side, 0.26, 0); astro.add(sh);
    const pad = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), suit); sh.add(pad);
    const up = limb(0.26, 0.105); sh.add(up.root);
    const fore = limb(0.24, 0.095); up.end.add(fore.root);
    const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.025, 8, 16), suitDark); cuff.rotation.x = Math.PI / 2; cuff.position.y = -0.02; fore.end.add(cuff);
    const glove = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 12), suitDark); glove.scale.set(1, 1.2, 0.8); glove.position.y = -0.08; fore.end.add(glove);
    return { sh, up, fore };
  }
  function leg(side) {
    const hip = new THREE.Group(); hip.position.set(0.17 * side, -0.42, 0); astro.add(hip);
    const th = limb(0.32, 0.13); hip.add(th.root);
    const sh = limb(0.3, 0.115); th.end.add(sh.root);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.3), suitDark); boot.position.set(0, -0.08, 0.05); sh.end.add(boot);
    const knee = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 10), suit); th.end.add(knee);
    return { hip, th, sh };
  }
  const L = arm(-1), R = arm(1), LL = leg(-1), RL = leg(1);
  // floating pose
  L.sh.rotation.set(0.2, 0, -0.55); L.up.end.rotation.set(-0.6, 0, 0.1);
  R.sh.rotation.set(-0.9, 0, 0.9); R.up.end.rotation.set(-1.1, 0, -0.2);
  LL.hip.rotation.set(0.35, 0, -0.12); LL.th.end.rotation.set(-0.7, 0, 0);
  RL.hip.rotation.set(-0.15, 0, 0.1); RL.th.end.rotation.set(-0.35, 0, 0);

  astro.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  const holder = new THREE.Group(); holder.add(astro); scene.add(holder);

  // tether
  const tetherMat = new THREE.MeshStandardMaterial({ color: 0xd8d0c2, roughness: 0.6 });
  let tether = null;
  const tPts = Array.from({ length: 7 }, () => new THREE.Vector3());

  // lights
  scene.add(new THREE.HemisphereLight(0xcff6f0, 0x061418, 0.3));
  const rim = new THREE.DirectionalLight(0xff6a4e, 3.0); rim.position.set(-0.5, 0.6, -4); scene.add(rim);
  const key = new THREE.DirectionalLight(0xfff0dc, 0.75); key.position.set(2.5, 2, 4); scene.add(key);
  const fill = new THREE.DirectionalLight(0x2fd6c4, 1.0); fill.position.set(-3, -1, 2); scene.add(fill);

  /* ---------------- sizing ---------------- */
  let W = 1, H = 1;
  function resize() {
    W = innerWidth; H = innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    const bw = Math.max(2, Math.floor(W * DPR * bgScale)), bh = Math.max(2, Math.floor(H * DPR * bgScale));
    bgTarget.setSize(bw, bh);
    bgUniforms.uRes.value.set(bw, bh);
  }
  addEventListener('resize', resize); resize();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  /* ---------------- loop ---------------- */
  let running = true, last = performance.now(), t0 = last, slow = 0, fast = 0, frames = 0;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(frame); } });

  function frame(now) {
    if (!running) return;
    const dt = Math.min(64, now - last); last = now; frames++;
    if (frames > 30) {
      if (dt > 30) { slow++; fast = 0; } else if (dt < 17.5) { fast++; slow = 0; }
      if (slow > 18 && bgScale > 0.3) { bgScale = Math.max(0.3, bgScale - 0.08); slow = 0; resize(); }
      if (fast > 150 && bgScale < (isMobile ? 0.55 : 0.75)) { bgScale += 0.05; fast = 0; resize(); }
    }
    const t = reduce ? 6 : (now - t0) / 1000;
    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;

    bgUniforms.uTime.value = t;
    bgUniforms.uTravel.value = U.travel;
    bgUniforms.uMix.value = U.mix;
    bgUniforms.uBh.value = U.bh;
    bgUniforms.uMouse.value.set(mouse.x, mouse.y);

    // astronaut choreography
    const aspect = W / H;
    const xScale = aspect < 1 ? 0.45 : Math.min(1, aspect / 1.6);
    holder.position.set(U.ax * 2.2 * xScale, U.ay * 1.6 + Math.sin(t * 0.8) * 0.06, U.az);
    holder.scale.setScalar(U.ascale * (aspect < 1 ? 0.78 : 1));
    astro.rotation.set(
      Math.sin(t * 0.5) * 0.08 + mouse.y * 0.25 + U.aspin * 0.3,
      U.arot + Math.sin(t * 0.3) * 0.25 + mouse.x * 0.5,
      Math.sin(t * 0.4) * 0.12 - 0.15 + U.aspin
    );
    R.sh.rotation.z = 0.9 + Math.sin(t * 1.1) * 0.12;
    L.sh.rotation.z = -0.55 + Math.sin(t * 0.9 + 1) * 0.08;
    LL.hip.rotation.x = 0.35 + Math.sin(t * 0.7) * 0.08;
    RL.hip.rotation.x = -0.15 + Math.sin(t * 0.7 + 2) * 0.08;

    // tether trailing behind into the tunnel (fades as we leave it)
    if (U.mix < 0.95 && U.ascale > 0.2) {
      astro.updateMatrixWorld();
      const start = new THREE.Vector3(0, 0.1, -0.5).applyMatrix4(astro.matrixWorld);
      for (let i = 0; i < tPts.length; i++) {
        const k = i / (tPts.length - 1);
        tPts[i].set(
          start.x * (1 - k) + Math.sin(t * 0.7 + k * 4) * 0.25 * k - k * 1.5,
          start.y * (1 - k) + Math.cos(t * 0.6 + k * 3) * 0.2 * k - k * 0.6,
          start.z - k * 9
        );
      }
      if (tether) { tether.geometry.dispose(); scene.remove(tether); }
      tether = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(tPts), 40, 0.012, 5, false), tetherMat);
      scene.add(tether);
    } else if (tether) { scene.remove(tether); tether.geometry.dispose(); tether = null; }

    rim.intensity = 3.2 * (1 - U.mix * 0.4);
    key.intensity = 0.75 + U.mix * 0.45;

    renderer.setRenderTarget(bgTarget);
    renderer.render(bgScene, orthoCam);
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(blitScene, orthoCam);
    renderer.clearDepth();
    if (U.ascale > 0.01) renderer.render(scene, camera);

    if (!U.ready) { U.ready = true; document.dispatchEvent(new Event('universe:ready')); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
