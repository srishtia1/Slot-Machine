//Dummy JSON responses
let data = [

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 3, 1, 4]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [5, 4, 1, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 2,
                "symbolIDs": [1, 1, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [2, 2, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [5, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 3,
                "symbolIDs": [2, 2, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 5, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 9,
                "symbolIDs": [3, 3, 3, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [4, 4, 4, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 1,
                "symbolIDs": [0, 0, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [1, 1, 1, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [2, 2, 2, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 3, 0, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [3, 3, 3, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [2, 2, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 1, 5, 4]
            }
        }
    },

]
let totalCoins = 20

let scale = 1
let screenWidth = 1920 * scale
let screenHeight = 1080 * scale
let config = { width: screenWidth, height: screenHeight, antialias: true, sortableChildren: true }
let spineLoaderOptions = { metadata: { spineSkeletonScale: scale } };
let app

window.onload = function () {
    app = new PIXI.Application(config);
    document.body.appendChild(app.view);

    app.loader
        .add('symbol_00', 'assets/symbols/symbol_00.json', spineLoaderOptions)
        .add('symbol_01', 'assets/symbols/symbol_01.json', spineLoaderOptions)
        .add('symbol_02', 'assets/symbols/symbol_02.json', spineLoaderOptions)
        .add('symbol_03', 'assets/symbols/symbol_03.json', spineLoaderOptions)
        .add('symbol_04', 'assets/symbols/symbol_04.json', spineLoaderOptions)
        .add('symbol_05', 'assets/symbols/symbol_05.json', spineLoaderOptions)
    app.loader.load(doneLoading.bind(app))
}

function doneLoading(loader, resources) {
    let symTextures = [
        resources.symbol_00.spineData,
        resources.symbol_01.spineData,
        resources.symbol_02.spineData,
        resources.symbol_03.spineData,
        resources.symbol_04.spineData,
        resources.symbol_05.spineData,
    ]

    let startPoint = {
        x: screenWidth / 2 - resources.symbol_00.spineData.width * scale * 1.5 * 1.5,
        y: 50,
        w: resources.symbol_00.spineData.width * scale,
        h: resources.symbol_00.spineData.height * scale
    }
    let symbols = []
    for (let i = 0; i < 4; i++) {
        symbols[i] = []
        for (let j = 0; j < 5; j++) {
            symbols[i][j] = {
                spineData: symTextures[Math.floor(Math.random() * symTextures.length)],
                x: startPoint.x + startPoint.w * i * 1.5,
                y: startPoint.y + startPoint.h * j * 1.5
            }
        }
    }

    for (let x = 0; x < symbols.length; x++) {
        speed = 8 + x * 2;
        for (let y = 0; y < symbols[x].length; y++) {
            symbols[x][y].anim = createAnim(symbols[x][y].spineData, 'static', symbols[x][y].x, symbols[x][y].y)
            symbols[x][y].tween = gsap.to(symbols[x][y].anim, {
                repeat: -1,
                onUpdateParams: [symbols[x][y], speed],
                onUpdate: function (sym, speed) {
                    sym.anim.y += speed
                    if (speed > 0) {
                        sym.tween.vars.onUpdateParams[1] -= .1


                        if (sym.tween.vars.onUpdateParams[1] <= 1) {
                            let dist = 999999
                            let nearest = null
                            for (let x = 0; x < symbols.length; x++) {
                                for (let y = 0; y < symbols[x].length; y++) {
                                    let newdist = Math.sqrt(Math.pow(symbols[x][y].x - sym.anim.x, 2) + Math.pow(symbols[x][y].y - sym.anim.y, 2) * 1.0)
                                    // console.log(newdist, dist?)
                                    if (newdist < dist) {
                                        dist = newdist
                                        nearest = symbols[x][y]
                                    }
                                }
                            }
                            if (nearest != null) {
                                if (nearest.y == symbols[0][2].y) {
                                    setTimeout(function () {
                                        sym.anim.state.setAnimation(0, 'win', true)
                                    }, 500);
                                }
                                gsap.to(symbols[x][y].anim, {
                                    y: nearest.y
                                })
                            }
                            sym.tween.vars.onUpdateParams[1] = 8 + x * 2
                            sym.tween.pause()

                            found = false
                            for (let x = 0; x < symbols.length; x++) {
                                for (let y = 0; y < symbols[x].length; y++) {
                                    if (symbols[x][y].tween.isActive())
                                        found = true
                                }
                            }
                            if (!found) {
                                setTimeout(function () {
                                    spinBTN.interactive = true;
                                }, 1000);
                            }
                            return
                        }
                    }
                    if (sym.anim.y > screenHeight + startPoint.h / 2) {
                        app.stage.removeChild(sym.anim)
                        sym.anim = createAnim(symTextures[Math.floor(Math.random() * symTextures.length)], 'static', sym.anim.x, -startPoint.h / 2)
                    }
                }
            });
            symbols[x][y].tween.pause()
        }
    }

    const spinBTN = new PIXI.Graphics();
    spinBTN.beginFill(0x777777, 1);
    let w = screenWidth * .2
    let h = screenHeight * .15
    spinBTN.drawRoundedRect(screenWidth * .875 - w / 2, screenHeight - h, w, h, 40);
    spinBTN.interactive = true;
    spinBTN.buttonMode = true;
    spinBTN.zIndex = 20;
    spinBTN.zOrder = 20;
    spinBTN.addListener('pointerdown', () => {
        if (totalCoins <= 0)
            return
        totalCoins--;
        coins.text = "Coins: " + totalCoins
        spinBTN.interactive = false;
        for (let x = 0; x < symbols.length; x++) {
            for (let y = 0; y < symbols[x].length; y++) {
                symbols[x][y].anim.state.setAnimation(0, 'static', true)
                symbols[x][y].tween.play()
            }
        }
    });
    app.stage.addChild(spinBTN);

    // Add play text
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 80 * scale,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });
    const playText = new PIXI.Text('SPIN', style);
    playText.x = screenWidth * .875 - w / 2 + Math.round((spinBTN.width - playText.width) / 2);
    playText.y = screenHeight - h + Math.round((spinBTN.height - playText.height) / 2) + 3 * scale;
    spinBTN.addChild(playText);


    const coins = new PIXI.Text("Coins: " + totalCoins, style);
    coins.x = screenWidth * .875 - w / 2 + Math.round((spinBTN.width - coins.width) / 2);
    coins.y = 25 * scale;
    app.stage.addChild(coins);

    const stake = new PIXI.Text("Cost: 1", style);
    stake.x = screenWidth * .875 - w / 2 + Math.round((spinBTN.width - stake.width) / 2);
    stake.y = screenHeight - h - 150 * scale + Math.round((spinBTN.height - stake.height) / 2) + 3 * scale;
    app.stage.addChild(stake);
    // setTimeout(function () {
    //     sym0.state.setAnimation(0, 'static', true)
    //     sym1.state.setAnimation(0, 'static', true)
    //     sym2.state.setAnimation(0, 'static', true)
    //     sym3.state.setAnimation(0, 'static', true)
    //     sym4.state.setAnimation(0, 'static', true)
    //     sym5.state.setAnimation(0, 'static', true)
    // }, 5000);
}

function createAnim(spineData, anim, x, y) {
    const character = new PIXI.spine.Spine(spineData)
    character.state.setAnimation(0, anim, true)
    character.position.set(x, y)
    character
    app.stage.addChild(character)
    return character
}