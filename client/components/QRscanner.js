import React, {Component} from 'react'

class QRScanner extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <div className="app__layout">
          {/* <!-- Header --> */}
          <header className="app__header">
            <span
              className="app__header-icon"
              onclick="window.open('https://github.com/code-kotis/barcode-scanner', '_blank', 'toolbar=0,location=0,menubar=0');"
            >
              <svg
                fill="#FFFFFF"
                height="27"
                viewBox="0 0 24 24"
                width="27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
              </svg>
            </span>
          </header>

          <div className="app__layout-content">
            <video autoplay />

            {/* <!-- Dialog  --> */}
            <div className="app__dialog app__dialog--hide">
              <div className="app__dialog-content">
                <h5>QR Code</h5>
                <input type="text" id="result" />
              </div>
              <div className="app__dialog-actions">
                <button type="button" className="app__dialog-open">
                  Open
                </button>
                <button type="button" className="app__dialog-close">
                  Close
                </button>
              </div>
            </div>

            <div className="app__dialog-overlay app__dialog--hide" />

            {/* <!-- Snackbar --> */}
            <div className="app__snackbar" />
          </div>
        </div>
        <div className="app__overlay">
          <div className="app__overlay-frame" />
          {/* <!-- Scanner animation --> */}
          <div className="custom-scanner" />
          <div className="app__help-text" />
        </div>

        <div className="app__select-photos" />

        {/* <script>
        if (location.hostname !== "localhost") {
          (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
              (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
              m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
          })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
          ga('create', 'pageview');
        }
      </script>
      <script async src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js" integrity="sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA"
        crossorigin="anonymous"></script> */}
      </div>
    )
  }
}

export default QRScanner
