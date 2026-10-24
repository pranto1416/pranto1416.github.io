/* PRANTOVERSE — content. Edit here to add/remove projects. */
window.PV_DATA = (function () {
  const G = 'https://sites.google.com/sitesv-images-rt/';
  const yt = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return {
    games: [
      { t: '2D Retro FPS', sub: 'A DOOM II-inspired boomer shooter. Strafe, shoot, survive.', genre: 'FPS', plat: 'web', play: 'https://prantooo.itch.io/retro-2d-fps-noob-creation', vid: 'UPgf4tVzvvw', img: yt('UPgf4tVzvvw'), h: 8 },
      { t: 'Retro Madness', sub: 'Neon endless runner. How far can you get?', genre: 'Endless Runner', plat: 'web', play: 'https://prantooo.itch.io/retro-madness', vid: 'kx4QTOg3b7U', img: yt('kx4QTOg3b7U'), h: 300 },
      { t: 'Maintain Social Distance', sub: 'Survival game: keep your distance or it is over.', genre: 'Survival', plat: 'web', play: 'https://prantooo.itch.io/maintaining-social-distance', vid: 'tS7rZ6jD90g', img: yt('tS7rZ6jD90g'), h: 160 },
      { t: 'Knife Throwing', sub: 'One-tap hyper-casual. Timing is everything.', genre: 'Hyper-casual', plat: 'web', play: 'https://prantooo.itch.io/knife-throwing-replica', vid: 'FeCcZ9q93TY', img: yt('FeCcZ9q93TY'), h: 200 },
      { t: 'Retro Madness 2.0', sub: 'The sequel: faster, harder, more retro.', genre: 'Endless Runner', plat: 'pc', play: 'https://prantooo.itch.io/retro-madness-2', vid: 'z7rOBvJ-VN0', img: yt('z7rOBvJ-VN0'), h: 320 },
      { t: 'Beat Your Beats', sub: 'Mixed-genre rhythm game. Play to the music.', genre: 'Rhythm', plat: 'pc', play: 'https://prantooo.itch.io/beat-your-beats', vid: 'jR_UCCc5mIo', img: yt('jR_UCCc5mIo'), h: 280 },
      { t: 'Chordscape', sub: 'Maps musical chords to keyboard keys, with real-time audio-visual effects.', genre: 'Music Toy', plat: 'pc', play: 'https://prantooo.itch.io/chordscape', img: 'https://img.itch.zone/aW1nLzIzOTcyNjUyLmpwZw==/original/O00OP%2F.jpg', h: 190 },
      { t: 'Maze Runner', sub: 'Third-person survival in a shifting maze.', genre: 'Survival · TPP', plat: 'pc', play: 'https://prantooo.itch.io/maze-runner', img: 'https://img.itch.zone/aW1nLzc2MzEyNjYucG5n/original/iy3rB3.png', h: 120 }
    ],
    lab: [
      { t: 'Real-Time Weather AR', sub: 'Live weather in augmented reality, for mobile and AR glasses. In development.', img: G + 'AMxu72vIwssN-z8vzYiZSKXqd_ZRaREor-o2pJi-930glhg9MX9Xy7ftOa92bMHrwW-XdE2mJOGs4g0_8LHfKvQaBWOk5CRFVBFuLylTFoj2rOAtfxeLvvXLFSctaX3KmLwzKNJVCUnEovd0k-kphGsoxn3su1d9A8aZjT_WldY2YvhZZF-iNghETH3-yWk3cz7Pwlr7SgdbW4xgVbBI6gmS7KUt4Ts_zZ7fa6SWie4l=w1280', tag: 'AR · WIP', h: 190 },
      { t: 'Simple AR', sub: 'Mobile AR experiment.', vid: '9TS14a2-5Ig', img: yt('9TS14a2-5Ig'), tag: 'AR', h: 210 },
      { t: 'Clock', sub: 'Unpublished 3D experiment.', vid: 'bjkQB1sBZBk', img: yt('bjkQB1sBZBk'), tag: '3D', h: 30 }
    ],
    /* VFX & shader work. Add entries like:
       { t: 'Magic burst', sub: 'Unity particle system', vid: 'YOUTUBE_ID' }   (YouTube clip)
       { t: 'Water shader', sub: 'HLSL · URP', img: 'assets/vfx/water.gif' }    (GIF / image)
       The VFX lane appears automatically once this list has items. */
    vfx: [
      { t: 'RPG VFX · I', sub: 'Unity Particle System', vid: 'OKgq5SZ4_Qs' },
      { t: 'RPG VFX · II', sub: 'Unity Particle System', vid: 'fs9KuK2bml0' }
    ],
    decks: [
      { t: 'Intro to Level Design, Lighting & Post-Processing', href: 'https://docs.google.com/presentation/d/1OCul1JsP74y5VSIM0uZ5vIgR_1w0xXAeS91qF4gOi2U/edit', img: 'assets/deck-1.jpg', h: 24 },
      { t: 'Introduction to Game Development', href: 'https://docs.google.com/presentation/d/1ItMXvm6piBxOQA_tpQzvsLO_opWM-PsVbm6ukcEYW1c/edit', img: 'assets/deck-2.jpg', h: 190 },
      { t: 'Introduction to Level Design & Lighting', href: 'https://docs.google.com/presentation/d/1YtvccRGTcPYj-WNldZ6eVyqHKl43KImCi6PWVavL4qI/edit?usp=sharing', img: 'assets/deck-3.jpg', h: 40 },
      { t: 'Introduction to Lighting & Post-Processing', href: 'https://docs.google.com/presentation/d/1Hxi_BT0Tqxl57kRG5ZdB5nt57Wsz_kGOk7sxVZkO5gw/edit', img: 'assets/deck-4.jpg', h: 300 }
    ],
    reels: [
      { t: 'Forza Horizon × Ghibli', sub: 'Stylized cinematic racing trailer', eng: 'Unity 6', vid: '_4FPlhUJdsA', link: 'https://prantooo.artstation.com/projects/Qxn6x4' },
      { t: "Warrior's Tale", sub: 'Environment & cinematic', eng: 'Unreal Engine 5', vid: '2pQdvQd2vJY' },
      { t: 'Ghibli Rail Station', sub: 'Anime-inspired station', eng: 'Unity URP', vid: '6Y-K9q2Mqtc' },
      { t: 'Rise And Shine', sub: 'Environment & lighting', eng: 'Unity', vid: 'nbNTDBzJ9W0' },
      { t: 'Sci-Fi Corridor', sub: 'Level design', eng: 'Unity URP', vid: 'n9ofzA5_asI' },
      { t: 'Beat Saber-ish', sub: 'VR rhythm level design', eng: 'Unity', vid: '3lLkk_QmCjY' },
      { t: 'Camping Time', sub: 'Environment', eng: 'Unity', vid: '6YfFkWme-DY' }
    ],
    art: [
      { t: 'Ghibli-Inspired Neighborhood', href: 'https://www.artstation.com/artwork/OGQaA6', img: 'https://cdnb.artstation.com/p/assets/images/images/074/458/497/large/pranto-screenshot-20240403-121926.jpg?1712125244', h: 140 },
      { t: 'Ghosts of Bengal', href: 'https://www.artstation.com/artwork/290LAe', img: 'https://cdnb.artstation.com/p/assets/images/images/074/418/813/large/pranto-img-20240402-120315-01.jpg?1712038634', h: 10 },
      { t: 'HDRP Terrain & Lighting', href: 'https://www.artstation.com/artwork/X1qDnn', img: 'https://cdna.artstation.com/p/assets/images/images/058/913/938/large/pranto-screenshot-20.jpg?1675238098', h: 100 },
      { t: 'Night Scene · Animated Film', href: 'https://www.artstation.com/artwork/GekQ0a', img: 'https://cdnb.artstation.com/p/assets/covers/images/062/420/281/large/pranto-pranto-desktop-6.jpg?1683096612', h: 230 },
      { t: 'Sci-Fi Archway', href: 'https://www.artstation.com/artwork/klqXln', img: 'https://cdna.artstation.com/p/assets/covers/images/056/781/376/large/pranto-pranto-screenshot-2022-12-03-195117.jpg?1670076289', h: 200 },
      { t: 'A Walk In The Park', href: 'https://www.artstation.com/artwork/zPDmE6', img: 'https://cdna.artstation.com/p/assets/images/images/060/537/008/large/pranto-frame-9.jpg?1678793606', h: 110 },
      { t: 'John Quick · UI & Level', href: 'https://www.artstation.com/artwork/EvqZP0', img: 'https://cdnb.artstation.com/p/assets/images/images/059/349/371/large/pranto-mainmenu.jpg?1676206757', h: 20 },
      { t: 'MEOWSU · Cat Rhythm Game', href: 'https://www.artstation.com/artwork/QKZ94x', img: 'https://cdna.artstation.com/p/assets/images/images/089/152/268/large/pranto-landingpagedemo.jpg?1750179633', h: 320 },
      { t: 'Circulet · Art Direction', href: 'https://play.google.com/store/apps/details?id=com.BLI.Circulet.offline.pixel', img: 'https://cdna.artstation.com/p/assets/images/images/067/451/788/large/pranto-unnamed-1.jpg?1695392231', h: 260 }
    ],
    photosBase: G,
    photos: [
      "assets/photos/photo-01.jpg",
      "assets/photos/photo-02.jpg",
      "assets/photos/photo-03.jpg",
      "assets/photos/photo-04.jpg",
      "assets/photos/photo-05.jpg",
      "assets/photos/photo-06.jpg",
      "assets/photos/photo-07.jpg",
      "assets/photos/photo-08.jpg",
      "assets/photos/photo-09.jpg",
      "assets/photos/photo-10.jpg",
      "assets/photos/photo-11.jpg",
      "assets/photos/photo-12.jpg",
      "assets/photos/photo-13.jpg",
      "assets/photos/photo-14.jpg",
      "assets/photos/photo-15.jpg",
      "assets/photos/photo-16.jpg",
      "assets/photos/photo-17.jpg",
      "assets/photos/photo-18.jpg",
      "assets/photos/photo-19.jpg"
    ],
    skills: ['Unity', 'Unreal Engine 5', 'Blender', 'C#', 'C++', 'Blueprints', 'HLSL Shaders', 'Three.js', 'Lighting & Post', 'Level Design', 'Environment Art', 'Technical Art', 'XR / AR', 'Python', 'Figma', 'Photoshop', 'JIRA', 'Story Writing', 'Voice Direction', 'Team Leadership']
  };
})();
