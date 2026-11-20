# The 3D opening: Yan's desk at night. A phone lights up with Kit's silence, the Six Flights notebook opens on Monday's
# three pencilled choices, and the camera pushes into the page. 9 s at 30 fps (frames 1-270), 1920x1080.
# usage: blender -b -P room.py -- <frames_dir> <first> <last> [samples]
import bpy, sys, math
from mathutils import Vector
argv = sys.argv[sys.argv.index('--') + 1:]
OUT, F0, F1 = argv[0], int(argv[1]), int(argv[2]); SAMPLES = int(argv[3]) if len(argv) > 3 else 48
T = '/home/user/reel/room/tex/'

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = SAMPLES
sc.cycles.use_denoising = True; sc.cycles.denoiser = 'OPENIMAGEDENOISE'
sc.cycles.max_bounces = 4; sc.cycles.diffuse_bounces = 2; sc.cycles.glossy_bounces = 2; sc.cycles.transmission_bounces = 2
sc.render.resolution_x, sc.render.resolution_y = 1280, 720
sc.render.use_persistent_data = True; sc.cycles.use_adaptive_sampling = True
sc.view_settings.exposure = -0.2
sc.render.image_settings.file_format = 'PNG'
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
sc.render.fps = 30; sc.frame_start, sc.frame_end = 1, 210
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.006, 0.008, 0.02, 1); w.node_tree.nodes['Background'].inputs['Strength'].default_value = 1

def principled(name, color, rough=0.5, spec=0.3):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1); b.inputs['Roughness'].default_value = rough
    b.inputs['Specular IOR Level'].default_value = spec; return m
