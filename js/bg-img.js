import refs from "./refs.js";
const { body, slidePrev, slideNext } = refs;
import { getTimeOfDay } from "./time.js";

let randomNum = getRandomNum();
setBg(randomNum);

slidePrev.addEventListener("click", getSlidePrev);
slideNext.addEventListener("click", getSlideNext);

function getRandomNum() {
  const min = 1;
  const max = 21;
  let randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum.toString().padStart(2, "0");
}

function setBg(randomNum) {
  const img = new Image();
  const date = new Date();

  const hours = date.getHours();
  const timeOfDay = getTimeOfDay(hours);
  let bgNum = randomNum;

  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  // img.src = `https://raw.githubusercontent.com/MarinaTripetska/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`

  img.onload = () => {
    // body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    // body.style.backgroundImage = `url(${img.src})`
  };
}

function getSlideNext() {
  if (randomNum === "20") {
    randomNum = "01";
    setBg(randomNum);
  } else {
    randomNum = String(parseInt(randomNum) + 1).padStart(2, "0");
    setBg(randomNum);
  }
}
function getSlidePrev() {
  if (randomNum === "01") {
    randomNum = "20";
    setBg(randomNum);
  } else {
    randomNum = String(parseInt(randomNum) - 1).padStart(2, "0");
    setBg(randomNum);
  }
}

class Slider {
  _getBaseURL() {
    return "https://raw.githubusercontent.com/abulynka/stage1-tasks/assets/images";
  }
  _getRandom(min = 1, max = 20) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _getUrl(folder, number) {
    return this._getBaseURL() + "/" + folder + "/" + number + ".jpg";
  }

  _getCurrentImageNumber() {
    return parseInt(
      document
        .querySelector("body")
        .style.backgroundImage.split("/")
        .pop()
        .split(".")
        .shift()
    );
  }

  _setImageGitHub(number = this._getRandom()) {
    number = ("0" + number).slice(-2);

    const img = new Image();
    img.src = this._getUrl(this._dateTime.getTimesOfDay(), number);
    img.addEventListener("load", (e) => {
      document.querySelector("body").style.backgroundImage =
        "url('" + img.src + "')";
    });
  }

  _setImage(url) {
    const img = new Image();
    img.src = url;
    img.addEventListener("load", (e) => {
      document.querySelector("body").style.backgroundImage =
        "url('" + img.src + "')";
    });
  }

  _getBackgroundKeyWord() {
    let value = document.querySelector('input[name="background-title"]').value;
    if (!value) {
      value = "nature";
    }
    return value;
  }

  async _getLinkToImageUnsplash() {
    const accessKey = "yvfbMX85FFx9X31URpgYTtgEQBGyRHTHv_Zfv9zfcig";
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${this._getBackgroundKeyWord()}&client_id=${accessKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.urls["regular"];
  }

  async _getLinkToImageFlickr() {
    const accessKey = "b4a5a0d4920c4da0d9f0f31661ed8ac1";
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${accessKey}&tags=${this._getBackgroundKeyWord()}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const photos = data["photos"]["photo"];
    return photos[this._getRandom(0, photos.length - 1)]["url_l"];
  }

  _parseNumber(number) {
    if (number > 20) {
      number = 1;
    } else if (number < 1) {
      number = 20;
    }
    return number;
  }

  _setPreviousImageGitHub() {
    this._setImageGitHub(this._parseNumber(this._getCurrentImageNumber() - 1));
  }

  _setNextImageGitHub() {
    this._setImageGitHub(this._parseNumber(this._getCurrentImageNumber() + 1));
  }

  /**
   * @param {SettingsUI} settingsUI
   * @param {DateTime} dateTime
   */
  async init(settingsUI, dateTime) {
    const that = this;

    this._settingsUI = settingsUI;
    this._dateTime = dateTime;

    this._settingsUI.addEventListener(
      _SettingsUIEvent__WEBPACK_IMPORTED_MODULE_1__.SettingsUIEvent
        .switchBackground,
      async () => {
        await that._refreshImages();
      }
    );

    this._settingsUI.addEventListener(
      _SettingsUIEvent__WEBPACK_IMPORTED_MODULE_1__.SettingsUIEvent
        .updateBackground,
      async () => {
        await that._refreshImages();
      }
    );

    await this._initImages();
  }

  async _refreshImages() {
    switch (this._settingsUI.background) {
      case "unsplash":
        await this._setImage(await this._getLinkToImageUnsplash());
        break;

      case "flickr":
        await this._setImage(await this._getLinkToImageFlickr());
        break;

      case "github":
      default:
        await this._setImageGitHub();
        break;
    }
  }

  async _initImages() {
    const that = this;
    await this._refreshImages();

    document
      .querySelector(".slide-prev")
      .addEventListener("click", async () => {
        switch (that._settingsUI.background) {
          case "unsplash":
            await that._setImage(await that._getLinkToImageUnsplash());
            break;

          case "flickr":
            await that._setImage(await that._getLinkToImageFlickr());
            break;

          case "github":
          default:
            await that._setPreviousImageGitHub();
            break;
        }
      });

    document
      .querySelector(".slide-next")
      .addEventListener("click", async () => {
        switch (that._settingsUI.background) {
          case "unsplash":
            await that._setImage(await that._getLinkToImageUnsplash());
            break;

          case "flickr":
            await that._setImage(await that._getLinkToImageFlickr());
            break;

          case "github":
          default:
            await that._setNextImageGitHub();
            break;
        }
      });
  }
}
