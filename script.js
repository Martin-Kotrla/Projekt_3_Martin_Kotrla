class Song {

    imgElement

    constructor(name, game, year, sound, image, lyrics, songController) {
        this.name = name
        this.game = game
        this.year = year
        this.sound = new Audio(sound)
        this.image = image
        this.lyrics = lyrics
        this.songController = songController
    }

    getImgElement() {
        return this.imgElement
    }

    render() {
        this.songController.registerSong(this)

        const h3 = document.createElement("h3")
        h3.innerText = this.name

        const p = document.createElement("p")
        p.innerText = `game: ${this.game}`

        const p2 = document.createElement("p")
        p2.innerText = `year: ${this.year}`

        const img = document.createElement("img")
        img.src = this.image
        img.id = this.name

        const song = this
        const songController = this.songController

        img.onclick = () => songController.changeState(song)

        this.imgElement = img

        const lyricsHidden = document.createElement("p")
        lyricsHidden.innerText = "show lyrics"
        lyricsHidden.classList.add("lyrics-hidden")

        const lyricsShown = document.createElement("p")
        lyricsShown.innerText = this.lyrics
        lyricsShown.classList.add("lyrics-shown")
        lyricsShown.classList.add("hide")

        let hidden = true
        lyricsHidden.addEventListener("click", () => {
            if (hidden) {
                lyricsHidden.innerText = "hide lyrics"
                lyricsShown.classList.toggle("lyrics-shown-show")
                lyricsShown.classList.toggle("hide")
            } else {
                lyricsHidden.innerText = "show lyrics"
                lyricsShown.classList.toggle("lyrics-shown-show")
                lyricsShown.classList.toggle("hide")
            }
            hidden = !hidden
        })

        const songDiv = document.createElement("div")
        songDiv.classList.add("songDiv")
        songDiv.append(h3, p, p2, img, lyricsHidden, lyricsShown)

        const playlist = document.getElementById("playlist")
        playlist.appendChild(songDiv)
    }
}

class SongController {
    songObjects = []

    registerSong(song) {
        this.songObjects.push({ song, isPlaying: false })  // { song } = { song: song } udělá property podle nazvu proměnné 
    }

    changeState(changeStateSong) {
        const currentSongObject = this.songObjects.find((songObject) => songObject.song === changeStateSong)
        this.songObjects.forEach(
            (songObject) => songObject.song !== currentSongObject.song && this.processOtherSong(songObject)
        )

        if (currentSongObject.isPlaying === false) {
            currentSongObject.song.sound.play()
            currentSongObject.song.getImgElement().classList.add("playing")
            currentSongObject.isPlaying = true
        } else {
            this.processPause(currentSongObject)
        }
    }

    processOtherSong(songObject) {
        if (songObject.isPlaying) {
            this.processPause(songObject)
        }
    }

    processPause(songObject) {
        songObject.isPlaying = false
        songObject.song.sound.pause()
        songObject.song.getImgElement().classList.remove("playing")
    }

}

class Password {

    passwordsComparation() {
        const resultText = document.querySelector(".result-text")
        const passwordInput = document.getElementById("passwordInput")
        const confirmPasswordInput = document.getElementById("confirmPasswordInput")

        if (passwordInput.value === confirmPasswordInput.value) {
            resultText.textContent = " passwords are the same "
            resultText.classList.add("valid")
            resultText.classList.remove("invalid")
        } else {
            resultText.textContent = " passwords are not the same "
            resultText.classList.add("invalid")
            resultText.classList.remove("valid")
        }

        if (passwordInput.value === "" && confirmPasswordInput.value === "") {
            resultText.textContent = ""
        }
    }
}

class MobileNavBar {
    constructor(fullClassName, toggle1, toggle2) {
        this.fullClassName = fullClassName
        this.toggle1 = toggle1
        this.toggle2 = toggle2
    }

    menuIconToggle() {
        const menuIcon = document.getElementById("menuIcon")
        const nav = document.querySelector("nav")

        if (menuIcon.classList.value === this.fullClassName) {
            menuIcon.classList.toggle(this.toggle1)
            menuIcon.classList.toggle(this.toggle2)
            menuIcon.title = " close menu "

            nav.classList.add("nav-display")
            nav.classList.remove("nav-disappear")
        } else {
            menuIcon.classList.toggle(this.toggle1)
            menuIcon.classList.toggle(this.toggle2)
            menuIcon.title = " open menu "

            nav.classList.add("nav-disappear")
            nav.classList.remove("nav-display")
        }
    }
}