def image_mat(name, path, rough=0.7, emit=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tex = nt.nodes.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(path); tex.interpolation = 'Cubic'
    nt.links.new(tex.outputs['Color'], b.inputs['Base Color']); b.inputs['Roughness'].default_value = rough
    if emit:
        nt.links.new(tex.outputs['Color'], b.inputs['Emission Color']); b.inputs['Emission Strength'].default_value = emit
    return m
def box(name, size, loc, mat, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot); o = bpy.context.object; o.name = name
    o.scale = size; bpy.ops.object.transform_apply(scale=True); o.data.materials.append(mat); return o
def plane(name, w, h, loc, mat, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=rot); o = bpy.context.object; o.name = name
    o.scale = (w, h, 1); bpy.ops.object.transform_apply(scale=True); o.data.materials.append(mat); return o
def cyl(name, r, d, loc, mat, rot=(0, 0, 0), verts=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=d, location=loc, rotation=rot); o = bpy.context.object
    o.name = name; o.data.materials.append(mat); bpy.ops.object.shade_smooth(); return o

# ---------- the room ----------
wood = bpy.data.materials.new('wood'); wood.use_nodes = True; nt = wood.node_tree; b = nt.nodes['Principled BSDF']
wave = nt.nodes.new('ShaderNodeTexNoise'); wave.inputs['Scale'].default_value = 2.0; wave.inputs['Detail'].default_value = 8; wave.inputs['Roughness'].default_value = 0.6
mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1.2, 28, 1); tc = nt.nodes.new('ShaderNodeTexCoord')
nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], wave.inputs['Vector'])
ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].position = 0.35; ramp.color_ramp.elements[0].color = (0.11, 0.055, 0.03, 1); ramp.color_ramp.elements[1].position = 0.65; ramp.color_ramp.elements[1].color = (0.20, 0.11, 0.055, 1)
nt.links.new(wave.outputs['Fac'], ramp.inputs['Fac']); nt.links.new(ramp.outputs['Color'], b.inputs['Base Color'])
b.inputs['Roughness'].default_value = 0.42; b.inputs['Specular IOR Level'].default_value = 0.4
box('desk', (1.9, 0.95, 0.04), (0, -0.02, 0.73), wood)
wall = principled('wall', (0.10, 0.11, 0.15), 0.9, 0.1)
plane('wall', 6, 3, (0, 0.62, 1.5), wall, rot=(math.pi / 2, 0, 0))
plane('floor', 6, 6, (0, 0, 0), principled('floor', (0.05, 0.04, 0.04), 0.8))
# the window: night city through rain (procedural, emissive, thrown out of focus by the lens)
win = bpy.data.materials.new('window'); win.use_nodes = True; nt = win.node_tree; nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial'); em = nt.nodes.new('ShaderNodeEmission'); em.inputs['Strength'].default_value = 2.2
tc = nt.nodes.new('ShaderNodeTexCoord')
grad = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Generated'], grad.inputs[0])
sky = nt.nodes.new('ShaderNodeValToRGB'); sky.color_ramp.elements[0].color = (0.015, 0.03, 0.08, 1); sky.color_ramp.elements[1].color = (0.05, 0.07, 0.16, 1)
nt.links.new(grad.outputs['Z'], sky.inputs['Fac'])
vor = nt.nodes.new('ShaderNodeTexVoronoi'); vor.inputs['Scale'].default_value = 26; vor.inputs['Randomness'].default_value = 0.8
nt.links.new(tc.outputs['Generated'], vor.inputs['Vector'])
dots = nt.nodes.new('ShaderNodeValToRGB'); dots.color_ramp.elements[0].position = 0.0; dots.color_ramp.elements[0].color = (1.0, 0.75, 0.4, 1)
dots.color_ramp.elements[1].position = 0.09; dots.color_ramp.elements[1].color = (0, 0, 0, 1)
nt.links.new(vor.outputs['Distance'], dots.inputs['Fac'])
low = nt.nodes.new('ShaderNodeMath'); low.operation = 'LESS_THAN'; low.inputs[1].default_value = 0.55; nt.links.new(grad.outputs['Z'], low.inputs[0])
lights = nt.nodes.new('ShaderNodeMixRGB'); lights.blend_type = 'MULTIPLY'; lights.inputs['Fac'].default_value = 1
nt.links.new(dots.outputs['Color'], lights.inputs[1]); nt.links.new(low.outputs[0], lights.inputs[2])
# rain: stretched, moving 4D noise as faint streaks
mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (60, 60, 2.5); nt.links.new(tc.outputs['Generated'], mp.inputs['Vector'])
noise = nt.nodes.new('ShaderNodeTexNoise'); noise.noise_dimensions = '4D'; noise.inputs['Scale'].default_value = 1.0; noise.inputs['Detail'].default_value = 1
nt.links.new(mp.outputs['Vector'], noise.inputs['Vector'])
noise.inputs['W'].default_value = 0; noise.inputs['W'].keyframe_insert('default_value', frame=1); noise.inputs['W'].default_value = 9; noise.inputs['W'].keyframe_insert('default_value', frame=210)
streak = nt.nodes.new('ShaderNodeValToRGB'); streak.color_ramp.elements[0].position = 0.62; streak.color_ramp.elements[0].color = (0, 0, 0, 1)
streak.color_ramp.elements[1].position = 0.75; streak.color_ramp.elements[1].color = (0.25, 0.3, 0.42, 1)
nt.links.new(noise.outputs['Fac'], streak.inputs['Fac'])
add1 = nt.nodes.new('ShaderNodeMixRGB'); add1.blend_type = 'ADD'; add1.inputs['Fac'].default_value = 1
nt.links.new(sky.outputs['Color'], add1.inputs[1]); nt.links.new(lights.outputs['Color'], add1.inputs[2])
add2 = nt.nodes.new('ShaderNodeMixRGB'); add2.blend_type = 'ADD'; add2.inputs['Fac'].default_value = 1
nt.links.new(add1.outputs['Color'], add2.inputs[1]); nt.links.new(streak.outputs['Color'], add2.inputs[2])
nt.links.new(add2.outputs['Color'], em.inputs['Color']); nt.links.new(em.outputs[0], out.inputs['Surface'])
plane('window', 1.3, 0.95, (0.42, 0.605, 1.42), win, rot=(math.pi / 2, 0, 0))
frame_m = principled('frame', (0.03, 0.03, 0.035), 0.6)
for (sx, sz, x, z) in [(1.38, 0.04, 0.42, 1.895), (1.38, 0.04, 0.42, 0.945), (0.04, 0.99, -0.25, 1.42), (0.04, 0.99, 1.09, 1.42), (0.03, 0.95, 0.42, 1.42), (1.3, 0.03, 0.42, 1.42)]:
    box('frame', (sx, 0.04, sz), (x, 0.59, z), frame_m)

