import { Hono } from 'hono'
import { css, cx, keyframes, Style } from 'hono/css'

app.get('/', (c) => {
    const headerClass = css`
      background-color: orange;
      color: white;
      padding: 1rem;
    `
    return c.html(
      <html>
        <head>
          <Style />
        </head>
        <body>
          <h1 class={headerClass}>Hello!</h1>
        </body>
      </html>
    )
  })

  const buttonClass = css`
  background-color: #fff;
  &:hover {
    background-color: red;
  }
`

const baseClass = css`
  color: white;
  background-color: blue;
`

const header1Class = css`
  ${baseClass}
  font-size: 3rem;
`

const header2Class = css`
  ${baseClass}
  font-size: 2rem;
`

const headerClass = css`
  color: white;
  background-color: blue;
`
const containerClass = css`
  ${headerClass} {
    h1 {
      font-size: 3rem;
    }
  }
`
return c.render(
  <div class={containerClass}>
    <header class={headerClass}>
      <h1>Hello!</h1>
    </header>
  </div>
)

const globalClass = css`
  :-hono-global {
    html {
      font-family: Arial, Helvetica, sans-serif;
    }
  }
`

return c.render(
  <div class={globalClass}>
    <h1>Hello!</h1>
    <p>Today is a good day.</p>
  </div>
)

export const renderer = jsxRenderer(({ children, title }) => {
    return (
      <html>
        <head>
          <Style>{css`
            html {
              font-family: Arial, Helvetica, sans-serif;
            }
          `}</Style>
          <title>{title}</title>
        </head>
        <body>
          <div>{children}</div>
        </body>
      </html>
    )
  })

  const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const headerClass = css`
  animation-name: ${fadeInAnimation};
  animation-duration: 2s;
`
const Header = () => <a class={headerClass}>Hello!</a>
