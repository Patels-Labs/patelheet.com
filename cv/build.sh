#!/bin/sh
# Renders cv/cv.html to HEET_PATEL_CV.pdf with headless Chrome.
cd "$(dirname "$0")/.." && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=HEET_PATEL_CV.pdf "file://$PWD/cv/cv.html" 2>/dev/null
