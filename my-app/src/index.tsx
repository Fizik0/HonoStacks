import { Hono } from 'hono'
import { html } from 'hono/html'
import { Fragment } from 'hono/jsx'
import { PropsWithChildren } from 'hono/jsx'
import { memo } from 'hono/jsx'
import type { FC } from 'hono/jsx'
import { createContext, useContext } from 'hono/jsx'
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'


const app = new Hono()

const schema = z.object({
    name: z.string(),
    age: z.number(),
  })
  
  app.post('/author', zValidator('json', schema), (c) => {
    const data = c.req.valid('json')
    return c.json({
      success: true,
      message: `${data.name} is ${data.age}`,
    })
  })


const route = app.post(
    '/posts',
    zValidator(
      'form',
      z.object({
        title: z.string(),
        body: z.string(),
      })
    ),
    (c) => {
      // ...
      return c.json(
        {
          ok: true,
          message: 'Created!',
        },
        201
      )
    }
  )
export type AppType = typeof route
app.post(
    '/post',
    zValidator('json', schema, (result, c) => {
      if (!result.success) {
        return c.text('Invalid!', 400)
      }
    })
    //...
  )
  

declare module 'hono/jsx' {
    namespace JSX {
      interface IntrinsicElements {
        'my-custom-element': HTMLAttributes & {
          'x-event'?: 'click' | 'scroll'
        }
      }
    }
  }


declare module 'hono' {
    interface ContextRenderer {
      (
        content: string | Promise<string>,
        props: { title: string }
      ): Response
    }
  }
  
  const app = new Hono()
  
  app.get(
    '/page/*',
    jsxRenderer(({ children, title }) => {
      return (
        <html>
          <head>
            <title>{title}</title>
          </head>
          <body>
            <header>Menu</header>
            <div>{children}</div>
          </body>
        </html>
      )
    })
  )
  
  app.get('/page/favorites', (c) => {
    return c.render(
      <div>
        <ul>
          <li>Eating sushi</li>
          <li>Watching baseball games</li>
        </ul>
      </div>,
      {
        title: 'My favorites',
      }
    )
  })

app.use(
    jsxRenderer(({ children }) => {
      return (
        <html>
          <body>{children}</body>
        </html>
      )
    })
  )
  
  const blog = new Hono()
  blog.use(
    jsxRenderer(({ children, Layout }) => {
      return (
        <Layout>
          <nav>Blog Menu</nav>
          <div>{children}</div>
        </Layout>
      )
    })
  )
  
  app.route('/blog', blog)

app.get(
  '/page/*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <body>
          <header>Menu</header>
          <div>{children}</div>
        </body>
      </html>
    )
  })
)

app.get('/page/about', (c) => {
  return c.render(<h1>About me!</h1>)
})


app.get('/', (c) => {
    const stream = renderToReadableStream(
      <html>
        <body>
          <Suspense fallback={<div>loading...</div>}>
            <Component />
          </Suspense>
        </body>
      </html>
    )
    return c.body(stream, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  })

const AsyncComponent = async () => {
    await new Promise((r) => setTimeout(r, 1000)) // sleep 1s
    return <div>Done!</div>
  }
  
  app.get('/', (c) => {
    return c.html(
      <html>
        <body>
          <AsyncComponent />
        </body>
      </html>
    )
  })

const themes = {
    light: {
      color: '#000000',
      background: '#eeeeee',
    },
    dark: {
      color: '#ffffff',
      background: '#222222',
    },
  }
  
  const ThemeContext = createContext(themes.light)
  
  const Button: FC = () => {
    const theme = useContext(ThemeContext)
    return <button style={theme}>Push!</button>
  }
  
  const Toolbar: FC = () => {
    return (
      <div>
        <Button />
      </div>
    )
  }
  
  // ...
  
  app.get('/', (c) => {
    return c.html(
      <div>
        <ThemeContext.Provider value={themes.dark}>
          <Toolbar />
        </ThemeContext.Provider>
      </div>
    )
  })
  
  
  type Post = {
    id: number
    title: string
  }
  
  function Component({ title, children }: PropsWithChildren<Post>) {
    return (
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    )
  }

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

const List = () => (
    <Fragment>
      <p>first child</p>
      <p>second child</p>
      <p>third child</p>
    </Fragment>
  )

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)
const Layout = (
  <div>
    <Header />
    <p>Hono is cool!</p>
    <Footer />
  </div>
)
app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

app.get('/foo', (_c) => {
    const inner = { __html: 'JSX &middot; SSR' }
    const Div = <div dangerouslySetInnerHTML={inner} />
  })


  const app = new Hono()

  interface SiteData {
    title: string
    children?: any
  }
  
  const Layout = (props: SiteData) =>
    html`<!doctype html>
      <html>
        <head>
          <title>${props.title}</title>
        </head>
        <body>
          ${props.children}
        </body>
      </html>`
  
  const Content = (props: { siteData: SiteData; name: string }) => (
    <Layout {...props.siteData}>
      <h1>Hello {props.name}</h1>
    </Layout>
  )
  
  app.get('/:name', (c) => {
    const { name } = c.req.param()
    const props = {
      name: name,
      siteData: {
        title: 'JSX with html sample',
      },
    }
    return c.html(<Content {...props} />)
  })
  
  export default app







