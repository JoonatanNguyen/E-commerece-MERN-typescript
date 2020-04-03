import { RequestHandler, Request, Response, NextFunction } from 'express'
import { pathToRegexp, Path } from 'path-to-regexp'
import _isEqual from 'lodash/isEqual'

const unless = (paths: Path[], middleware: RequestHandler): RequestHandler => {
  const regex = paths.map(path => pathToRegexp(path))
  return (req: Request, res: Response, next: NextFunction) => {
    let cutURL = ''
    if (req.url.includes('/v1/products')) {
      cutURL = req.url.substring(0, req.url.indexOf('products/') + 9)
    } else {
      cutURL = req.url.split('?')[0]
    }

    const regexUrl = pathToRegexp(cutURL)
    const filteredPath = regex.find(r => _isEqual(r, regexUrl))

    filteredPath?.test(cutURL) ? next() : middleware(req, res, next)
  }
}

export default unless