# ---------- things on the desk ----------
W, H, PT, CT = 0.21, 0.28, 0.010, 0.0025       # notebook: width, height, page block, cover
TOP = 0.75 + PT
paper = principled('paper', (0.86, 0.81, 0.70), 0.85, 0.15)
box('pages', (W - 0.004, H - 0.006, PT), (0, 0, 0.75 + PT / 2), paper)
plane('page-right', W - 0.008, H - 0.01, (0, 0, TOP + 0.0004), image_mat('mon-r', T + 'mon-right.png', 0.85))
pivot = bpy.data.objects.new('pivot', None); sc.collection.objects.link(pivot); pivot.location = (-W / 2, 0, TOP)
cloth = principled('cloth', (0.07, 0.08, 0.22), 0.75, 0.2)
c = box('cover', (W + 0.004, H + 0.004, CT), (W / 2, 0, CT / 2), cloth); c.parent = pivot
f = plane('cover-front', W, H, (W / 2, 0, CT + 0.0003), image_mat('cov', T + 'cover-c.png', 0.6)); f.parent = pivot
i = plane('cover-inside', W - 0.008, H - 0.01, (W / 2, 0, -0.0004), image_mat('mon-l', T + 'mon-left.png', 0.85), rot=(0, math.pi, 0)); i.parent = pivot
# the cover swings open over frames 135-189, settling down onto the desk at the end
pivot.rotation_euler = (0, 0, 0); pivot.keyframe_insert('rotation_euler', frame=105)
pivot.rotation_euler = (0, -math.pi, 0); pivot.keyframe_insert('rotation_euler', frame=147)
pivot.keyframe_insert('location', frame=140); pivot.location = (-W / 2, 0, 0.75 + CT); pivot.keyframe_insert('location', frame=147)
# phone, keys, pencil, mug
ph = box('phone', (0.072, 0.152, 0.008), (0.27, -0.06, 0.754), principled('phone', (0.01, 0.01, 0.012), 0.25, 0.6), rot=(0, 0, math.radians(-14)))
scr = image_mat('screen', T + 'phone.png', 0.3, emit=0.0)
s = plane('screen', 0.066, 0.143, (0.27, -0.06, 0.7582), scr, rot=(0, 0, math.radians(-14)))
sb = scr.node_tree.nodes['Principled BSDF'].inputs['Emission Strength']
sb.default_value = 0.0; sb.keyframe_insert('default_value', frame=22); sb.default_value = 0.9; sb.keyframe_insert('default_value', frame=27)
metal = principled('brass', (0.75, 0.55, 0.25), 0.3, 0.8); metal.node_tree.nodes['Principled BSDF'].inputs['Metallic'].default_value = 1
bpy.ops.mesh.primitive_torus_add(major_radius=0.022, minor_radius=0.0025, location=(-0.2, -0.17, 0.753)); bpy.context.object.data.materials.append(metal)
for k, (dx, dy, a) in enumerate([(0.04, 0.0, 10), (0.03, 0.03, 55)]):
    box('key', (0.05, 0.012, 0.003), (-0.2 + dx, -0.17 + dy, 0.752), metal, rot=(0, 0, math.radians(a)))
cyl('pencil', 0.0045, 0.17, (0.17, 0.13, 0.7545), principled('pencil', (0.85, 0.62, 0.12), 0.5), rot=(0, math.pi / 2, math.radians(28)), verts=6)
mug = cyl('mug', 0.042, 0.095, (-0.46, 0.02, 0.7975), principled('mug', (0.55, 0.16, 0.12), 0.35, 0.5))
# desk lamp
lampm = principled('lamp', (0.02, 0.025, 0.03), 0.35, 0.6)
cyl('lamp-base', 0.07, 0.02, (-0.42, 0.24, 0.76), lampm)
cyl('lamp-arm', 0.008, 0.46, (-0.36, 0.20, 0.98), lampm, rot=(math.radians(-18), math.radians(22), 0))
bpy.ops.mesh.primitive_cone_add(vertices=48, radius1=0.085, radius2=0.03, depth=0.12, end_fill_type='NOTHING', location=(-0.27, 0.13, 1.17))
shade = bpy.context.object; shade.data.materials.append(lampm); bpy.ops.object.shade_smooth()
shade_inner = principled('shade-in', (1.0, 0.85, 0.6), 0.5); shade.data.materials.append(shade_inner)

