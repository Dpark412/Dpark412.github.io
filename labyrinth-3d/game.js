"use strict";
/* THE LABYRINTH — 3D. Same descent as the 2D world, now walkable in first person.
   22 rooms: entry + 3 Depth-I chambers + 6 Depth-II + 4 Depth-III trials + 8 endings. */

/* ============ WORLD DATA (same content/voice as the 2D world) ============ */
const ROOMS = {
entry:{name:"THE THRESHOLD",depth:"SURFACE",
 intro:"Three doors. You know all three. Walk through one — and this time, live with what happens after.",
 q:"Which door?",
 choices:[
  {t:"Door I — The Burning House",beat:"Heat rolls out as the door swings open.",to:"ch1"},
  {t:"Door II — The $800",beat:"The door opens onto an empty street.",to:"ch2"},
  {t:"Door III — The Laughing Table",beat:"Laughter spills out. Then it stops.",to:"ch3"}]},
ch1:{name:"CHAMBER I — THE BURNING HOUSE",depth:"▼ DEPTH I",
 q:"Fire. Two kids. Your son's friend behind the window — a certain rescue. Your son somewhere in the smoke — a gamble that could kill all three of you.",
 choices:[
  {t:"The certain rescue",beat:"The friend lives. Your son doesn't. The math was right, and it still feels like a crime.",to:"ledger"},
  {t:"Gamble for my own",beat:"You went in for your son. The crew dragged you both out — your son lived. The friend didn't.",to:"smoke"}]},
ch2:{name:"CHAMBER II — THE $800",depth:"▼ DEPTH I",
 q:"Sidewalk. Wallet. $800 and the owner's license. Nobody saw you pick it up.",
 choices:[
  {t:"Return all of it",beat:"You returned it. All of it. You walked home lighter than the wallet.",to:"reward"},
  {t:"Keep it",beat:"You kept it. Nothing happened. That's the worst part — nothing happened.",to:"habit"}]},
ch3:{name:"CHAMBER III — THE LAUGHING TABLE",depth:"▼ DEPTH I",
 q:"Group lunch. They're roasting the new kid — the easy kind of mean that keeps the table laughing. You're laughing too. Or are you?",
 choices:[
  {t:"Speak up",beat:"You spoke. The table went quiet. Lunch was awkward after. It always is.",to:"silence"},
  {t:"Laugh along",beat:"You laughed. The kid stopped coming to lunch that week. Nobody mentioned it.",to:"seattable"}]},
ledger:{name:"THE LEDGER",depth:"▼ DEPTH II",
 q:"One year later. The friend's parents send you money — a lot of it. \u201CFor everything you gave.\u201D Your family could use it. Nobody would ever know.",
 choices:[
  {t:"Take it",beat:"Need is need. Nothing changes what happened — and now you've priced it.",to:"wire"},
  {t:"Refuse it",beat:"Some debts aren't money. You send it back.",to:"debt"}]},
smoke:{name:"THE SMOKE",depth:"▼ DEPTH II",
 q:"The department wants to pin a medal on you. Ceremony. Cameras. The friend's parents in the front row.",
 choices:[
  {t:"Accept it",beat:"The applause is real. So is the look on the mother's face.",to:"seatpower"},
  {t:"Decline it, publicly",beat:"You tell the room the truth. The silence afterward is the honest kind.",to:"mirror"}]},
reward:{name:"THE REWARD",depth:"▼ DEPTH II",
 q:"A month later you learn the wallet's owner is your landlord. The one who just raised your rent. He doesn't recognize you.",
 choices:[
  {t:"Say nothing",beat:"The high ground is quiet up here. It doesn't pay rent, but it lets you sleep.",to:"debt"},
  {t:"Mention it at rent time",beat:"You mention it. Lightly. Now you know what your honesty was worth. It had a price.",to:"seatpower"}]},
habit:{name:"THE HABIT",depth:"▼ DEPTH II",
 q:"A month later: a phone on a bench. Unlocked. Worth more than the wallet. Same empty street. Same nobody watching.",
 choices:[
  {t:"Return the phone",beat:"Interesting. This one you return. You're not a pattern — you're a series of exceptions.",to:"mirror"},
  {t:"Keep it too",beat:"Two for two. It's not a mistake anymore — it's a policy.",to:"wire"}]},
silence:{name:"THE SILENCE AFTER",depth:"▼ DEPTH II",
 q:"Monday. The ringleader corners you by the lockers — \u201CYou trying to make me look bad?\u201D The group's watching.",
 choices:[
  {t:"Hold your ground",beat:"You hold. Courage isn't the absence of awkward — it's standing in it.",to:"seatpower"},
  {t:"Smooth it over",beat:"You bought your seat back with someone else's dignity. It was on sale.",to:"mirror"}]},
seattable:{name:"THE SEAT AT THE TABLE",depth:"▼ DEPTH II",
 q:"Friday. They start in on someone else. You feel the laugh coming before you've decided anything.",
 choices:[
  {t:"Laugh again",beat:"The laugh comes easy now. Belonging has a price. You've stopped checking the bill.",to:"wire"},
  {t:"Don't. Not this time",beat:"You don't laugh. One person not laughing is a data point. You're one.",to:"debt"}]},
wire:{name:"THE WIRE",depth:"▼ DEPTH III",
 q:"Layoffs. It's you or Maya. You've both got kids, both got mortgages. The boss closes the door: \u201CGive me one reason it should be her and not you.\u201D",
 choices:[
  {t:"Give him the reason",beat:"",to:"end_animal"},
  {t:"Refuse",beat:"",to:"end_martyr"}]},
seatpower:{name:"THE SEAT",depth:"▼ DEPTH III",
 q:"You're on the hiring panel. Two finalists. Your friend — good, not great, needs this job. A stranger — clearly better. Your vote decides. Nobody will ever know.",
 choices:[
  {t:"Vote your friend",beat:"",to:"end_kingdom"},
  {t:"Vote the stranger",beat:"",to:"end_coldchair"}]},
debt:{name:"THE DEBT",depth:"▼ DEPTH III",
 q:"Your brother stole from your parents. A lot. He begs you not to tell. Then your mother asks, point-blank: \u201CDo you know anything about the missing money?\u201D",
 choices:[
  {t:"Cover for him",beat:"",to:"end_bloodoath"},
  {t:"Tell her",beat:"",to:"end_cleanbreak"}]},
mirror:{name:"THE MIRROR",depth:"▼ DEPTH III",
 q:"Your best friend's partner is cheating. You've seen it. Your friend is happy — happier than they've been in years — and asks, smiling: \u201CWe're good, right? You'd tell me if something was wrong?\u201D",
 choices:[
  {t:"Tell them",beat:"",to:"end_mirror"},
  {t:"Stay silent",beat:"",to:"end_comfortablelie"}]},
end_animal:{ending:true,name:"ENDING: THE ANIMAL",depth:"▼ THE BOTTOM",
 text:"You gave him the reason. Maya's gone Monday. Your kids eat. That's the math of the wire — someone's always on it, and this time it wasn't you. Don't dress it up. You chose, and choosing is the whole thing."},
end_martyr:{ending:true,name:"ENDING: THE MARTYR",depth:"▼ THE BOTTOM",
 text:"You refused. Maybe it saved Maya, maybe it just cost you. Martyrs don't get to see the parade — they only get the principle. If you can live on that, it was the right call. Most people can't. That's why it's rare."},
end_kingdom:{ending:true,name:"ENDING: THE KINGDOM",depth:"▼ THE BOTTOM",
 text:"You built a court, not a team. Everyone around you will be loyal — and mediocre. That's the trade you made: comfort for excellence. Kingdoms like that feel great until the walls need defending."},
end_coldchair:{ending:true,name:"ENDING: THE COLD CHAIR",depth:"▼ THE BOTTOM",
 text:"You voted the stranger. Your friend won't speak to you now. The team got better and you got lonelier. That's what principle costs retail — not the idea of it, the actual invoice."},
end_bloodoath:{ending:true,name:"ENDING: THE BLOOD OATH",depth:"▼ THE BOTTOM",
 text:"You lied for your brother. He'll pay it back or he won't — but now you're both in the hole together. Loyalty isn't a virtue when it's just fear of being the one who told. Ask yourself which one it was."},
end_cleanbreak:{ending:true,name:"ENDING: THE CLEAN BREAK",depth:"▼ THE BOTTOM",
 text:"You told. Your brother may never forgive you, and your parents will never look at him the same. You chose the truth over the blood. Clean breaks bleed the longest — that's why most people never make them."},
end_mirror:{ending:true,name:"ENDING: THE MIRROR",depth:"▼ THE BOTTOM",
 text:"You told. Their happiness broke in your hands, and they'll remember you as the one who did it. The truth doesn't care who carries it. You do. That's the whole weight of it."},
end_comfortablelie:{ending:true,name:"ENDING: THE COMFORTABLE LIE",depth:"▼ THE BOTTOM",
 text:"You stayed silent. They're still happy. You're the only one who knows the price of that happiness, and you'll pay it every time you see them smile. Comfortable lies are the most expensive kind — they bill you forever."}
};

