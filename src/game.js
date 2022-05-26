// import kaboom lib
import kaboom from "kaboom";
import { PlayerCharacter } from "./player";

// initialize kaboom context
kaboom({
    global: true,
    fullscreen: false,
    scale: 2,
    debug: true,
    clearColor: [0,0,0,1]
  })

  const MOVESPEED = 50;
  const LEFT = 'left';
  const RIGHT = 'right';
  const UP = 'up';
  const DOWN = 'down';

  let p = new PlayerCharacter("Wanderlei", 10);  

  loadRoot('https://i.imgur.com/')
  loadSprite('player', 'AwttDME.png', {
    sliceX: 12,
    sliceY: 1.01,
    anims: p.getAnimationValues()
  })
  loadSprite('pallet-town', 'ZrAp7Ba.png')
  loadSprite('stone', 'WLd5AsC.png')
  loadSprite('board', 'HTmlvVI.png')
  loadSprite('house', 'gGG6DUb.png')
  loadSprite('grass', '6CIcxeJ.png')
  loadSprite('oak-lab', 'tcDDqf8.png')
  loadSprite('bg1', '5EO302L.png')
  loadSprite('fence', 'Y1Eyc48.png')
  loadSprite('water-edge-top', 'sO1xK3s.png')
  loadSprite('water-edge-left', 'hm8bNMh.png')
  loadSprite('water-edge-right', '7WAxZOr.png')

  const playerCfg = [
      sprite('player', {
        animeSpeed: 0.1,
        frame: 1,        
      }),
      area({width:15, height:8}),
      solid(),
      origin("bot"),
      layer("chars"),
      pos(140,100)];

  //Configure Scene
  scene("game",() => {
    layers(['bg1', 'obj', 'chars', 'grass', 'ui'], 'obj')

    const player = add(playerCfg);
    
    onKeyDown(LEFT, () => {
        player.move(-MOVESPEED, 0);
    })

    onKeyDown(RIGHT, () => {
        player.move(MOVESPEED, 0);
    })

    onKeyDown(UP, () => {
        player.move(0, -MOVESPEED)        
    })
    
    onKeyDown(DOWN, () => {
        player.move(0, MOVESPEED)        
    })

    onKeyPress(DOWN, () => {
        player.play('moveDown')        
    })

    onKeyPress(LEFT, () => {      
        player.play('moveLeft')
    })

    onKeyPress(RIGHT, () => {        
        player.play('moveRight')        
    })

    onKeyPress(UP, () => {
        player.play('moveUp')
    })

    onKeyRelease(LEFT, () => {
        player.play('idleLeft');
    })

    onKeyRelease(DOWN, () => {
        player.play('idleDown');
    })

    onKeyRelease(UP, () => {
        player.play('idleUp');
    })

    onKeyRelease(RIGHT, () => {
        player.play('idleRight');
    })

    //add([sprite('pallet-town'), layer('bg')])
    add([sprite('bg1'), layer('bg1')])

    // s: stone
    // d: door
    // b: board
    // g: grass
    // w: water
    // m: margin (water edge)
    const map = [
        '  s       sggs     s ',
        'sssssssssssggssssssss',
        's                   s',
        's   h        h      s',
        's                   s',
        's  b        b       s',
        's                   s',
        's                   s',
        's         occccc    s',
        's   fffb  cccccc    s',
        's         cccccc    s',
        's         ccdccc    s',
        's                   s',
        's         fffbff    s',
        's   tttt            s',
        's   lwwr            s',
        's   lwwr            s',
        'sssslwwrsssssssssssss',
    ]

    const levelCfg = {
        width: 16,
        height: 16,
        s: () => [solid(), area({width:16, height:16}), sprite('stone')],
        b: () => [solid(), area({width:16, height:16}), sprite('board')],
        h: () => [solid(), area({width:64, height:48}), sprite('house')],
        g: () => [area({width:16, height:17}), sprite('grass'), layer('grass')],
        o: () => [solid(), area({width:96, height:64}), sprite('oak-lab')],
        f: () => [solid(), area({width:16, height:16}), sprite('fence')],
        t: () => [solid(), area({width:16, height:16}), sprite('water-edge-top')],
        l: () => [solid(), area({width:16, height:16}), sprite('water-edge-left')],
        r: () => [solid(), area({width:16, height:16}), sprite('water-edge-right')],
        // d: () => [solid(), area()],
        // d: () => [solid(), area()],
        // g: () => [solid(), area()],
    }

    const gameLevel = addLevel(map, levelCfg)

    onUpdate(() => {
        camPos(player.pos)
    })

  })

  //Launch Scene
  go("game");