# ---------- light ----------
target = bpy.data.objects.new('aim', None); sc.collection.objects.link(target); target.location = (0.02, -0.02, 0.76)
spot_d = bpy.data.lights.new('lamp', 'SPOT'); spot_d.energy = 60; spot_d.color = (1.0, 0.72, 0.42); spot_d.spot_size = math.radians(75); spot_d.spot_blend = 0.6; spot_d.shadow_soft_size = 0.04
spot = bpy.data.objects.new('lamp', spot_d); sc.collection.objects.link(spot); spot.location = (-0.25, 0.11, 1.13)
cn = spot.constraints.new('TRACK_TO'); cn.target = target; cn.track_axis = 'TRACK_NEGATIVE_Z'; cn.up_axis = 'UP_Y'
sn = shade.constraints.new('TRACK_TO'); sn.target = target; sn.track_axis = 'TRACK_NEGATIVE_Z'; sn.up_axis = 'UP_Y'
bulb = bpy.data.lights.new('bulb', 'POINT'); bulb.energy = 1.5; bulb.color = (1.0, 0.7, 0.4); bulb.shadow_soft_size = 0.02
bo = bpy.data.objects.new('bulb', bulb); sc.collection.objects.link(bo); bo.location = (-0.27, 0.13, 1.19)
cool = bpy.data.lights.new('window-light', 'AREA'); cool.energy = 30; cool.color = (0.45, 0.58, 1.0); cool.size = 1.2
co = bpy.data.objects.new('window-light', cool); sc.collection.objects.link(co); co.location = (0.42, 0.5, 1.4); co.rotation_euler = (math.radians(-80), 0, 0)
# a glow on the phone screen once it lights
pl = bpy.data.lights.new('phone-glow', 'AREA'); pl.size = 0.12; pl.color = (0.45, 0.6, 1.0)
plo = bpy.data.objects.new('phone-glow', pl); sc.collection.objects.link(plo); plo.location = (0.27, -0.06, 0.78)
pl.energy = 0; pl.keyframe_insert('energy', frame=22); pl.energy = 0.8; pl.keyframe_insert('energy', frame=27)

# ---------- camera ----------
cd = bpy.data.cameras.new('cam'); cd.lens = 45; cd.dof.use_dof = True; cd.dof.aperture_fstop = 2.2
cam = bpy.data.objects.new('cam', cd); sc.collection.objects.link(cam); sc.camera = cam
focus = bpy.data.objects.new('focus', None); sc.collection.objects.link(focus); cd.dof.focus_object = focus
cc = cam.constraints.new('TRACK_TO'); cc.target = focus; cc.track_axis = 'TRACK_NEGATIVE_Z'; cc.up_axis = 'UP_Y'
KEYS = [  # frame, camera position, where it looks (and focuses)
    (1,   (0.55, -1.05, 1.30), (0.12, 0.00, 0.77)),
    (50,  (0.40, -0.80, 1.20), (0.18, -0.05, 0.765)),   # drifts towards the phone as it lights
    (105, (0.12, -0.58, 1.12), (-0.02, 0.0, 0.765)),    # settles on the closed notebook
    (147, (-0.06, -0.48, 1.10), (-0.10, 0.0, 0.765)),   # the cover opens; the whole spread
    (210, (0.0, -0.13, 1.03), (0.0, 0.02, 0.762)),      # into the right page, the three choices
]
for f_, cp, tp in KEYS:
    cam.location = cp; cam.keyframe_insert('location', frame=f_); focus.location = tp; focus.keyframe_insert('location', frame=f_)
for ob in (cam, focus, pivot):
    if ob.animation_data:
        for fc in ob.animation_data.action.fcurves:
            for kp in fc.keyframe_points: kp.interpolation = 'BEZIER'
for f_ in range(F0, F1 + 1):
    sc.frame_set(f_); sc.render.filepath = f'{OUT}/{f_:04d}.png'; bpy.ops.render.render(write_still=True)