/* ============ THREE SETUP ============ */
const stage = document.getElementById('stage');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0c);
scene.fog = new THREE.FogExp2(0x0a0a0c, 0.045);
const camera = new THREE.PerspectiveCamera(72, 1, 0.1, 120);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
stage.appendChild(renderer.domElement);
const ambient = new THREE.AmbientLight(0x30281e, 0.9);
scene.add(ambient);

const ROOM_W = 16, ROOM_D = 22, WALL_H = 5, EYE = 1.7;
const player = { x: 0, z: 8, yaw: 0, pitch: 0 };
let mode = 'title', roomId = 'entry', room = null, doors = [], roomGroup = null;
let embers = null, emberVel = null, torchLights = [];
const keys = {};

const dlg = document.getElementById('dialog'), dWho = document.getElementById('dWho'),
      dTxt = document.getElementById('dTxt'), dCh = document.getElementById('dCh');
const fadeEl = document.getElementById('fade');

function mat(color, opts) {
  return new THREE.MeshStandardMaterial(Object.assign({ color: color, roughness: 0.95, metalness: 0 }, opts || {}));
}
function box(w, h, d, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  return m;
}

function buildRoom(id) {
  if (roomGroup) { scene.remove(roomGroup); roomGroup.traverse(o => { if (o.geometry) o.geometry.dispose(); }); }
  roomGroup = new THREE.Group();
  torchLights = [];
  room = ROOMS[id]; roomId = id;
  document.getElementById('hudDepth').textContent = room.depth;
  document.getElementById('hudRoom').textContent = room.name;
  const floorMat = mat(0x17171c), wallMat = mat(0x1e1e26), trimMat = mat(0x2c2c36);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), floorMat);
  floor.rotation.x = -Math.PI / 2; roomGroup.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), mat(0x0d0d10));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = WALL_H; roomGroup.add(ceil);
  // side walls + back wall (behind player) solid; far wall built around door slots
  roomGroup.add(box(0.6, WALL_H, ROOM_D, wallMat, -ROOM_W / 2 - 0.3, WALL_H / 2, 0));
  roomGroup.add(box(0.6, WALL_H, ROOM_D, wallMat, ROOM_W / 2 + 0.3, WALL_H / 2, 0));
  roomGroup.add(box(ROOM_W + 1.2, WALL_H, 0.6, wallMat, 0, WALL_H / 2, ROOM_D / 2 + 0.3));
  roomGroup.add(box(ROOM_W + 1.2, 0.5, 0.7, trimMat, 0, WALL_H - 0.25, -ROOM_D / 2 - 0.3));
  // floor center medallion: ember ring
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.1, 1.5, 40), new THREE.MeshBasicMaterial({ color: 0xff7a1a, side: THREE.DoubleSide, transparent: true, opacity: 0.55 }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; roomGroup.add(ring);
  // torches on side walls
  [[-ROOM_W / 2 + 0.15, -6], [ROOM_W / 2 - 0.15, -6], [-ROOM_W / 2 + 0.15, 4], [ROOM_W / 2 - 0.15, 4]].forEach((p, i) => {
    const torch = box(0.18, 0.7, 0.18, mat(0x3d2c1c), p[0], 2.6, p[1]);
    roomGroup.add(torch);
    const flame = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffa040 }));
    flame.position.set(p[0], 3.15, p[1]); roomGroup.add(flame);
    const li = new THREE.PointLight(0xff8a2a, 1.4, 14, 1.6);
    li.position.set(p[0], 3.1, p[1]); li.userData.base = 1.4; li.userData.ph = i * 1.7;
    roomGroup.add(li); torchLights.push(li);
  });
  // ember particles
  const N = 160, pos = new Float32Array(N * 3); emberVel = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * (ROOM_W - 2);
    pos[i * 3 + 1] = Math.random() * WALL_H;
    pos[i * 3 + 2] = (Math.random() - 0.5) * (ROOM_D - 2);
    emberVel[i] = 0.25 + Math.random() * 0.6;
  }
  const eg = new THREE.BufferGeometry();
  eg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  embers = new THREE.Points(eg, new THREE.PointsMaterial({ color: 0xff8a2a, size: 0.09, transparent: true, opacity: 0.85 }));
  roomGroup.add(embers);
  // doors on the far wall
  doors = [];
  const farZ = -ROOM_D / 2;
  if (room.ending) {
    doors.push(makeDoor(0, 3.2, farZ, true, -1));
    setDoorState(doors[0], 'open');
  } else {
    const n = room.choices.length, dw = 3.2, gap = (ROOM_W - n * dw) / (n + 1);
    for (let i = 0; i < n; i++) doors.push(makeDoor(-ROOM_W / 2 + gap * (i + 1) + dw * i + dw / 2, dw, farZ, false, i));
  }
  // fill far wall segments between/around doors, plus lintel above them
  {
    let cx = -ROOM_W / 2;
    const segs = [];
    doors.forEach(d => { segs.push([cx, d.x - d.w / 2]); cx = d.x + d.w / 2; });
    segs.push([cx, ROOM_W / 2]);
    segs.forEach(s => {
      const w = s[1] - s[0];
      if (w > 0.05) roomGroup.add(box(w, WALL_H, 0.6, wallMat, (s[0] + s[1]) / 2, WALL_H / 2, farZ));
    });
    roomGroup.add(box(ROOM_W, WALL_H - 3.6, 0.6, wallMat, 0, 3.6 + (WALL_H - 3.6) / 2, farZ));
  }
  scene.add(roomGroup);
  player.x = 0; player.z = 8; player.yaw = 0; player.pitch = 0;
}
function makeDoor(x, w, z, portal, ci) {
  const g = new THREE.Group();
  const frame = box(w + 0.4, 3.8, 0.3, mat(0x2c2c36), 0, 1.9, 0);
  const slab = box(w, 3.6, 0.18, mat(0x3d2c1c), 0, 1.8, 0.08);
  slab.userData.isSlab = true;
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(w, 3.6), new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0 }));
  glow.position.set(0, 1.8, -0.05); glow.userData.isGlow = true;
  g.add(frame); g.add(slab); g.add(glow);
  g.position.set(x, 0, z);
  roomGroup.add(g);
  const d = { x: x, w: w, group: g, slab: slab, glow: glow, open: false, sealed: false, portal: portal, ci: ci };
  return d;
}
function setDoorState(d, state) {
  if (state === 'open') {
    d.open = true;
    d.slab.visible = false;
    d.glow.material.opacity = 0.85;
  } else if (state === 'sealed') {
    d.sealed = true;
    d.slab.material = mat(0x232329);
    const plank1 = box(d.w + 0.2, 0.25, 0.1, mat(0x3a3a40), 0, 2.3, 0.2);
    plank1.rotation.z = 0.5;
    const plank2 = box(d.w + 0.2, 0.25, 0.1, mat(0x3a3a40), 0, 1.4, 0.2);
    plank2.rotation.z = -0.5;
    d.group.add(plank1); d.group.add(plank2);
  }
}

