# router-control

### 用es7的装饰器来实现koa和express的路由功能，

**express**

```javascript
import {controller, get, post} from 'router-control'
@controller('/api')
class Ctrl {
    @get('/test')
    test() {}
}
```

```javascript
import express from 'express'

// Inside controller constructor
this.router = express.Router()
for (const {methodName, path, executer} of this.$$path) {
  this.router[methodName](path, (req, res, next) => {
    this[executer](req, res, next).catch(next)
  })
}

```
或者像下面这样子
```javascript
class BaseCtrl {
    constructor() {
        this.router = new Router()
        for (const {methodName, path, executer} of this.$$path) {
            this.router[methodName](path, (req, res, next) => {
                this[executer](req, res, next).catch(next)
            })
        }
    }
}

@controller(...)
class UserCtrl extends BaseCtrl {
  // decorated methods as above
}

```

### test
```
npm install 
npm test
```