class ThemeController {
    constructor(fullClassName, toggle1, toggle2) {
        this.fullClassName = fullClassName
        this.toggle1 = toggle1
        this.toggle2 = toggle2
    }

    switchTheme() {
        const body = document.querySelector("body")
        const modeIcon = document.getElementById("modeIcon")

        if (modeIcon.classList.value === this.fullClassName) {
            modeIcon.classList.toggle(this.toggle1)
            modeIcon.classList.toggle(this.toggle2)
            modeIcon.title = "light mode"
            body.classList.add("dark")

        } else {
            modeIcon.classList.toggle(this.toggle1)
            modeIcon.classList.toggle(this.toggle2)
            modeIcon.title = "dark mode"
            body.classList.remove("dark")
        }
    }
}

class Form {

    registerLoginProperties() {
        const form = document.getElementById("form")
        const register = document.getElementById("register")
        const pFormHere = document.getElementById("pFormHere")
        const formHere = document.getElementById("formHere")

        if (formHere.textContent === "Login Here") {
            form.classList.toggle("form-login")
            pFormHere.innerHTML = "Don't have an Account? "
            formHere.textContent = "Register Here"
            pFormHere.append(formHere)
            register.textContent = "Login to create playlist"
        } else {
            form.classList.toggle("form-login")
            pFormHere.innerHTML = "Have an Account? "
            formHere.textContent = "Login Here"
            pFormHere.append(formHere)
            register.textContent = "Register to create playlist"
        }
    }
}

class Application {

    static main() {
        const app = new Application()
        app.renderSongs()
        app.setScrollButton()
        app.passwordsMatchingCheck()
        app.setMenuButton()
        app.setDarkLightButton()
        app.registerLoginSwitch()
    }