/* ============ DIALOG FLOW ============ */
function showDlg(who, txt, buttons) {
  dWho.textContent = who; dTxt.textContent = txt; dCh.innerHTML = '';
  buttons.forEach((b, i) => {
    const el = document.createElement('button');
    el.textContent = b.label; el.onclick = () => b.fn(i);
    dCh.appendChild(el);
  });
  dlg.style.display = 'block';
}
function hideDlg() { dlg.style.display = 'none'; }
function contBtn(label, fn) {
  const el = document.createElement('button');
  el.className = 'cont'; el.textContent = label; el.onclick = fn;
  dCh.appendChild(el);
}
function dilemma() {
  mode = 'dialog';
  showDlg(room.name, room.q, room.choices.map(c => ({ label: c.t, fn: (i) => choose(i) })));
}
function choose(i) {
  hideDlg(); mode = 'play';
  doors.forEach((d, di) => { if (di === i) setDoorState(d, 'open'); else setDoorState(d, 'sealed'); });
}
function loadRoom(id, beatToShow) {
  buildRoom(id);
  const after = () => {
    if (room.ending) {
      mode = 'dialog';
      showDlg(room.name, room.text, []);
      contBtn('↺ Return to the surface', () => { hideDlg(); transition('entry'); });
    } else if (beatToShow) {
      mode = 'dialog';
      showDlg('FLINT', beatToShow, []);
      contBtn('Continue ▼', () => { hideDlg(); mode = 'play'; setTimeout(dilemma, 350); });
    } else if (room.intro) {
      mode = 'dialog';
      showDlg(room.name, room.intro, []);
      contBtn('Continue ▼', () => { hideDlg(); mode = 'play'; setTimeout(dilemma, 350); });
    } else { mode = 'play'; setTimeout(() => { if (mode === 'play') dilemma(); }, 400); }
  };
  fadeEl.style.opacity = 1;
  setTimeout(() => { after(); fadeEl.style.opacity = 0; }, 320);
}
function transition(id) { loadRoom(id, null); }
function goThrough(d) {
  if (d.portal) { loadRoom('entry', null); return; }
  const c = room.choices[d.ci];
  loadRoom(c.to, c.beat || null);
}

