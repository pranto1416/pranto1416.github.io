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
      { t: 'Intro to Level Design, Lighting & Post-Processing', href: 'https://docs.google.com/presentation/d/1OCul1JsP74y5VSIM0uZ5vIgR_1w0xXAeS91qF4gOi2U/edit', img: 'https://docs.google.com/presentation/d/1OCul1JsP74y5VSIM0uZ5vIgR_1w0xXAeS91qF4gOi2U/export/png', h: 24 },
      { t: 'Introduction to Game Development', href: 'https://docs.google.com/presentation/d/1ItMXvm6piBxOQA_tpQzvsLO_opWM-PsVbm6ukcEYW1c/edit', img: 'https://docs.google.com/presentation/d/1ItMXvm6piBxOQA_tpQzvsLO_opWM-PsVbm6ukcEYW1c/export/png', h: 190 },
      { t: 'Introduction to Level Design & Lighting', href: 'https://docs.google.com/presentation/d/1YtvccRGTcPYj-WNldZ6eVyqHKl43KImCi6PWVavL4qI/edit?usp=sharing', img: 'https://docs.google.com/presentation/d/1YtvccRGTcPYj-WNldZ6eVyqHKl43KImCi6PWVavL4qI/export/png', h: 40 },
      { t: 'Introduction to Lighting & Post-Processing', href: 'https://docs.google.com/presentation/d/1Hxi_BT0Tqxl57kRG5ZdB5nt57Wsz_kGOk7sxVZkO5gw/edit', img: 'https://docs.google.com/presentation/d/1Hxi_BT0Tqxl57kRG5ZdB5nt57Wsz_kGOk7sxVZkO5gw/export/png', h: 300 }
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
      'AMxu72tfPDo6Mx4rOIOdK70AkRrMIBha2ixpDekyDVf6ZUeBEWI0E4NOV9MvRj9MgfjmOlshX3VYXneXqbxw2jYBSjw3INUGg5LyJAreacuupLq7Tq2Rd3_6Eqp4JBWf_61DxN0Nv74JAYesKoP3I-_CY0OONuU15m4zyZAUUZqAt8uce_rms5QUYv8fM1WJI2l1KIpuXbkvZnvYqyhTrVMhyWP1xS-PA1AIdz6QbHMrL1Q',
      'AMxu72tzaKlOmU-qf_4h8sANm6RxlSonTWDB0EYoVX8G3vmRh2FwLrxFuAn9p-72hL9_yNNj2dvMN3hzd3ocMhvtAmZiOnfEoVvPK0nHyUz7NQNhzdtPEjkhghxG2l50ZUcU5RxO5zLe7jHEhlGZlv5T3iYw9zNldWS9H6TIIMEyjzqdTvvbcqmb-X3SApja_xPKi1vBqWptbMNgyZKDmdXwbqJ4xig2QZXEiI4JnSJ0vXI',
      'AMxu72sG644522URJaz4pEG4r9zVQJlHsCl1h8C6vWidYTda1RHjkiG59GSvVjXepMGq5ykgVSAB387YEkmXoQwwDh6ftwkPOnKc1aWzIHTXtwABQfFzMPyarKDXphmK5ZlVQEmaDjL1VuT5untF7isauK_u42OlQGwhRXsfE_CHUZ9NxTUcmXR59wLbu4AgzHCtn6dYcXQBwy5S1UtZMBs14d5InboCMa3PoWs0PDvYm9M',
      'AMxu72vxqyqCiKjZyN14gIEinnwEkS7GRHfUCGZzvH4x8cF6Q252-YiRsuqdQJpJPPBRCmIUSnzBeNbYP1wxu58PUtmN4UP1n0w1fNjZ_8GUW4VCDLGZco0AFbEXrCRQKZgWYAvN3XCZzZvyZQtdUSRzqfmpWYxLYJQcnB6rxkeEM8LUa-pCqAaiGNsbRZgAqWRaLYU4AOEXcuszgOudtcrmw6MCOHfNet0um43WgNjAKSY',
      'AMxu72tGDyR0QEDbI6zQvGrU9L-HZyHL4OrvXrmN9pv5aPVEx9j5bt27Agx7DNU2JvGcU__0SIHizMWpv_Pdm0AfCVRKqV6uslNqIO4u9SKAROqAvOKK5BptVtSb49O0btfo2TxEg4CyZIqYvQhNAX0YAfMlZSBc16gatvtlvMht6XUtokS3-nptLAWC9drHYn_TNlpwvoNU0kJRdkuzmaiU5mPJ_qXWaS0uUoCJ7XMhH1o',
      'AMxu72vwBDg5mJ1DnwrK_QVAmuuT4_en1FekJRxGzZ4PdG_vxMW7crxEAV1JfRXVv15271jBQWpz7876qaPuxL6I6oYS6imAtt-9KefnW4SQFwI5mLYsJuY23B_cNX6rjLx8ujdLhTK_iQ8xaLTeRKtoeTwtwwfbnJfCuKG8TSYt-MR2qW6tf2zdniIvvZRXEvnMertlFsItudcbHEm70uBrCc4qOOn8xIeCYBOnj-YzKmE',
      'AMxu72sKRKdJlg7iMta5bsURrDE-6CgTv92jGahIf7YJ8--Dgolna2A_AY_jZwkmx19DgK-SBTf7W84fRK6CBmXtI9eBoFYQDz6YjHgf2HaM-BEDqAKMSPgJQ_5rHVdFZerc91YxhtsZEZnnd8-rvx3Isq7DEFbZQ7j4OyWSkfwO9m-8PzzEARBOLxPpz7rF3lJQcKCseNWvo_X_vdfAX-i59vbsfSqMF5L54xelf7NU6rM',
      'AMxu72vmzbLLDoqUMGGNh1LfSJeJITI3e8oo8lJlxRhHndNU6h5sk9enaWCY3jtBOISdG9wgdaBMwLVn8KIsVZobNEuDzzwdVhGz-aFfrAISHeG7JQ5RSBy5JFskYhvDJWmMqh2KujXPbVPTiu96WWBbVd4lhrEQTtKKJigl8L7Pe6lS9aqXhJwEVqgvBO2ld6BgZZja6zI02C_gZSbJZ0s9hyQGKqhmUh7XERBjFo9J',
      'AMxu72sufnsLmooW69tZ82c77xitZO_PYhu6MU6xrJnw3HghzFxwHw0zZt7LLIQZGj93eL7XN84rj7BwFZMWsvjSsRL95dbocm4EMWpkErSbU36prreG7itfjsNwBC1jcHfW9MRGR-SqeQ5JBBMsRHuhk0vunbeQQWKJoupWlbuk75oDh9Zy2iQQrAtroQQhnGeNE1Jrx8axpRLBaj1-I1GBGm5eLkxriU7CaBihLA',
      'AMxu72uqeh-UiV2zz0_aiuEvd8l7TVtRni0mzXVpi0S0KEQQGJ_bJsMROpHWck9d09R27cxNx8zG-rVjFiNh3YGzDXXLNcvlbbWgikuXi1gMlzkcDroL84dH0ZVg80q0BL9-FzAYX05GdOcmHVjeZLc2TNa36PvaEgcHh07ZOhpudk3h_rS6t0B7d1Vv0PPkycVTD4Fbr8f_-bpe41yf2n70tjpy6BBa_iNd6KNuukP01QE',
      'AMxu72vTn_y8_S9X1UUTKVU28JBHpnv6Ty_8l_rPVHTO4Q_GmOzM781yvdsrrI-GShtxFVMmUy9GHnkDs4YE_1-aUaSyzTqS_w3FGpX6eT87fKiXjc8pyRbP61qPgZuOHbveeom1we64tOGEOrOyTVovw6tPhaCujrO18VhsjFAnDqwc26vWYpbS5XG6jb_nCWAlg4r0_sHLxqCV4-7S-ug8F5vLryOqcbJiWoisUDuryQQ',
      'AMxu72tRdozIazDlBHneamWu45g5lHlR_1QJL58pB2YIIAunnb3xW6qzk6X8ghWjZ9PzRnlWbIH71mIj0GDgxxquNxznf0WYXEBIKRoJHwTeII_OUJFAqOiLdfVJtYpe51ITx3Hx3yfZf_lYfVJQ1CeTyiYbTBevzJuqPybGL4g-rd00b6dHrziOThNiXttVaVyyk_Vg4dvLBp1GbFcjaYngshZEjqdH7K_AlH6B_JJoIMw',
      'AMxu72vpbz2HQL7QonoVkHCp4j6leJ-6rj5loeHatvp9Q4gdpwE2sqyAeys_-Ao8cm2_DTDR2gNMOOHLOIwYgyYLV9phHzo_UcKg6mAuPszFqFweTxi1jrsmeOq_iOjM9wNhjvnrGtvBa1AE8uPnuihX1KxXNi9VVi91c22I5Y-nHUI_4VQ9nKij7dklaLWZ3H3huJxiuDeUzhR8LejfW_ps9ORvHgeYbj13PtuEH5LZizo',
      'AMxu72tddF8O9YTm9ECFajxCezrIIx1KMP69Y1k4q58hDnnhc6n3fv3aBYkeUBZJjIV2lGdM6bafBQaicWqsnOOLbT5eCP2mGr0r0zAacGkUGImlMAFtDLN3C5M1lWNLoEurp43CvQmD2JgjDaERz2WwXuZt1DV1prebVOt5gWmHPaVaTs_oiYlVbyNLPf-XalIJvKUF9AXxXQGWb3lA36LlhjEvdcdjM8JGxUFUmuCk',
      'AMxu72svwEciluDT_Vu_zXeawOPDMj5PcZYdVZQ3d0as_FgY_tqlt-27DpPTjktjUUa4atlzdlG5dSjlNEKR7aGPn6LvoJCoNVEur634yfBL_Pes88-HuZSMy6-8P9uQwM8d9B5EJLneF9vx4QPQIdkHc6rIXFmK6KYE2LO1lV1nsz81t9nmjElQS4yre5zsZQRKbwUwc7-LOahtU4tRjvflKb5W4BbdIEM1DNcCe5Zc01s',
      'AMxu72skWZdZlttnDpn8CvNkWXngF9ptKJeMADFjxRXAAh6mafwEblsD58V3Ibz31k0kje_UlXuq52v6-sARUUe56i2Btp-lvMc7-vWxO35BA2dxburZeKjAiJ_jM2hJEaUUlI8T74fj-s2gCrcIY_5ymoCAHW5dVSBFQTuiO4_J46aZlX2GPE6OMl3A4TGBt1JaqZkrAYjHymaUasZLqIbJYL2Md6lP6Erlyu0DwxPXJ2A',
      'AMxu72soFr043YA-337jqAeGyvOCfrrZjJjtEyJV792wpKpX9Q8qcWY7G0kXt-g2aOHRsEePw4e9phLTpAQiY0RRNCAUxLu9ez8m1It44T9x0qJaBCodUh3gBk14dLoIcoH7k7oNOL5WGetsh6O4Ta3LqjsBBO8yzAa3LVEbVGZSbk5Nfox06GzZtpE8El4HBpPkfwk5UAfwe47UvTo-muj5_rcLlKp8JxnE-hpVlyqtzUM',
      'AMxu72ts5qcRENOwvf1MRHExQfdyynnMESAmT8hzrgLz7UpqiI2uhEtIjaMsWUxeNrvx8qyB4-hK0KyzxTYm6pqonLt26OgqD6tZ5sizIMxxYRbRJ1v0-ztw0zVzG6cwUs6ez-kUbaR6a4aSX9F19Y9ZWNXo1BoyZ1YPbF633_em4q4seNjvs-6FDfmzJPVQS3Er-IOefYzTawyLasw6K_oXuG8bEcUqjo3jWRQrWZwZ',
      'AMxu72vgr3X1XSiL9OABATm3C1Qg-k3TOeAAjwEQ4lwwngM5iE3DIMmBx5utFnO1i9FHV-7UWqtht19HnODnh4QswoywCC4M55P-EfQxrcEzhjgkq3l7ofEm_yMgrngWuKWBjzZXEqi0GAEj7rkH9AyejexkmeOsC3WzBlTUtvxSXu64d2ufY4wHQDPlSBnFsmQlw6x8lemTT-Pz_q8qnBQpu1JoeLjleU-W-ICt_l5D',
      'AMxu72vhVNwgyWUKt2KGf05N6oYxJ5buuNdu-aTISd8qEZ_m6VQZL7XHOo_otxjwCsc75idV2N3a0uh-Xx7aEu2BlY1FIdDAALuNUCEtu0pWwnjehQlfmaRJqpShMf-0xyiWfANV2qJo8wQvZ-QxsCb9qxAL1KPH9pgnGjxsA5tC-obWt88BP9WWBC8oySkHGIV1IovUAUgvAZdUHwcKntydmv0-_cMqHgvX_Iet-oqab48',
      'AMxu72vpzWWqscr8B1r6xLkd2aLsTYs6IP5XaCWu_fHx2NVNjoAgDIFm4HGYHS_MFC3YuKdNOmI0Mc7sazRTdptO4-krBjxWj_kzXbDoaXH5URoiHbsumXLrj-hwYEJ8D0r5dHh9lqHr35zyFytIEXrBcFse3RjsaptwOp394fqRgLQ_MQd3JB-eHuEZmGxekpMV1sIxgOaQTQcnXXfJDwijGEh7CluL6D8mf2d5lTIQas4',
      'AMxu72uxZniR-cY3rpLzmikTQtO1WH6S6CWWRGnotIxlulBFSxcgiCL1I7VN6Vr7jFuM9YgUChwsl98PvDaqQ8W8Xte0ymlXGuFpJ-eaX0ZClaa6XBiCkO6h5B50Z02ZIb1hK58T_Qs96uycVjoiKwg7BGos2ye_GzEu9IsA0Hv1EL8dFyVvPdmXr-VlGjDGwy0xXlj4ft9VpEP32UkcaSAK9NUyS5VLJirRqA-1opzZ6FI',
      'AMxu72vHKEIg3E1P3mqFvCsKSQVqc2nFw3qUjX_5Te1l-Y0i4KlaW_iHfvSzG_2LY5PejYOACiQa4M5-0J0KqAkEWu4mhPc3G-PncpRzzb812Y2eUxmYvtb0qzWtHPdGku9SPl3PqlQkgjFgoqJVLQmYokYloy_pZbDOZGM3OFOH6RU5vxicDDTeLTTy1TbEBRHkYfk6pg7EGjXS5DHt9hFBDWq-mdTau_HWSIqug74s',
      'AMxu72th8xlkSuH2BpUlJVT6KbEqcVudbMXSQy5kLiJ0YagQp1VBegsJ4Iwlphh_E0bYsXl401JL3-Lgnup8iXhRPyBshv58PIWI6WqwQMkiEWmbi1O4JMaN-5RiVSXJav0cQ2J4GKq8FpNbdzLBXYoX7oNW9gu2w1xScqp0_7SY-39RbKAEceU-1_TzM8Q7vkuMAu1d-xfvm1ZoXKZ_Rxtugzmxfx1ljNk3PkC7lEOJwgE',
      'AMxu72u2wMpwQ_9j2L8ujP1YVNmVHoA5dktHHxx63m7iG2IoD41XiHN59l9VuKmmtOr4X70NcG0MJB51z4dfpVtQKZBCe8owIWJpPV02z4rb5a99lsPoi6gCV3V9ajyyQsp3EfiV-lfN99VvBRqs-2b7SPIBarfUY9dCtCXTXa4i5A9nXeeod3y1_yA0FaxOXpq08g-MEneCqypfANJD-9rjgyQLD8DB0dHppeCvjyi21RA',
      'AMxu72sdhcHrqqcIwAYh8p_9K3dha_bfy-PeUknstlLTOhxbTgdJJBblAj3Z0cVDBrvdmbKap5XJbSP251-sl75tqEvpwu1d2T4mzzbOowSdCTnHcLzKNXgHCxR73ApjY8tZSzib5qeLvhucAPZYVVYh-Lb82U4bkNYuHKslDU3El9-71uZZ7G-wPGUcbWtHgCqmt1Tb6wl_S6kNrSQgtXjRpaI-lWQD2F90yX1kiY_A',
      'AMxu72vLD-RuQyPerwWuUiz7sjpfz1V3ZAjAXQIvmRBkszfGhg66abMWSAv-xwZfOpIez_KTGgi0-3jroikuf2Lvdzj1zAaNjatpuKOnmU6de9jPE419dG5yM8zSM0j8G8-41Cu6oMTSRkz-PDS2u5vTqIM9ZxfIkJyEods0yc5DlAbehqmsjzrgwj8wXK2eHA88WslxuC3nJshJ1sl0Rgs1ZEMrQh_qnwxn1j57wscaCZA',
      'AMxu72sBVdORLzwE7FZBQzd49_Hr1Q-0qbMkdc9IL9r7RdJZJigOtza_M1FDVH6caI3nyEV8NZZpfIdQq0xD9Oiiy8os6ow3Fgf4lCEIu4X_FeCWVyQbSedh5UT26OpQdYe2xwMwN8PBEEJ503AzlKYhWCbsd9-LJediDQiRiV2XCFj0oNxq-gFmFLL1jenJMgaF-nXjg5M7dCXcHwBegMThOsmNaNnjhvbf1B3yMt4zvIQ',
      'AMxu72tAfV_t1BRi2Aje9z3j-4jvJhOiDm1ZOWfr_-5OteWjkMSJbXpltsIYR-67PS8IBbuJRX5WiGlJayFo2W7E3iMtINQaRxTutUe3odBiAAzCOlikZF2aWEELyndfifOjoxRfki4t4zZEC-9r8T2FJpLOykKhoCekJ6SR3hAOnhGca9dM7Gg0bWN1WTEJnSn14mLXKsqOWF1Gm7A1XHgP318tvnWSxzyCAMl4kK4RwdE',
      'AMxu72vD2Wy_Bl27-4MLt_2Yak95W4SF8Ub1TRGQGYL_ko92w34GhIsU0iaTLu84RjKfeQwPpCbic0V0XlZzUubBvBS0wITYLmW424qrPHp0-M23_6zLLZh1qGTy3UacWr9CQjlkcST9brpnPc9DQ3GihJrslsJpbGkWStwsrmrXtz8x9ad0laBqE0MFHaGNn7TNnJbF5oneoePEClTLfDvQNsKKHRucj9nPOm38kn1K',
      'AMxu72uwzKfp4K0MwngnY3G7dHd1AcVWMYLoOKc9PNxVd2Nbo3wL5jB9SC8Ju2B0Vmz8nGNEjqjFz-KTgR3KsNVKkTzCrrGHZCNarHBtTee_VfxtXyZ8IJMz5PKsf8NwYYmBQBz1W6JGxuCxPJ8tPDQlXnSzmRRGoBjHDsE9ANbTBjNY0CMUDQr3Xa2W02CIS19odgRS5EeFNOHUyHrfeJiVY7BQNi9FcifcC2deb_Kw9uw',
      'AMxu72vzUstSqKlOsm1YUGpmJbMZGqa1fmJsfr0J1a1cdE7TGBast1VBxCuP2Ul9fk4XzVia-PXJ6udR1A-vzp1IXKCLmTLBpRNPR1V-zhVtdsqIOWqDDjBVSLIgYsr_kRk2n6uWgqyu26ZuLfQxr49TYllYWJUxMPs8hU3aQ3g4wNvPA99YUEBnCwDC3j6lTdapiMu6Ih7Zuq4VaZq8jYdfVENEVosc7XMAVjNbFn54',
      'AMxu72umPtOg1MPM8-qLxgJ-cB8jH3s0DH64utkaQbVHWrN4XzEiseqqz1gd96lVUxHv5flYz_IUldZinWYIx-Uv9OEiaIxziyAa4KAKO64Xi6kEnQ0bCuRalVJoX3GdEgpG3oizOL6Bz9KlWBSS22Fyv38h1MSrRutcnOIEz0d-UOo0MX-fHfoIpYP5WAWXIRbLOY4jSBcRUSopPxtl08khy7ipdaXT_TIzDVV2q-rQmW4',
      'AMxu72sQaFep1rvRO73Kjoq1vP7t0gV210PB0-tLp9Q5dl0MUBscPjplO5TOaE6MAwmD5t8XWwXI3pek0oID0K5EptASvRdP7xz6VBz_KtdZ5vrw0eU-IK2jDlGFXXpJUGjjgbuRnw8PKqA7HYDFdHsGbTiK2TcCi3beeAKIokDJspOo1w1UgIYRNm_joRyx7JBKq91QfI66f9ZGm_HqHN4ubAs3XiRR3lDKaDti4UTY5R0',
      'AMxu72snv1NgipO4QHvvFD5Bxiffd8EgZ3LpblNkFvrhwVNDFX_r0OiSIorqxbQ04WYj8lV2H6uTL8paAFRg0jB6UP9dHwC2j-CFZ6Fu6_JImW-3mt_TVuCHCJmsPWz7Vbi89vFKPAx1eWqpil66-C1OOI5oERFU0AMlh8fWEXppylZzHoFGCdg7u2_RFUWWXfRsVX6Nukn8_GoWJOqp8voJ-GMx8O5yttGZu1umR5dM'
    ],
    skills: ['Unity', 'Unreal Engine 5', 'Blender', 'C#', 'C++', 'Blueprints', 'HLSL Shaders', 'Three.js', 'Lighting & Post', 'Level Design', 'Environment Art', 'Technical Art', 'XR / AR', 'Python', 'Figma', 'Photoshop', 'JIRA', 'Story Writing', 'Voice Direction', 'Team Leadership']
  };
})();