    renderSongs() {
        const songController = new SongController()
        const songs = [
            new Song("Ode to Fury", "God of War", 2018, "./mp3/ODE TO FURY by Miracle Of Sound.mp3", "./img/GOD OF WAR.jpg", "Bellows of pain\nAnd scraping of chains\nThe echoes they taunt and deceive me\nOceans of blame\nAnd rivers of shame\nThe fury it never leaves me\n\nGrief in the snow\nThe winter of woe\nHas come here to judge and bereave me\nLock up the rage\nIt rattles the cage\nThe fury it never leaves me\n\nAlways within\nTo lurk in the skin\nThe wounds ever aching so deeply\nTry as I may\nTo hide it away\nThe fury it never leaves me\n\nLong I've suffered the hunger\nLong I've silenced the cry\nLong I've fled from the thunder\nTo ascend\nStill I try\nTo carry the pain\nTo keep it contained till the end\n\nPour out the anger and hide it away\nLest it spill to the blameless and lead them to pain\nIn the steel and the rags I will cover the shame\nSo the innocent need not be judged in my name\n\nLong I've suffered the hunger\nLong I've silenced the cry\nLong I've fled from the thunder\nTo ascend\nStill I try\nTo carry the pain\nTo keep it contained till the end\n\nBellows of pain\nAnd scraping of chains\nThe echoes they taunt and deceive me\nOceans of blame\nAnd rivers of shame\nThe fury it never leaves me", songController ),
            new Song("When Honor Dies", "Ghost of Tsushima", 2021, "./mp3/When Honor Dies by Miracle Of Sound (Ghost Of Tsushima).mp3", "./img/When Honor Dies.jpg", "Proud and ancient land\nNoble souls, a final stand\nBlood on fallen leaves\n\nLeft alone and lost\nDarkest lines that I must cross\nLords unite with thieves\n\nFear in the blade\nThe spirits of the fallen fade\nSoil and degrade\nMy legacy and name\nBending the code\nDefile the duty long bestowed\nBurdened by the shame\n\nWhen honor dies\nThere will be no pride in victory\nWhen honor dies\nI will be denied my history\nI give my everything\nReturn the reckoning\nGlare of the ghost fills my eyes\nWhen honor dies\n\nBalance for the mind\nBlossoms paint the paths and shrines\nNature's poetry\n\nStrike from the shade\nTradition of the kin betrayed\nSoil and degrade\nMy lineage and claim\nExile and pain\nA poison in the dying vein\nBurdened by the shame\n\nWhen honor dies\nThere will be no pride in victory\nWhen honor dies\nI will be denied my history\nI give my everything\nReturn the reckoning\nGlare of the ghost fills my eyes\nWhen honor dies\n\nGhost of the fallen\nThe wind is ever guiding\nVengeance is calling\nA specter in the night\nGhost of the fallen\nGolden wings are gliding\nFeeding the soil\nSo the world can return to life\n\nMy soul still cries\n\nWhen honor dies\nThere will be no pride in victory\nWhen honor dies\nI will be denied my history\nI give my everything\nReturn the reckoning\nGlare of the ghost fills my eyes\nWhen honor dies", songController ),
            new Song("Show Your Style", "Devil May Cry 5", 2019, "./mp3/Miracle Of Sound - Show Your Style.mp3", "./img/devil may cry 5.jpg", "Rev it up!\n\nA wild child with a lot to prove\nI'm a sheddin' off the shame and the dead dead weight\nA live wire with a broken fuse\nWe will never be the same but we're bound by fate\n\nOverturned and overrun\nFrom the depths to paradise\nHope and roses on the guns\nTake me down to the afterlives\n\nThree times the power and three times the pain\nThree times the confidence\nTear down the towers and fire up the flames\nWe strive for providence\n\nDon't stop, build it up\nWe are the energy\nDon't stop, show your style\nDon't stop, build it up\nIt's electricity\nDon't stop, keep it wild\n\nA split soul with a bitter wound\nI'm a feather, I'm a fang, I'm a dark dark dream\nBecome whole or become consumed\nWith a shadow in my hands and a primal scream\n\nTo erase the rational\nDraw the words out of the page\nTo embrace the animal\nLet the beast out of the cage\n\nThree times the power and three times the pain\nThree times the confidence\nTear down the towers and fire up the flames\nWe strive for providence\n\nDon't stop, build it up\nWe are the energy\nDon't stop, show your style\nDon't stop, build it up\nIt's electricity\nDon't stop, keep it wild\n\nRev it up!\n\nA firework in a glowing sky\nThrough the hell and havoc stride\nA cool smirk and a smoking style\nRev my engines up and ride\n\nDemon heart inside of me\nGot the style to make the grade\nCarve my name in ivory\nDevil tears upon the blades\n\nThree times the power and three times the pain\nThree times the confidence\nTear down the towers and fire up the flames\nWe strive for providence\n\nDon't stop, build it up\nWe are the energy\nDon't stop, show your style\nDon't stop, build it up\nIt's electricity\nDon't stop, keep it wild\n\nThree times the power and three times the pain\nDon't stop, show your style\nTear down the towers and fire up the flames\nDon't stop, keep it wild", songController )
        ]

        songs.forEach((s) => {
            s.render()
        })
    }

    setScrollButton() {
        const goToTopIcon = document.getElementById("goToTopIcon")

        goToTopIcon.onclick = () => {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }

        window.onscroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                goToTopIcon.classList.add("scrolled-enough")
                goToTopIcon.classList.remove("not-scrolled-enough")
            } else {
                goToTopIcon.classList.add("not-scrolled-enough")
                goToTopIcon.classList.remove("scrolled-enough")
            }
        }
    }

    passwordsMatchingCheck() {
        const passwords = new Password
        const bothPasswordInputs = [passwordInput, confirmPasswordInput]

        bothPasswordInputs.forEach((one) => {
            one.addEventListener("input", () => {
                passwords.passwordsComparation()
            })
        })
    }

    setMenuButton() {
        const theMobileNavBar = new MobileNavBar("fa-solid fa-bars", "fa-bars", "fa-xmark")
        const menuIcon = document.getElementById("menuIcon")

        menuIcon.onclick = () => {
            theMobileNavBar.menuIconToggle()
        }
    }

    setDarkLightButton() {
        const theDarkMode = new ThemeController("fa-lightbulb fa-solid", "fa-solid", "fa-regular")
        const modeIcon = document.getElementById("modeIcon")

        modeIcon.onclick = () => {
            theDarkMode.switchTheme()
        }
    }

    registerLoginSwitch() {
        const formToggler = new Form
        const formHere = document.getElementById("formHere")

        formHere.onclick = () => {
            formToggler.registerLoginProperties()
        }
    }
}

Application.main()