/* ============ INPUT ============ */
addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
  keys[k] = true;
  if (mode === 'dialog') {
    if (k === '1' && dCh.children[0]) dCh.children[0].click();
    if (k === '2' && dCh.children[1]) dCh.children[1].click();
    if (k === '3' && dCh.children[2]) dCh.children[2].click();
    if ((k === 'enter' || k === ' ') && dCh.querySelector('.cont')) dCh.querySelector('.cont').click();
  }
});
addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

let dragging = null;
renderer.domElement.addEventListener('pointerdown', e => {
  if (mode !== 'play') return;
  dragging = { x: e.clientX, y: e.clientY };
});
addEventListener('pointermove', e => {
  if (!dragging || mode !== 'play') return;
  player.yaw -= (e.clientX - dragging.x) * 0.0035;
  player.pitch -= (e.clientY - dragging.y) * 0.0028;
  player.pitch = Math.max(-0.6, Math.min(0.6, player.pitch));
  dragging = { x: e.clientX, y: e.clientY };
});
addEventListener('pointerup', () => { dragging = null; });

// touch: left half = move stick, right half = look
const joy = { id: null, ox: 0, oy: 0, dx: 0, dy: 0 };
const lookT = { id: null, lx: 0, ly: 0 };
const joyBase = document.getElementById('joyBase'), joyKnob = document.getElementById('joyKnob');
renderer.domElement.addEventListener('touchstart', e => {
  if (mode !== 'play') return;
  for (const t of e.changedTouches) {
    if (t.clientX < innerWidth * 0.4 && joy.id === null) {
      joy.id = t.identifier; joy.ox = t.clientX; joy.oy = t.clientY; joy.dx = 0; joy.dy = 0;
      joyBase.style.display = 'block';
      joyBase.style.left = (t.clientX - 55) + 'px'; joyBase.style.top = (t.clientY - 55) + 'px';
      joyKnob.style.transform = 'translate(0px,0px)';
    } else if (lookT.id === null) {
      lookT.id = t.identifier; lookT.lx = t.clientX; lookT.ly = t.clientY;
    }
  }
  e.preventDefault();
}, { passive: false });
renderer.domElement.addEventListener('touchmove', e => {
  for (const t of e.changedTouches) {
    if (t.identifier === joy.id) {
      joy.dx = Math.max(-48, Math.min(48, t.clientX - joy.ox));
      joy.dy = Math.max(-48, Math.min(48, t.clientY - joy.oy));
      joyKnob.style.transform = 'translate(' + joy.dx + 'px,' + joy.dy + 'px)';
    } else if (t.identifier === lookT.id) {
      player.yaw -= (t.clientX - lookT.lx) * 0.005;
      player.pitch -= (t.clientY - lookT.ly) * 0.004;
      player.pitch = Math.max(-0.6, Math.min(0.6, player.pitch));
      lookT.lx = t.clientX; lookT.ly = t.clientY;
    }
  }
  e.preventDefault();
}, { passive: false });
const endTouch = e => {
  for (const t of e.changedTouches) {
    if (t.identifier === joy.id) { joy.id = null; joy.dx = 0; joy.dy = 0; joyBase.style.display = 'none'; }
    if (t.identifier === lookT.id) lookT.id = null;
  }
};
renderer.domElement.addEventListener('touchend', endTouch);
renderer.domElement.addEventListener('touchcancel', endTouch);

