#!/usr/bin/env bash
#sass --style compact --sourcemap=none --no-cache --update -f -E utf-8 assets/scss:assets/css
#sass --style compact --sourcemap=none --no-cache -E utf-8 --watch assets/scss:assets/css

sass --style compact --sourcemap=none --no-cache --update -f assets/scss:assets/css
sass --style compact --sourcemap=none --no-cache --watch assets/scss:assets/css