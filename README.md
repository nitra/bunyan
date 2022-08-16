# @nitra/bunyan

[![Mega-Linter](https://github.com/nitra/bunyan/workflows/Mega-Linter/badge.svg?branch=main)](https://github.com/nitra/bunyan/actions?query=workflow%3AMega-Linter+branch%3Amain)

## Cloud Run Job

```JavaScript

import log from '@nitra/bunyan'

log.info(123456)
```

## Cloud Run with trace

```JavaScript

import getLogger from '@nitra/bunyan/trace'

const log = getLogger(req)
log.info(123456)
```