document.getElementById('enter').onclick = () => {
  document.getElementById('title').style.display = 'none';
  loadRoom('entry', null);
};
document.getElementById('restart').onclick = () => { hideDlg(); loadRoom('entry', null); };

/* ============ UPDATE + RENDER ============ */
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

let last = performance.now(), bobT = 0;
function update(dt, t) {
  if (mode === 'play') {
    let fwd = 0, str = 0;
    if (keys['w'] || keys['arrowup']) fwd += 1;
    if (keys['s'] || keys['arrowdown']) fwd -= 1;
    if (keys['a']) str -= 1;
    if (keys['d']) str += 1;
    if (keys['arrowleft']) player.yaw += 1.9 * dt;
    if (keys['arrowright']) player.yaw -= 1.9 * dt;
    fwd += -joy.dy / 48; str += joy.dx / 48;
    const m = Math.hypot(fwd, str);
    if (m > 0.01) {
      const sp = 4.4, n = Math.min(1, m);
      const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
      const vx = (-sin * fwd + cos * str) * sp * n;
      const vz = (-cos * fwd - sin * str) * sp * n;
      player.x += vx * dt; player.z += vz * dt;
      bobT += dt * 7;
    }
    // walls + door logic
    const minX = -ROOM_W / 2 + 0.7, maxX = ROOM_W / 2 - 0.7;
    const farZ = -ROOM_D / 2;
    player.x = Math.max(minX, Math.min(maxX, player.x));
    player.z = Math.min(ROOM_D / 2 - 0.7, player.z);
    if (player.z < farZ + 0.9) {
      const open = doors.find(d => d.open && Math.abs(player.x - d.x) < d.w / 2 + 0.25);
      if (open) { goThrough(open); return; }
      player.z = farZ + 0.9;
    }
  }
  // torch flicker
  for (const li of torchLights) li.intensity = li.userData.base * (0.85 + 0.22 * Math.sin(t * 7 + li.userData.ph) + 0.1 * Math.sin(t * 13 + li.userData.ph * 2));
  // embers rise
  if (embers) {
    const p = embers.geometry.attributes.position.array;
    for (let i = 0; i < emberVel.length; i++) {
      p[i * 3 + 1] += emberVel[i] * dt;
      if (p[i * 3 + 1] > WALL_H) p[i * 3 + 1] = 0.1;
    }
    embers.geometry.attributes.position.needsUpdate = true;
  }
  camera.position.set(player.x, EYE + Math.sin(bobT) * 0.035, player.z);
  camera.rotation.order = 'YXZ';
  camera.rotation.y = player.yaw;
  camera.rotation.x = player.pitch;
}
function loop(t) {
  const dt = Math.min(0.05, (t - last) / 1000); last = t;
  if (mode !== 'title') { update(dt, t / 1000); renderer.render(scene, camera); }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
